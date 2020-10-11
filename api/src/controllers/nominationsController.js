const boom = require('boom')
const DemandeNomination = require('../models/DemandeNomination')

exports.getByCompletion = async (req, reply) => {
  try {
    const completion = req.params.completion;

    if (completion == "pending") {
        const nomination = await DemandeNomination.find({complete: {$ne: true}}).sort({_id: -1})
        return nomination
    }
    else {
        const nomination = await DemandeNomination.find({complete: true}).sort({_id: -1})
        return nomination
    }
    
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.getByApprover = async (req, reply) => {
  try {
    const { userId } = req.params;

    const nominations = await DemandeNomination.find({"approvers._id": userId}).sort({_id: -1})
    return nominations    
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.updateOne = async (req, reply) => {
    try {
        const nomination = req.body
        const id = nomination._id
        const { ...updateData } = nomination
        const update = await DemandeNomination.findByIdAndUpdate(id, updateData, { new: true })
        return update
      } catch (err) {
        throw boom.boomify(err)
      }
}

exports.addOne = async (req, reply) => {
    try {
        const model = req.body
    
        const nomination = new DemandeNomination(
        {
          ...model
        })
        return nomination.save()
      } catch (err) {
        throw boom.boomify(err)
      }
}