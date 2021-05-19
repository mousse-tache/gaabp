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
                var f = dbFeatures.find(f => f._id == x)

                if(f && f.length > 0) {
                    return f[0]
                }

              return {_id: x}   
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

exports.updateFeature = async (req, reply) => {
  if(Permissions(req.headers.authorization, PermissionTypes.FeatureManagement)) { 
    try {
        const { feature } = req.body

        if (feature._id) {
            const update = await Feature.findByIdAndUpdate(feature._id, feature, { new: true });
    
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