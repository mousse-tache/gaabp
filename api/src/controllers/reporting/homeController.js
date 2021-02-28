const boom = require('boom')
const User = require('../../models/User')
const Unit = require('../../models/Unit')
const Recensement = require('../../models/Recensement')
const axios = require("axios")
const moment = require("moment");
require('dotenv').config()

const { PermissionTypes } = require('../../security/permissionTypes');
const { Permissions } = require('../../security/permissions');

function getLastRecensementPeriod() {
    var y = moment().year();
    var nextRecensementPeriod = moment(`${y}-09-01`);

    if(moment().isAfter(nextRecensementPeriod)) {
        nextRecensementPeriod.add(1, 'y');
    }

    return moment(nextRecensementPeriod).add(-1, 'y').toDate();
}; 

exports.getGlobalReport = async (req, reply) => {
    if(Permissions(req.headers.authorization, PermissionTypes.ViewRecensementSummary)) { 
      try {  
         
        const nbOfUsers =  await User.aggregate([
            {$match: {"nominations.ed": null}},
            {$count: "nbOfUsers"}
        ]);

        var censusPeriod = getLastRecensementPeriod();

        const uniteRecenses = await Unit.aggregate([
            {$lookup:
                {
                    from: "recensements",
                    localField: "_id",
                    foreignField: "unitId",
                    as: "recensements"
                }
            },
            {$unwind: "$recensements"},
            {$match: {"recensements.date": {$gte: censusPeriod}}},
            {$group: {_id: "$_id"}},
            {$count: "uniteRecenses" }
        ]);

        const unitsPaye = await Unit.aggregate([
            {$lookup:
                {
                    from: "recensements",
                    localField: "_id",
                    foreignField: "unitId",
                    as: "recensements"
                }
            },
            {$unwind: "$recensements"},
            {$match: {"recensements.date": {$gte: censusPeriod}, "recensements.paiementComplet": true}},
            {$group: {_id: "$_id"}},
            {$count: "unitsPaye" }
        ]);

        const totalCashForYear = await Recensement.aggregate([
            {$match: {paiementComplet: true}},
            {$group: {_id: {$sum: "$details.cost.totalPrice"}}}
        ]);
  
        return {nbOfUsers: nbOfUsers[0].nbOfUsers, 
            uniteRecenses: uniteRecenses[0].uniteRecenses, 
            unitsPaye: unitsPaye[0].unitsPaye,
            totalCashForYear: totalCashForYear[0]._id};
      } catch (err) {
        throw boom.boomify(err)
      }
    }
    else {
      reply.code(401)
      return "Vous n'avez pas le droit d'accéder d'effectuer cette action"
    }
  }