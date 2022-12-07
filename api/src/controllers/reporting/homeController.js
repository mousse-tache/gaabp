import boom from 'boom'
import moment from "moment"

import User from '../../models/User.js'
import Unit from '../../models/Unit.js'
import Recensement from '../../models/Recensement.js'

import { PermissionTypes } from '../../security/permissionTypes.js'
import { Permissions } from '../../security/permissions.js'

function getLastRecensementPeriod() {
    var y = moment().year();
    var nextRecensementPeriod = moment(`${y}-09-01`);

    if(moment().isAfter(nextRecensementPeriod)) {
        nextRecensementPeriod.add(1, 'y');
    }

    return nextRecensementPeriod.add(-1, 'y').toDate();
}; 

const getGlobalReport = async (req, reply) => {
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
            {$group: {_id: "money", n: {$sum: "$details.cost.totalPrice"}}}
        ]);

        let usersByType = await User.aggregate([
            {$unwind: "$nominations"},
            {$match: {"nominations.ed": null}},
            {$group: { _id: "$nominations.type", value: {$sum:1}}},
            {$project: {_id: 0, label: "$_id", value:1}}
        ]);
  
        return {nbOfUsers: nbOfUsers.length > 0 ? nbOfUsers[0].nbOfUsers : 0, 
            uniteRecenses: uniteRecenses.length > 0 ? uniteRecenses[0].uniteRecenses : 0, 
            unitsPaye: unitsPaye.length > 0 ? unitsPaye[0].unitsPaye : 0,
            totalCashForYear: totalCashForYear.length > 0 ? totalCashForYear[0].n : 0,
            usersByType
        };
      } catch (err) {
        throw boom.boomify(err)
      }
    }
    else {
      reply.code(401)
      return "Vous n'avez pas le droit d'accéder d'effectuer cette action"
    }
  }

  export { getGlobalReport }