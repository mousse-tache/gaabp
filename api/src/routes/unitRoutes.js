// Import our Controllers
import {
  getUnits,
  getByGroupId,
  getSingleUnit,
  getUnitsById,
  addUnit,
  updateUnit,
  deleteUnit
} from '../controllers/unitController.js'

const UnitRoutes = [
    {
        method: 'GET',
        url: '/api/units',
        handler: getUnits
      },
      {
        method: 'GET',
        url: '/api/unit/:id',
        handler: getSingleUnit
      },
      {
        method: 'POST',
        url: '/api/units/ids',
        handler: getUnitsById
      },
      {
        method: 'GET',
        url: '/api/unit/group/:id',
        handler: getByGroupId
      },
      {
        method: 'POST',
        url: '/api/unit',
        handler: addUnit
      },
      {
        method: 'PUT',
        url: '/api/unit/:id',
        handler: updateUnit
      },
      {
        method: 'DELETE',
        url: '/api/unit/:id',
        handler: deleteUnit
      }
]

export default UnitRoutes;