import { getGlobalReport } from '../controllers/reporting/homeController.js'

const DecorationsRoutes = [
  {
    method: 'GET',
    url: '/api/reports/global',
    handler: getGlobalReport
  }
]

export default DecorationsRoutes;