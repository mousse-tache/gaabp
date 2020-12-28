// Import our Controllers
const decorationsController = require('../controllers/decorationsController')

const DecorationsRoutes = [
  {
    method: 'GET',
    url: '/api/decorations/:id',
    handler: decorationsController.getDecorationsForUser
  }
]

module.exports = DecorationsRoutes;