// External Dependancies
const boom = require('boom')

// Get Data Models
const Unit = require('../models/Unit')

// Get all units
exports.getUnits = async (req, reply) => {
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
exports.getByGroupId = async (req, reply) => {
  try {
    const id = req.params.id
    const units = await Unit.find({group: id})
    return units
  } catch (err) {
    throw boom.boomify(err)
  }
}


// Get single unit by ID
exports.getSingleUnit = async (req, reply) => {
  try {
    const id = req.params.id
    const unit = await Unit.findById(id)
    return unit
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get single unit by ID
exports.getUnitsByName = async (req, reply) => {
  try {
    const nom = req.params.nom
    const unit = await Unit.find({nom: /nom/})
    return unit
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.getUnitsById = async (req, reply) => {
  try {
    const ids = req.body
    const units = await Unit.find({_id: {$in: ids}},{nom:1})
    return units
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new unit
exports.addUnit = async (req, reply) => {
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

// Update an existing unit
exports.updateUnit = async (req, reply) => {
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

// Delete a unit
exports.deleteUnit = async (req, reply) => {
  try {
    const id = req.params.id
    const unit = await Unit.findByIdAndRemove(id)
    return unit
  } catch (err) {
    throw boom.boomify(err)
  }
}
