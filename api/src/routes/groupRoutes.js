// Import our Controllers
const groupController = require('../controllers/groupController')

const GroupRoutes = [
    {
        method: 'GET',
        url: '/api/groups',
        handler: groupController.getGroups
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
        method: 'POST',
        url: '/api/groups/ids',
        handler: groupController.getGroupsById
      },
]

module.exports = GroupRoutes;