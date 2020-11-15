// External Dependancies
const boom = require('boom')

// Get Data Models
const Group = require('../models/Group')

// Get all groups
exports.getGroups = async (req, reply) => {
  try {
    const groups = await Group.find().sort({numero:1})
    return groups
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.getPublicGroups = async (req, reply) => {
  try {
    const groups = await Group.find({public: true})
    return groups
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get single group by ID
exports.getSingleGroup = async (req, reply) => {
  try {
    const id = req.params.id
    const group = await Group.findById(id)
    return group
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.getGroupsById = async (req, reply) => {
  try {
    const ids = req.body
    const groups = await Group.find({_id: {$in: ids}},{numero:1, nom:1})
    return groups
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get single group by ID
exports.getSingleGroupByNumber = async (req, reply) => {
  try {
    const numero = req.params.numero
    const group = await Group.find({numero: numero})
    return group
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new group
exports.addGroup = async (req, reply) => {
  try {
    const groupModel = req.body

    const group = new Group(
    {
      ...groupModel
    })
    return group.save()
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Update an existing group
exports.updateGroup = async (req, reply) => {
  try {
    const group = req.body
    const id = group.id
    const { ...updateData } = group
    const update = await Group.findByIdAndUpdate(id, updateData, { new: true })
    return update
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Delete a group
exports.deleteGroup = async (req, reply) => {
  try {
    const id = req.params.id
    const group = await Group.findByIdAndRemove(id)
    return group
  } catch (err) {
    throw boom.boomify(err)
  }
}
