import FeatureManager from "../features/featureManager.js";
import { Permissions } from "../security/permissions.js";
import { PermissionTypes } from "../security/permissionTypes.js";

const featureManager = new FeatureManager();

const getList = async (req, reply) => {
  if (
    Permissions(req.headers.authorization, PermissionTypes.FeatureManagement)
  ) {
    return await featureManager.getList();
  } else {
    reply.code(401);
    return "Cette opération vous est interdite";
  }
};

const getActiveFeatures = async (req, reply) => {
  return await featureManager.getEnabledFeatures();
};

const updateFeature = async (req, reply) => {
  if (
    Permissions(req.headers.authorization, PermissionTypes.FeatureManagement)
  ) {
    return await featureManager.updateFeature(req.body.feature);
  } else {
    reply.code(401);
    return "Cette opération vous est interdite";
  }
};

export { getList, getActiveFeatures, updateFeature };
