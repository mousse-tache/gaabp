// Import our Controllers
import {
  getLatestRecensementbyUnit,
  getbyUnit,
  getbyPayment,
  updateOne,
  addOne,
  deleteOne 
} from '../controllers/recensementController.js'

const RecensementRoutes = [
  {
    method: 'GET',
    url: '/api/recensement/:id',
    handler: getbyUnit
  },
  {
    method: 'GET',
    url: '/api/recensement/latest/:id',
    handler: getLatestRecensementbyUnit
  },
  {
    method: 'GET',
    url: '/api/recensement/paid/:paid',
    handler: getbyPayment
  },
  {
    method: 'POST',
    url: '/api/recensement',
    handler: addOne
  },
  {
    method: 'POST',
    url: '/api/recensement/remove',
    handler: deleteOne
  },
  {
    method: 'PUT',
    url: '/api/recensement',
    handler: updateOne
  }
]

export default RecensementRoutes;