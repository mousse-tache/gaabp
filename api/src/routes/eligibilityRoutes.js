// Import our Controllers
import { getEligibilityByHonor } from '../controllers/users/eligibilityController.js'

const CampRoutes = [
  {
    method: 'GET',
    url: '/api/eligibility/users',
    handler: getEligibilityByHonor
  },
]

export default CampRoutes;