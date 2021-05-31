const boom = require('boom')
const mongoose = require('mongoose');
const User = require('../../models/User');
const Decoration = require('../../models/Decoration');
const DemandeNomination = require('../../models/DemandeNomination')
const { PermissionTypes } = require('../../security/permissionTypes');
const { Permissions } = require('../../security/permissions');
require('dotenv').config()
const jwt = require('jsonwebtoken');
const { getAnneeDeService } = require('../../utils/anneeService');

exports.getEligibilityByHonor = async (req, reply) => {
  if(Permissions(req.headers.authorization, PermissionTypes.AddDecoration)) {
    try {
      const id = req.params.id
      const users = await User.aggregate([
        {$project: {details: 0, isAdmin: 0}}
      ]);
      const filteredUsers = []
      users.forEach(x => {
          var u = {"_id": x._id, 
          courriel: x.courriel, 
          nom: `${x.prenom} ${x.nom}`,
          formations: x.formations && x.formations.filter(x => Boolean(x.dateConfirme)).map(x => x.niveau.id),
          service: getAnneeDeService(x.nominations)
        }

        if(u.service >= 5) {
            filteredUsers.push(u);
        }
      })

      return {users: filteredUsers, count: users.length}
    } catch (err) {
      throw boom.boomify(err)
    }
  }
  else {
    reply.code(403)
    return "Forbidden"
  }
}