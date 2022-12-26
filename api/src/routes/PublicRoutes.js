import { initializeSession } from '../controllers/users/identityController.js'
import { addUser } from '../controllers/users/userController.js'
import { getPublicGroups } from '../controllers/groupController.js'
import { getActiveFeatures } from '../controllers/featureController.js'

const PublicRoutes = [
  {
    method: 'POST',
    url: '/api/identity',
    handler: initializeSession
  },
  {
    method: 'POST',
    url: '/api/completeSignup',
    handler: addUser
  },
  {
    method: 'GET',
    url: '/api/groups/public',
    handler: getPublicGroups
  },
  {
    method: 'GET',
    url: '/api/activefeatures',
    handler: getActiveFeatures
  },
]

export default PublicRoutes;