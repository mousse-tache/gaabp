// Import our Controllers
const eligibilityController = require('../controllers/users/eligibilityController')

const CampRoutes = [
  {
    method: 'GET',
    url: '/api/eligibility/users',
    handler: eligibilityController.getEligibilityByHonor
  },
]

module.exports = CampRoutes;