// Import our Controllers
import  {
  getGroups,
  getSingleGroup,
  getGroupsById,
  getSingleGroupByNumber,
  addGroup,
  updateGroup,
  deleteGroup
} from '../controllers/groupController.js'

const GroupRoutes = [
    {
        method: 'GET',
        url: '/api/groups',
        handler: getGroups
      },
      {
        method: 'GET',
        url: '/api/group/:id',
        handler: getSingleGroup
      },
      {
        method: 'GET',
        url: '/api/group/numero/:numero',
        handler: getSingleGroupByNumber
      },  
      {
        method: 'POST',
        url: '/api/group',
        handler: addGroup
      },
      {
        method: 'PUT',
        url: '/api/group/:id',
        handler: updateGroup
      },
      {
        method: 'DELETE',
        url: '/api/group/:id',
        handler: deleteGroup
      },
      {
        method: 'POST',
        url: '/api/groups/ids',
        handler: getGroupsById
      },
]

export default GroupRoutes;