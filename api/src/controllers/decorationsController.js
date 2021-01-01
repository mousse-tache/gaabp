const boom = require('boom')
const mongoose = require('mongoose');
const Decoration = require('../models/Decoration');
const { PermissionTypes } = require('../security/permissionTypes');
const { Permissions } = require('../security/permissions');
require('dotenv').config()
const jwt = require('jsonwebtoken');

exports.getDecorationsForUser = async (req, reply) => {
    try {
        const id = req.params.id
        return await Decoration.find({membre: mongoose.Types.ObjectId(id)})
      } catch (err) {
        throw boom.boomify(err)
      }
}

exports.saveDecoration = async (req, reply) => {
  if(Permissions(req.headers.authorization, PermissionTypes.UpdateDecorations)) { 
    try {
      const { decoration } = req.body

      if(decoration._id) {
        const update = await Decoration.findByIdAndUpdate(decoration._id, decoration, { new: true });

        return update;
      }

      const insert =  await Decoration.collection.insertOne(decoration);

      return insert;
    } catch (err) {
      throw boom.boomify(err)
    }
  }
  else {
    reply.code(401)
    return "Vous n'avez pas le droit de faire modifier les décorations"
  }

}