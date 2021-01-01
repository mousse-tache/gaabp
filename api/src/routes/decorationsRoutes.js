// Import our Controllers
const decorationsController = require('../controllers/decorationsController')

const DecorationsRoutes = [
  {
    method: 'GET',
    url: '/api/decorations/:id',
    handler: decorationsController.getDecorationsForUser
  },
  {
    method: 'PUT',
    url: '/api/decorations',
    handler: decorationsController.saveDecoration
  }
]

module.exports = DecorationsRoutes;