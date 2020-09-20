// Import our Controllers
const recensementController = require('../controllers/recensementController')

const RecensementRoutes = [
  {
    method: 'GET',
    url: '/api/recensement/:id',
    handler: recensementController.getbyUnit
  },
  {
    method: 'GET',
    url: '/api/recensement/latest/:id',
    handler: recensementController.getLatestRecensementbyUnit
  },
  {
    method: 'GET',
    url: '/api/recensement/paid/:paid',
    handler: recensementController.getbyPayment
  },
  {
    method: 'POST',
    url: '/api/recensement',
    handler: recensementController.addOne
  },
  {
    method: 'PUT',
    url: '/api/recensement',
    handler: recensementController.updateOne
  }
]

module.exports = RecensementRoutes;