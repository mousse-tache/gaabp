// Import our Controllers
const identityController = require('../controllers/identityController')
const userController = require('../controllers/userController')

const NominationsRoutes = [
  {
    method: 'POST',
    url: '/api/identity',
    handler: identityController.initializeSession
  },
  {
    method: 'POST',
    url: '/api/completeSignup',
    handler: userController.addUsers
  }
]

module.exports = NominationsRoutes;