import boom from "boom";
import Feature from "../models/Feature.js";
import Features from "./features.js";

// Should be used to gate backend behaviors depending on feature activation state
// SHould be expanded to cover implementations directly in featureController
export default class FeatureManager {
  isFeatureEnabledAsync = async (feature) => {
    try {
      let dbFeature = await Feature.findOne({ _id: feature });

      return dbFeature?.activated ?? false;
    } catch (err) {
      throw boom.boomify(err);
    }
  };

  getEnabledFeatures = async () => {
    try {
      var dbFeatures = await Feature.find({ activated: true });

      return dbFeatures;
    } catch (err) {
      throw boom.boomify(err);
    }
  };

  getList = async () => {
    try {
      var dbFeatures = await Feature.find({});
      var result = Object.keys(Features).map((x) => {
        var f = dbFeatures.find((f) => f.name == x);

        if (f) {
          return f;
        }

        return { _id: Features[x], name: x };
      });

      return result;
    } catch (err) {
      throw boom.boomify(err);
    }
  };

  updateFeature = async (feature) => {
    try {
      if (feature._id) {
        const update = await Feature.findByIdAndUpdate(feature._id, feature, {
          new: true,
          upsert: true,
        });

        return update;
      }

      const insert = new Feature(feature);

      return insert.save();
    } catch (err) {
      throw boom.boomify(err);
    }
  };
}
