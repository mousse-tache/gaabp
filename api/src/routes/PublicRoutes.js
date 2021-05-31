// Import our Controllers
const identityController = require('../controllers/users/identityController')
const userController = require('../controllers/users/userController')
const groupController = require('../controllers/groupController')

const PublicRoutes = [
  {
    method: 'POST',
    url: '/api/identity',
    handler: identityController.initializeSession
  },
  {
    method: 'POST',
    url: '/api/completeSignup',
    handler: userController.addUsers
  },
  {
    method: 'GET',
    url: '/api/groups/public',
    handler: groupController.getPublicGroups
  }
]

module.exports = PublicRoutes;