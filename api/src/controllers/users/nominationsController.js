import boom from 'boom'

import DemandeNomination from '../../models/DemandeNomination.js'
import User from '../../models/User.js'

import { PermissionTypes } from '../../security/permissionTypes.js'
import { Permissions } from '../../security/permissions.js'

const getByCompletion = async (req, reply) => {
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

const getByApprover = async (req, reply) => {
  try {
    const { userId } = req.params;
    const nominations = await DemandeNomination.find({"approvers": {$elemMatch: {_id: userId}}}).sort({_id: -1})
    return nominations    
  } catch (err) {
    throw boom.boomify(err)
  }
}

const updateOne = async (req, reply) => {
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

const addOne = async (req, reply) => {
    try {
        const model = req.body
    
        const nomination = await DemandeNomination.collection.insertOne(model)

        return nomination
      } catch (err) {
        throw boom.boomify(err)
      }
}

const refuseNomination = async (req, reply) => {
  if(Permissions(req.headers.authorization, PermissionTypes.ValidateNomination)) { 
    try {
      const { nominationId, confirmerId } = req.body
      
      const update = await DemandeNomination.updateOne({_id: nominationId}, {$set: {confirmerId: confirmerId, complete: true}}) 

      return update
    } catch (err) {
      throw boom.boomify(err)
    }
  }
  else {
    reply.code(401)
    return "Vous n'avez pas le droit de refuser une nomination"
  }
}

const confirmNomination = async (req, reply) => {
  if(!Permissions(req.headers.authorization, PermissionTypes.ValidateNomination)) {     
    reply.code(401)
    return "Vous n'avez pas le droit d'accepter' une nomination"
  }

  try {
      const { nominationId, confirmerId } = req.body
      
      const nomination = await DemandeNomination.findOne({_id: nominationId, complete: {$ne: true}});

      if(!nomination) {
        return;
      }

      var groupId = nomination.group !== "" ? nomination.group : null;
      var unitId = nomination.unit !== "" ? nomination.unit : null;
      var newNomination = { _id: nomination._id, 
        groupId: groupId, 
        unitId: unitId, 
        type: nomination.role, 
        sd: getDateWithoutTime(), 
        approvedBy: confirmerId, 
        approved:true
      }

      await DemandeNomination.updateOne({_id: nominationId}, {$set: {confirmerId: confirmerId, complete: true}})
      await User.updateOne({_id: nomination.user}, {$addToSet: { nominations: newNomination}})  
      return true    
    } catch (err) {
      throw boom.boomify(err)
    }
}

function getDateWithoutTime(date = new Date()) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
}

export {
  getByCompletion,
  getByApprover,
  updateOne,
  addOne,
  refuseNomination,
  confirmNomination
}
