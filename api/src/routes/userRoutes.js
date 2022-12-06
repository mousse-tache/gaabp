// Import our Controllers
import {
  getPendingNominationUsers,
  getContacts,
  getBasicUsersWithPaging,
  searchUsers,
  searchUsersWithFormations,
  searchUsersWithPendingFormations,
  getUsersByUnit,
  removeFromUnit,
  getUsersByGroup,
  getSingleUser,
  getMultipleUsers,
  addUser,
  addUsers,
  updateProfile,
  updateUser,
  deleteUser,
  FuseUsers,
  recommendFormation,
  confirmFormation } from '../controllers/users/userController.js'

const UserRoutes = [
      {
        method: 'GET',
        url: '/api/pendingNominations',
        handler: getPendingNominationUsers
      },
      {
        method: 'GET',
        url: '/api/users/exportcontacts',
        handler: getContacts
      },
      {
        method: 'GET',
        url: '/api/users/paged',
        handler: getBasicUsersWithPaging
      },
      {
        method: 'POST',
        url: '/api/users/search',
        handler: searchUsers
      },
      {
        method: 'POST',
        url: '/api/users/formations/search',
        handler: searchUsersWithFormations
      },
      {
        method: 'GET',
        url: '/api/user/:id',
        handler: getSingleUser
      },
      {
        method: 'POST',
        url: '/api/users/ids',
        handler: getMultipleUsers
      },
      {
        method: 'POST',
        url: '/api/user/removefromunit',
        handler: removeFromUnit
      },
      {
        method: 'GET',
        url: '/api/users/unit/:id',
        handler: getUsersByUnit
      },
      {
        method: 'GET',
        url: '/api/users/group/:id',
        handler: getUsersByGroup
      },
      {
        method: 'POST',
        url: '/api/user',
        handler: addUser
      },  
      {
        method: 'POST',
        url: '/api/users',
        handler: addUsers
      },
      {
        method: 'PUT',
        url: '/api/user/:id',
        handler: updateUser
      },
      {
        method: 'DELETE',
        url: '/api/user/:id',
        handler: deleteUser
      },
      {
        method: 'GET',
        url: '/api/users/pendingFormations',
        handler: searchUsersWithPendingFormations
      },  
      {
        method: 'POST',
        url: '/api/user/formation/:id',
        handler: recommendFormation
      },  
      {
        method: 'PUT',
        url: '/api/user/formation/:id',
        handler: confirmFormation
      },  
      {
        method: 'POST',
        url: '/api/user/fusion',
        handler: FuseUsers
      },    
]

export default UserRoutes;