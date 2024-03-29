import boom from 'boom'

import Recensement from '../models/Recensement.js'
import User from '../models/User.js'

import { PermissionTypes } from '../security/permissionTypes.js'
import { Permissions } from '../security/permissions.js'

const getLatestRecensementbyUnit = async (req, reply) => {
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

const getbyUnit = async (req, reply) => {
    try {
      const unit = req.params.id
      const recensements = await Recensement.find({unitId: unit}).sort({_id: -1})
      return recensements
    } catch (err) {
      throw boom.boomify(err)
    }
  }

const getbyPayment = async (req, reply) => {
  try {
    const { paid } = req.params
    var isPaid = paid === "true" ? true : false

    const recensements = await Recensement.aggregate([
      {$match: {paiementComplet: isPaid ? true : {$ne: true}}},
      {$project: {details:1, date:1, paiementComplet: 1, unitId : { "$toObjectId": "$unitId" }}},
      {$lookup:
        {
          from: "units",
          localField: "unitId",
          foreignField: "_id",
          as: "unit"
        }
      },
      {$unwind: "$unit"},
      {$sort: {
        _id: -1
      }}
    ]);

    return recensements

  } catch (err) {
    throw boom.boomify(err)
  }
}

const updateOne = async (req, reply) => {
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

const addOne = async (req, reply) => {
  if(Permissions(req.headers.authorization, PermissionTypes.SubmitRecensement)) { 
    try {
      const recensementModel = req.body
      const recensement = new Recensement(recensementModel)
      return recensement.save()
    } catch (err) {
      throw boom.boomify(err)
    }
  }
  else {
    reply.code(401)
    return "Vous n'avez pas le droit de soumettre un recensement"
  }    
}

const deleteOne = async (req, reply) => {
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

export {
  getLatestRecensementbyUnit,
  getbyUnit,
  getbyPayment,
  updateOne,
  addOne,
  deleteOne 
}