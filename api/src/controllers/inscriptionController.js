// External Dependancies
const boom = require('boom')

// Get Data Models
const Inscription = require('../models/Inscription')

// Get all inscriptions
exports.getInscriptions = async (req, reply) => {
  try {
    const inscriptions = await Inscription.find()
    return inscriptions
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get single inscription by ID
exports.getSingleInscription = async (req, reply) => {
  try {
    const id = req.params.id
    const inscription = await Inscription.findById(id)
    return inscription
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new inscription
exports.addInscription = async (req, reply) => {
  try {
    const inscription = new Inscription(req.body)
    return inscription.save()
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Update an existing inscription
exports.updateInscription = async (req, reply) => {
  try {
    const id = req.params.id
    const inscription = req.body
    const { ...updateData } = inscription
    const update = await Inscription.findByIdAndUpdate(id, updateData, { new: true })
    return update
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Delete a inscription
exports.deleteInscription = async (req, reply) => {
  try {
    const id = req.params.id
    const inscription = await Inscription.findByIdAndRemove(id)
    return inscription
  } catch (err) {
    throw boom.boomify(err)
  }
}
