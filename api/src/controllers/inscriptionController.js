import boom from 'boom'

import Inscription from '../models/Inscription.js'

// Get all inscriptions
const getInscriptions = async (req, reply) => {
  try {
    const inscriptions = await Inscription.find()
    return inscriptions
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get single inscription by ID
const getSingleInscription = async (req, reply) => {
  try {
    const id = req.params.id
    const inscription = await Inscription.findById(id)
    return inscription
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new inscription
const addInscription = async (req, reply) => {
  try {
    const inscription = new Inscription(req.body)
    return inscription.save()
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Update an existing inscription
const updateInscription = async (req, reply) => {
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
const deleteInscription = async (req, reply) => {
  try {
    const id = req.params.id
    const inscription = await Inscription.findByIdAndRemove(id)
    return inscription
  } catch (err) {
    throw boom.boomify(err)
  }
}

export {
  getInscriptions,
  getSingleInscription,
  addInscription,
  updateInscription,
  deleteInscription
}
