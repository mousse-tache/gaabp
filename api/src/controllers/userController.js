// External Dependancies
const boom = require('boom')

// Get Data Models
const User = require('../models/User')

// Get all users
exports.getUsers = async (req, reply) => {
  try {
    const users = await User.find()
    return users
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.getUsersByUnit = async (req, reply) => {
  try {
    const id = req.params.id
    const users = await User.find({$or:[{"nominations.unitId": id}, {"nominations.unitId": mongoose.Types.ObjectId(id)}] })
    return users
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.getUsersByGroup = async (req, reply) => {
  try {
    const id = req.params.id
    const users = await User.find({"nominations.groupId": id})
    return users
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get single user by ID
exports.getSingleUser = async (req, reply) => {
  try {
    const id = req.params.id
    const user = await User.find({_id: id})
    return user
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.getMultipleUsers = async (req, reply) => {
  try {
    const ids = req.body
    const user = await User.find({_id: {$in: ids }})
    return user
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get single user by ID
exports.getSingleUserByEmail = async (req, reply) => {
  try {
    const email = req.params.email
    const user = await User.find({courriel: email})
    return user
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new user
exports.addUser = async (req, reply) => {
  try {
    const userModel = req.body

    const user = new User(
    {
      courriel: userModel.courriel,
      prenom: userModel.prenom,
      nom: userModel.nom
    })
    return user.save()
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new user
exports.addUsers = async (req, reply) => {
  try {
    const userModels = req.body

    return User.insertMany(userModels)
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Update an existing user
exports.updateUser = async (req, reply) => {
  try {
    const user = req.body
    const id = user.id
    const { ...updateData } = user
    const update = await User.findByIdAndUpdate(id, updateData, { new: true })
    return update
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Delete a user
exports.deleteUser = async (req, reply) => {
  try {
    const id = req.params.id
    const user = await User.findByIdAndRemove(id)
    return user
  } catch (err) {
    throw boom.boomify(err)
  }
}
