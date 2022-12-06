import {
  getList,
  getActiveFeatures,
  updateFeature
} from '../controllers/featureController.js'

const FeatureRoutes = [
  {
    method: 'GET',
    url: '/api/features',
    handler: getList
  },
  {
    method: 'PUT',
    url: '/api/feature',
    handler: updateFeature
  }
]

export default FeatureRoutes;