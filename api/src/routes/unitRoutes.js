// Import our Controllers
const unitController = require('../controllers/unitController')

const UnitRoutes = [
    {
        method: 'GET',
        url: '/api/units',
        handler: unitController.getUnits
      },
      {
        method: 'GET',
        url: '/api/unit/:id',
        handler: unitController.getSingleUnit
      },
      {
        method: 'POST',
        url: '/api/units/ids',
        handler: unitController.getUnitsById
      },
      {
        method: 'GET',
        url: '/api/unit/group/:id',
        handler: unitController.getByGroupId
      },
      {
        method: 'POST',
        url: '/api/unit',
        handler: unitController.addUnit
      },
      {
        method: 'PUT',
        url: '/api/unit/:id',
        handler: unitController.updateUnit
      },
      {
        method: 'DELETE',
        url: '/api/unit/:id',
        handler: unitController.deleteUnit
      }
]

module.exports = UnitRoutes;