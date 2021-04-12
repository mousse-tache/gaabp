// Import our Controllers
const campController = require('../controllers/campController')

const CampRoutes = [
  {
    method: 'POST',
    url: '/api/camp',
    handler: campController.createNewCamp
  },
  {
    method: 'GET',
    url: '/api/camp/last/:unitId',
    handler: campController.getLast
  },
  {
    method: 'GET',
    url: '/api/camps/list',
    handler: campController.getList
  }
]

module.exports = CampRoutes;