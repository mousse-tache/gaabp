import boom from "boom";
import mongoose from "mongoose";

import Camp from "../models/Camp.js";

import { Permissions } from "../security/permissions.js";
import { PermissionTypes } from "../security/permissionTypes.js";

const createNewCamp = async (req, reply) => {
  if (Permissions(req.headers.authorization, PermissionTypes.SubmitCamp)) {
    try {
      const { camp } = req.body;

      if (camp._id) {
        const update = await Camp.updateOne(
          { _id: new mongoose.Types.ObjectId(camp._id) },
          camp,
          { new: true }
        );

        return update;
      }

      const insert = await Camp.collection.insertOne(camp);

      return insert;
    } catch (err) {
      throw boom.boomify(err);
    }
  } else {
    reply.code(401);
    return "Vous n'avez pas le droit d'ajouter un camp à l'unité";
  }
};

const getLast = async (req, reply) => {
  if (Permissions(req.headers.authorization, PermissionTypes.SubmitCamp)) {
    try {
      const unitId = req.params.unitId;

      const camp = await Camp.findOne({ unit: unitId }, null, {
        sort: { _id: -1 },
      });

      return camp;
    } catch (err) {
      throw boom.boomify(err);
    }
  } else {
    reply.code(401);
    return "Vous n'avez pas le droit d'effectuer cette action";
  }
};

const getList = async (req, reply) => {
  if (Permissions(req.headers.authorization, PermissionTypes.ApproveCamp)) {
    try {
      const camp = Camp.aggregate([
        {
          $project: {
            dateSoumission: 1,
            debutDuCamp: 1,
            finDuCamp: 1,
            cahierCamp: 1,
            lieuDuCamp: 1,
            chefUnite: 1,
            chefCamp: 1,
            comments: 1,
            membres: 1,
            approuve: 1,
            approuvePar: 1,
            evaluation: 1,
            unit: { $toObjectId: "$unit" },
          },
        },
        {
          $lookup: {
            from: "units",
            localField: "unit",
            foreignField: "_id",
            as: "unitInfo",
          },
        },
        { $unwind: "$unitInfo" },
        { $sort: { _id: -1 } },
      ]);

      return camp;
    } catch (err) {
      throw boom.boomify(err);
    }
  } else {
    reply.code(401);
    return "Vous n'avez pas le droit d'effectuer cette action";
  }
};

export { createNewCamp, getLast, getList };
