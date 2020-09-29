// External Dependancies
const boom = require('boom')
const mongoose = require('mongoose');
// Get Data Models
const User = require('../models/User')

// Get all users
exports.getUsers = async (req, reply) => {
  try {
    const users = await User.find({},{"details.ramq":0})
    return users
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get all users
exports.getPendingNominationUsers = async (req, reply) => {
  try {
    const users = await User.find({nominations: {$elemMatch: { $or: [{sd: {$gte: new Date("2020-09-01")}}, {sd: null}], "approved": {$ne: true}, "ed": {$ne: null}}}},{"details":0, formations: 0})
    return users
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get all users
exports.getBasicUsers = async (req, reply) => {
  try {
    const users = await User.find({},{_id:1, courriel:1, nom:1, prenom:1})
    return users
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.getBasicUsersWithPaging = async (req, reply) => {
  try {
    const {page, pageSize, query} = req.query
    var skip = parseInt(page) > 1 ? parseInt((page-1))*pageSize : 0;

    var users;
    var count;
    if(query && query !== "") {
      users = await User.find({$or: 
        [
          {courriel: {$regex: new RegExp("^" + query.toLowerCase(), "i")}}, 
          {prenom: {$regex: new RegExp("^" + query.toLowerCase(), "i")}}, 
          {nom: {$regex: new RegExp("^" + query.toLowerCase(), "i")}}
        ]     
      },{_id:1, courriel:1, nom:1, prenom:1}).sort({prenom:1}).skip(skip).limit(parseInt(pageSize))
      count = await User.find({$or: 
        [
          {courriel: {$regex: new RegExp("^" + query.toLowerCase(), "i")}}, 
          {prenom: {$regex: new RegExp("^" + query.toLowerCase(), "i")}}, 
          {nom: {$regex: new RegExp("^" + query.toLowerCase(), "i")}}
        ]     
      },{_id:1, courriel:1, nom:1, prenom:1}).countDocuments()
    }
    else {
      users = await User.find({},{_id:1, courriel:1, nom:1, prenom:1}).sort({prenom:1}).skip(skip).limit(parseInt(pageSize))
      count = await User.find({},{_id:1, courriel:1, nom:1, prenom:1}).countDocuments()
    }
    return { users, page: parseInt(page), count }
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Search in users
exports.searchUsers = async (req, reply) => {
  try {
    const { query } = req.body
    const users = await User.find({$or: 
      [
        {courriel: {$regex: new RegExp("^" + query.toLowerCase(), "i")}}, 
        {prenom: {$regex: new RegExp("^" + query.toLowerCase(), "i")}}, 
        {nom: {$regex: new RegExp("^" + query.toLowerCase(), "i")}}
      ]},{details:0, formations:0})
    return users
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Search in users
exports.searchUsersWithFormations = async (req, reply) => {
  try {
    const { query } = req.body
    const users = await User.find({$or: 
      [
        {courriel: {$regex: new RegExp("^" + query.toLowerCase(), "i")}}, 
        {prenom: {$regex: new RegExp("^" + query.toLowerCase(), "i")}}, 
        {nom: {$regex: new RegExp("^" + query.toLowerCase(), "i")}}
      ]},{details:0, nominations:0})
    return users
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Search users by formation
exports.searchUsersWithPendingFormations = async (req, reply) => {
  try {
    const users = await User.find({formations: {$elemMatch: {dateConfirme: null, dateRecommende: {$ne: null}}}},{nominations:0,details:0})
    return users
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get formateurs
exports.getFormateurs = async (req, reply) => {
  try {
    const users = await User.find({"formations": { $elemMatch: { "niveau.id": {$in: ["32", "34"]}, dateConfirme: {$ne:null}}}},{nominations:0,details:0})
    return users
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.getUsersByUnit = async (req, reply) => {
  try {
    const id = req.params.id
    const users = await User.find({$or:[{"nominations.unitId": id}, {"nominations.unitId": mongoose.Types.ObjectId(id)}] },{"details.ramq":0})
    return users
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.getUsersByGroup = async (req, reply) => {
  try {
    const id = req.params.id
    const users = await User.find({"nominations.groupId": id},{"details.ramq":0})
    return users
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get single user by ID
exports.getSingleUser = async (req, reply) => {
  try {
    const id = req.params.id
    const user = await User.find({_id: id},{"details.ramq":0})
    return user
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.getMultipleUsers = async (req, reply) => {
  try {
    const ids = req.body
    const user = await User.find({_id: {$in: ids }},{"details.ramq":0})
    return user
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get single user by ID
exports.getSingleUserByEmail = async (req, reply) => {
  try {
    const email = req.params.email
    const user = await User.find({courriel: email},{"details.ramq":0})
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
