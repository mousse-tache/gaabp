const boom = require('boom')
const mongoose = require('mongoose');
const Camp = require('../models/Camp');
const { PermissionTypes } = require('../security/permissionTypes');
const { Permissions } = require('../security/permissions');
require('dotenv').config()

exports.createNewCamp = async (req, reply) => {
  if(Permissions(req.headers.authorization, PermissionTypes.SubmitCamp)) { 
    try {
        const { camp } = req.body
  
        if(camp._id) {
          const update = await Camp.findByIdAndUpdate(camp._id, camp, { new: true });
  
          return update;
        }
  
        const insert =  await Camp.collection.insertOne(camp);
  
        return insert;
    } catch (err) {
      throw boom.boomify(err)
    }
  }
  else {
    reply.code(401)
    return "Vous n'avez pas le droit d'ajouter un camp à l'unité"
  }
}

exports.getLast = async (req, reply) => {
  if(Permissions(req.headers.authorization, PermissionTypes.SubmitCamp)) { 
    try {
        const unitId = req.params.unitId
  
        const camp = await Camp.findOne({unit: unitId}, null, { sort: { _id: -1 } });

        return camp;
    } catch (err) {
      throw boom.boomify(err)
    }
  }
  else {
    reply.code(401)
    return "Vous n'avez pas le droit d'effectuer cette action"
  }
}

