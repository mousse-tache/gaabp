import boom from 'boom'

import Unit from '../models/Unit.js'

import { PermissionTypes } from '../security/permissionTypes.js'
import { Permissions } from '../security/permissions.js'

// Get all units
const getUnits = async (req, reply) => {
  try {
    const units = await Unit.aggregate([
      {$lookup:
        {
          from: "groups",
          localField: "group",
          foreignField: "_id",
          as: "g"
        }
      },
      {$unwind: "$g"},
      {$lookup:
        {
          from: "recensements",
          localField: "_id",
          foreignField: "unitId",
          as: "recensements"
        }
      },
      {$project: {nom:1, genre:1, branche:1, "g.nom":1, "g.numero":1, recensements: { $arrayElemAt: [ "$recensements", -1 ] }}},
      {$sort: {nom:1}}
    ]);

    return units
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get units by group id
const getByGroupId = async (req, reply) => {
  try {
    const id = req.params.id
    const units = await Unit.find({group: id})
    return units
  } catch (err) {
    throw boom.boomify(err)
  }
}


// Get single unit by ID
const getSingleUnit = async (req, reply) => {
  try {
    const id = req.params.id
    const unit = await Unit.findById(id)
    return unit
  } catch (err) {
    throw boom.boomify(err)
  }
}

const getUnitsById = async (req, reply) => {
  try {
    const ids = req.body
    const units = await Unit.find({_id: {$in: ids}},{nom:1})
    return units
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new unit
const addUnit = async (req, reply) => {
  if(Permissions(req.headers.authorization, PermissionTypes.CreateUnit)) { 
    try {
      const unitModel = req.body

      const unit = new Unit(
      {
        ...unitModel
      })
      return unit.save()
    } catch (err) {
      throw boom.boomify(err)
    }
  }
  else {
    reply.code(403)
    return "Unauthorized"
  }
}

// Update an existing unit
const updateUnit = async (req, reply) => {
  if(Permissions(req.headers.authorization, PermissionTypes.UpdateUnit)) { 
    try {
      const unit = req.body
      const id = unit.id
      const { ...updateData } = unit
      const update = await Unit.findByIdAndUpdate(id, updateData, { new: true })
      return update
    } catch (err) {
      throw boom.boomify(err)
    }
  }
  else {
    reply.code(403)
    return "Unauthorized"
  }
}

// Delete a unit
const deleteUnit = async (req, reply) => {
  if(Permissions(req.headers.authorization, PermissionTypes.DeleteUnit)) { 
    try {
      const id = req.params.id
      const unit = await Unit.findByIdAndRemove(id)
      return unit
    } catch (err) {
      throw boom.boomify(err)
    }
  }
  else {
    reply.code(403)
    return "Unauthorized"
  }
}

export {
  getUnits,
  getByGroupId,
  getSingleUnit,
  getUnitsById,
  addUnit,
  updateUnit,
  deleteUnit
}
