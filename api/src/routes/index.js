// Import our Controllers
import { getInscriptions, getSingleInscription, addInscription, updateInscription, deleteInscription } from '../controllers/inscriptionController.js'

import UserRoutes from './userRoutes.js'
import GroupRoutes from './groupRoutes.js'
import UnitRoutes from './unitRoutes.js'
import RecensementRoutes from './recensementRoutes.js'
import NominationsRoutes from './nominationsRoutes.js'
import DecorationsRoutes from './decorationsRoutes.js'
import ReportingRoutes from './reportingRoutes.js'
import CampRoutes from './campRoutes.js'
import FeatureRoutes from './featureRoutes.js'
import EligibilityRoutes from './eligibilityRoutes.js'

import PublicRoutes from './PublicRoutes.js'

const otherRoutes = [
  {
    method: 'GET',
    url: '/api/inscriptions',
    handler: getInscriptions
  },
  {
    method: 'GET',
    url: '/api/inscription/:id',
    handler: getSingleInscription
  },
  {
    method: 'POST',
    url: '/api/inscription',
    handler: addInscription,
  },
  {
    method: 'PUT',
    url: '/api/inscription/:id',
    handler: updateInscription
  },
  {
    method: 'DELETE',
    url: '/api/inscription/:id',
    handler: deleteInscription
  }
]

var routes = otherRoutes.concat(RecensementRoutes)
              .concat(NominationsRoutes)
              .concat(DecorationsRoutes)
              .concat(ReportingRoutes)
              .concat(UserRoutes)
              .concat(GroupRoutes)
              .concat(UnitRoutes)
              .concat(CampRoutes)
              .concat(FeatureRoutes)
              .concat(EligibilityRoutes)

export default routes;

export {
  PublicRoutes
}
