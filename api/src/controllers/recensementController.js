const boom = require('boom')
const Recensement = require('../models/Recensement')

exports.getLatestRecensementbyUnit = async (req, reply) => {
  try {
    const unit = req.params.id
    const recensement = await Recensement.findOne({unitId: unit}).sort({annee: -1})
    return recensement
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.getbyUnit = async (req, reply) => {
    try {
      const unit = req.params.id
      const recensements = await Recensement.find({unitId: unit}).sort({annee: -1})
      return recensements
    } catch (err) {
      throw boom.boomify(err)
    }
  }

exports.updateOne = async (req, reply) => {
    try {
        const recensement = req.body
        const id = recensement._id
        const { ...updateData } = recensement
        const update = await Group.findByIdAndUpdate(id, updateData, { new: true })
        return update
      } catch (err) {
        throw boom.boomify(err)
      }
}

exports.addOne = async (req, reply) => {
    try {
        const recensementModel = req.body
    
        const recensement = new Recensement(
        {
          ...recensementModel
        })
        return recensement.save()
      } catch (err) {
        throw boom.boomify(err)
      }
}