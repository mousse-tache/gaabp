// Import our Controllers
const inscriptionController = require('../controllers/inscriptionController')

const UserRoutes = require('./userRoutes')
const GroupRoutes = require('./groupRoutes')
const UnitRoutes = require('./unitRoutes')
const RecensementRoutes = require('./recensementRoutes')
const NominationsRoutes = require('./nominationsRoutes')
const DecorationsRoutes = require('./decorationsRoutes')
const ReportingRoutes = require('./reportingRoutes')
const CampRoutes = require('./campRoutes')
const FeatureRoutes = require('./featureRoutes')

const otherRoutes = [
  {
    method: 'GET',
    url: '/api/inscriptions',
    handler: inscriptionController.getInscriptions
  },
  {
    method: 'GET',
    url: '/api/inscription/:id',
    handler: inscriptionController.getSingleInscription
  },
  {
    method: 'POST',
    url: '/api/inscription',
    handler: inscriptionController.addInscription,
  },
  {
    method: 'PUT',
    url: '/api/inscription/:id',
    handler: inscriptionController.updateInscription
  },
  {
    method: 'DELETE',
    url: '/api/inscription/:id',
    handler: inscriptionController.deleteInscription
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

module.exports = routes
