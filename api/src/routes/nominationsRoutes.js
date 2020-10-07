// Import our Controllers
const nominationsController = require('../controllers/nominationsController')

const NominationsRoutes = [
  {
    method: 'GET',
    url: '/api/demandenomination/:completion',
    handler: nominationsController.getByCompletion
  },
  {
    method: 'POST',
    url: '/api/demandenomination',
    handler: nominationsController.addOne
  },
  {
    method: 'PUT',
    url: '/api/demandenomination',
    handler: nominationsController.updateOne
  }
]

module.exports = NominationsRoutes;