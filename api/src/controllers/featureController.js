const boom = require('boom')
const Feature = require('../models/Feature');
const Features = require('../features/features');
const { PermissionTypes } = require('../security/permissionTypes');
const { Permissions } = require('../security/permissions');
require('dotenv').config()

exports.getList = async (req, reply) => {
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

exports.getActiveFeatures = async (req, reply) => {     
    try {
        var dbFeatures = await Feature.find({activated:true})

        return dbFeatures
    } 
    catch (err) {
        throw boom.boomify(err)
    }
}

exports.updateFeature = async (req, reply) => {
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