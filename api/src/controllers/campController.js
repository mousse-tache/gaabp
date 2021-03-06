const boom = require('boom')
const mongoose = require('mongoose');
const Camp = require('../models/Camp');
const { PermissionTypes } = require('../security/permissionTypes');
const { Permissions } = require('../security/permissions');
require('dotenv').config()

exports.createNewCamp = async (req, reply) => {
  if(Permissions(req.headers.authorization, PermissionTypes.SubmitCamp)) { 
    try {
      return "";
    } catch (err) {
      throw boom.boomify(err)
    }
  }
  else {
    reply.code(401)
    return "Vous n'avez pas le droit d'ajouter un camp à l'unité"
  }
}