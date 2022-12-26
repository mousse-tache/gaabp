import { 
  getDecorationsForUser,
  saveDecoration
} from '../controllers/decorationsController.js'

const DecorationsRoutes = [
  {
    method: 'GET',
    url: '/api/decorations/:id',
    handler: getDecorationsForUser
  },
  {
    method: 'PUT',
    url: '/api/decorations',
    handler: saveDecoration
  }
]

export default DecorationsRoutes;