// Import our Controllers
const userController = require('../controllers/users/userController')

const UserRoutes = [
      {
        method: 'GET',
        url: '/api/pendingNominations',
        handler: userController.getPendingNominationUsers
      },
      {
        method: 'GET',
        url: '/api/users/exportcontacts',
        handler: userController.getContacts
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
        method: 'POST',
        url: '/api/user/removefromunit',
        handler: userController.removeFromUnit
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
        method: 'POST',
        url: '/api/user/fusion',
        handler: userController.FuseUsers
      },    
]

module.exports = UserRoutes;