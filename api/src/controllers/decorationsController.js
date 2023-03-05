import boom from "boom";
import mongoose from "mongoose";

import Decoration from "../models/Decoration.js";

import { Permissions } from "../security/permissions.js";
import { PermissionTypes } from "../security/permissionTypes.js";

const getDecorationsForUser = async (req, reply) => {
  try {
    const id = req.params.id;
    return await Decoration.find({ membre: new mongoose.Types.ObjectId(id) });
  } catch (err) {
    throw boom.boomify(err);
  }
};

const saveDecoration = async (req, reply) => {
  if (
    Permissions(req.headers.authorization, PermissionTypes.UpdateDecorations)
  ) {
    try {
      const { decoration } = req.body;

      if (decoration._id) {
        const update = await Decoration.findByIdAndUpdate(
          decoration._id,
          decoration,
          { new: true }
        );

        return update;
      }

      const insert = await Decoration.collection.insertOne(decoration);

      return insert;
    } catch (err) {
      throw boom.boomify(err);
    }
  } else {
    reply.code(401);
    return "Vous n'avez pas le droit de faire modifier les décorations";
  }
};

export { getDecorationsForUser, saveDecoration };
