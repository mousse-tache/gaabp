// Import our Controllers
const nominationsController = require('../controllers/nominationsController')

const NominationsRoutes = [
  {
    method: 'GET',
    url: '/api/demandenomination/:completion',
    handler: nominationsController.getByCompletion
  },
  {
    method: 'GET',
    url: '/api/demandenomination/approval/:userId',
    handler: nominationsController.getByApprover
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