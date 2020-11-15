// Import our Controllers
const identityController = require('../controllers/identityController')

const NominationsRoutes = [
  {
    method: 'POST',
    url: '/api/identity',
    handler: identityController.initializeSession
  }
]

module.exports = NominationsRoutes;