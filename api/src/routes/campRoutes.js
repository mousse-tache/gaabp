// Import our Controllers
const campController = require('../controllers/campController')

const CampRoutes = [
  {
    method: 'POST',
    url: '/api/camp',
    handler: campController.createNewCamp
  }
]

module.exports = CampRoutes;