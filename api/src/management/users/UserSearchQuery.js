import boom from "boom";

import User from "../../models/User.js";

import FeatureManager from "../../features/featureManager.js";

let featureManager = new FeatureManager;

class UserSearchQuery {
    Handle = async (page, pageSize, query, activeOnly) => {
          try {
            var skip = parseInt(page) > 1 ? parseInt(page - 1) * pageSize : 0;
            var active = activeOnly == "true" ? true : false;
            let users;
            let count;

            let stages = [];
            let metaStages = []

            if(query) {
                let searchStage = {
                    $search: {
                        "index": "user_search",
                        "text": {
                            query: query,
                            path: ["prenom", "nom", "details.totem", "courriel"],
                            fuzzy: {},
                        },
                        "count": {
                            "type": "total",
                        }
                    }
                }
    
                metaStages.push(searchStage);
                stages.push(searchStage);
            }

            let nominationStage;

            if (active) {
                nominationStage = { $match: {
                    nominations: { $elemMatch: { ed: null } }
                }};
            } else {
                nominationStage = { $match: {
                    nominations: { $elemMatch: true }
                }};
            }

            stages.push(nominationStage);    
            metaStages.push(nominationStage);    

            let projectStage = {
                $project: {
                    _id: 1,
                    courriel: 1,
                    nom: 1,
                    prenom: 1,
                    nominations: 1,
                    formations: 1,
                }
            }
      
            stages.push(projectStage); 

            if(!query) {
                stages.push({
                    $sort: {
                        "nom": 1
                    }
                })
            }

            let skipStage = {
                $skip: skip
            }
            
            stages.push(skipStage);  
            
            if(pageSize) {
                let limitStage ={
                    $limit: parseInt(pageSize)
                };
                
                stages.push(limitStage); 
            }

            metaStages.push({
                $count: "count"
            })

            users = await User.aggregate(stages).exec();
            let metaResults = await User.aggregate(metaStages).exec();

            return { users, page: parseInt(page), count: metaResults[0]?.count };
          } catch (err) {
            throw boom.boomify(err);
          }
      };      
}

export default UserSearchQuery;

