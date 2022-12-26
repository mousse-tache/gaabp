import boom from 'boom'

import Feature from '../models/Feature.js'
import Features from '../features/features.js'

import { PermissionTypes } from '../security/permissionTypes.js'
import { Permissions } from '../security/permissions.js'

const getList = async (req, reply) => {
    if(Permissions(req.headers.authorization, PermissionTypes.FeatureManagement)) {       
        try {
            var dbFeatures = await Feature.find({})
            var result = Object.keys(Features).map(x => {
                var f = dbFeatures.find(f => f.name == x)

                if(f) {
                    return f
                }

              return {_id: Features[x], name: x}
            });

            return result
        } 
        catch (err) {
            throw boom.boomify(err)
        }
    }
    else {
      reply.code(401)
      return "Cette opération vous est interdite"
    }
}

const getActiveFeatures = async (req, reply) => {     
    try {
        var dbFeatures = await Feature.find({activated:true})

        return dbFeatures
    } 
    catch (err) {
        throw boom.boomify(err)
    }
}

const updateFeature = async (req, reply) => {
  if(Permissions(req.headers.authorization, PermissionTypes.FeatureManagement)) { 
    try {
        const { feature } = req.body

        if (feature._id) {
            const update = await Feature.findByIdAndUpdate(feature._id, feature, { new: true , upsert: true});
    
            return update;  
        }    

      const insert = new Feature(feature)

      return insert.save()
    } 
    catch (err) {
      throw boom.boomify(err)
    }
  }
  else {
    reply.code(401)
    return "Cette opération vous est interdite"
  }
}

export {
  getList,
  getActiveFeatures,
  updateFeature
}