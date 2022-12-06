import boom from 'boom'

import User from '../../models/User.js'

import { PermissionTypes } from '../../security/permissionTypes.js'
import { Permissions } from '../../security/permissions.js'
import { getAnneeDeService } from '../../utils/anneeService.js'

const getEligibilityByHonor = async (req, reply) => {
  if(Permissions(req.headers.authorization, PermissionTypes.AddDecoration)) {
    try {
      const id = req.params.id
      const users = await User.aggregate([
        {$project: {details: 0, isAdmin: 0}},
        {$match: {
          "nominations": {$elemMatch: {type: {$ne: "membre"}}}
        }}
      ]);
      const filteredUsers = []
      const unitesNationales = process.env.unites_nationales ? process.env.unites_nationales.split(",") : [];

      users.forEach(x => {
          var u = {"_id": x._id, 
          courriel: x.courriel, 
          nom: `${x.prenom} ${x.nom}`,
          formations: x.formations && x.formations.filter(x => Boolean(x.dateConfirme)),
          service: getAnneeDeService(x.nominations),
          serviceNational: getAnneeDeService(x.nominations.filter(x => unitesNationales.includes(x.unitId)))
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

export { getEligibilityByHonor }