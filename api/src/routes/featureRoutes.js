// Import our Controllers
const featureController = require('../controllers/featureController')

const FeatureRoutes = [
  {
    method: 'GET',
    url: '/api/features',
    handler: featureController.getList
  },
  {
    method: 'PUT',
    url: '/api/feature',
    handler: featureController.updateFeature
  }
]

module.exports = FeatureRoutes;