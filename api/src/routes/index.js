// Import our Controllers
const inscriptionController = require('../controllers/inscriptionController')
const userController = require('../controllers/userController')
const groupController = require('../controllers/groupController')
const unitController = require('../controllers/unitController')

const RecensementRoutes = require('./recensementRoutes')
const NominationsRoutes = require('./nominationsRoutes')
const IdentityRoutes = require('./identityRoutes')

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
    // schema: documentation.addInscriptionSchema
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
  },
  {
    method: 'GET',
    url: '/api/users',
    handler: userController.getUsers
  },
  {
    method: 'GET',
    url: '/api/pendingNominations',
    handler: userController.getPendingNominationUsers
  },
  {
    method: 'GET',
    url: '/api/users/basic',
    handler: userController.getBasicUsers
  },
  {
    method: 'GET',
    url: '/api/users/paged',
    handler: userController.getBasicUsersWithPaging
  },
  {
    method: 'POST',
    url: '/api/users/search',
    handler: userController.searchUsers
  },
  {
    method: 'POST',
    url: '/api/users/formations/search',
    handler: userController.searchUsersWithFormations
  },
  {
    method: 'GET',
    url: '/api/user/:id',
    handler: userController.getSingleUser
  },
  {
    method: 'POST',
    url: '/api/users/ids',
    handler: userController.getMultipleUsers
  },
  {
    method: 'GET',
    url: '/api/users/unit/:id',
    handler: userController.getUsersByUnit
  },
  {
    method: 'GET',
    url: '/api/users/group/:id',
    handler: userController.getUsersByGroup
  },
  {
    method: 'GET',
    url: '/api/user/email/:email',
    handler: userController.getSingleUserByEmail
  },  
  {
    method: 'POST',
    url: '/api/user',
    handler: userController.addUser
  },  
  {
    method: 'POST',
    url: '/api/users',
    handler: userController.addUsers
  },
  {
    method: 'PUT',
    url: '/api/user/:id',
    handler: userController.updateUser
  },
  {
    method: 'DELETE',
    url: '/api/user/:id',
    handler: userController.deleteUser
  },
  {
    method: 'GET',
    url: '/api/users/pendingFormations',
    handler: userController.searchUsersWithPendingFormations
  },  
  {
    method: 'GET',
    url: '/api/users/exportcontacts',
    handler: userController.getContacts
  },  
  
  {
    method: 'GET',
    url: '/api/users/formateurs',
    handler: userController.getFormateurs
  },  
  {
    method: 'GET',
    url: '/api/groups',
    handler: groupController.getGroups
  },
  {
    method: 'GET',
    url: '/api/groups/public',
    handler: groupController.getPublicGroups
  },
  {
    method: 'GET',
    url: '/api/group/:id',
    handler: groupController.getSingleGroup
  },
  {
    method: 'GET',
    url: '/api/group/numero/:numero',
    handler: groupController.getSingleGroupByNumber
  },  
  {
    method: 'POST',
    url: '/api/group',
    handler: groupController.addGroup
  },
  {
    method: 'PUT',
    url: '/api/group/:id',
    handler: groupController.updateGroup
  },
  {
    method: 'DELETE',
    url: '/api/group/:id',
    handler: groupController.deleteGroup
  },
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
    method: 'POST',
    url: '/api/groups/ids',
    handler: groupController.getGroupsById
  },
  {
    method: 'GET',
    url: '/api/unit/group/:id',
    handler: unitController.getByGroupId
  },
  {
    method: 'GET',
    url: '/api/unit/name/:name',
    handler: unitController.getUnitsByName
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

var routes = otherRoutes.concat(RecensementRoutes).concat(NominationsRoutes).concat(IdentityRoutes)

module.exports = routes
