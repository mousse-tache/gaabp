const boom = require('boom');
const Recensement = require('../models/Recensement');
const User = require('../models/User');
const { PermissionTypes } = require('../security/permissionTypes');
const { Permissions } = require('../security/permissions');
require('dotenv').config();
const jwt = require('jsonwebtoken');


exports.getLatestRecensementbyUnit = async (req, reply) => {
  try {
    const unit = req.params.id
    const recensement = await Recensement.findOne({unitId: unit}).sort({_id: -1})

    if (recensement) {
      const users = await User.find({_id: {$in: recensement.details.unitMembers}},{ prenom:1, nom:1 }).sort({nom:1})
      const usersNonRecenses = await User.find({_id: {$nin: recensement.details.unitMembers}, nominations: {$elemMatch: {unitId: unit, ed: null}}},{ prenom:1, nom:1 }).sort({nom:1})
      return {recensement, users, usersNonRecenses}
    }
    
    return {recensement}
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.getbyUnit = async (req, reply) => {
    try {
      const unit = req.params.id
      const recensements = await Recensement.find({unitId: unit}).sort({_id: -1})
      return recensements
    } catch (err) {
      throw boom.boomify(err)
    }
  }

exports.getbyPayment = async (req, reply) => {
  try {
    const { paid } = req.params
    var isPaid = paid === "true" ? true : false

    if(isPaid) {
      const recensements = await Recensement.find({paiementComplet: true}).sort({_id: -1})
      return recensements
    }
    else {
      const recensements = await Recensement.find({paiementComplet: {$ne: true}}).sort({_id: -1})
      return recensements
    }

  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.updateOne = async (req, reply) => {
  if(Permissions(req.headers.authorization, PermissionTypes.SubmitRecensement)) { 
    try {
        const recensement = req.body
        const id = recensement._id
        const { ...updateData } = recensement
        const update = await Recensement.findByIdAndUpdate(id, updateData, { new: true })
        return update
      } catch (err) {
        throw boom.boomify(err)
      }
  }
  else {
    reply.code(401)
    return "Vous n'avez pas le droit de modifier un recensement"
  }
}

exports.addOne = async (req, reply) => {
  if(Permissions(req.headers.authorization, PermissionTypes.SubmitRecensement)) { 
    try {
      const recensementModel = req.body
  
      const recensement = await Recensement.collection.insertOne(recensementModel)

      return recensement
    } catch (err) {
      throw boom.boomify(err)
    }
  }
  else {
    reply.code(401)
    return "Vous n'avez pas le droit de soumettre un recensement"
  }    
}

exports.deleteOne = async (req, reply) => {
  if(Permissions(req.headers.authorization, PermissionTypes.SubmitRecensement)) { 
    try {
      const recensementModel = req.body
  
      const recensement = await Recensement.findByIdAndDelete(recensementModel._id)

      return recensement
    } catch (err) {
      throw boom.boomify(err)
    }
  }
  else {
    reply.code(401)
    return "Vous n'avez pas le droit de soumettre un recensement"
  }    
}