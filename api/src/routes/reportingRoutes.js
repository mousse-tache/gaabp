const homeController = require('../controllers/reporting/homeController')

const DecorationsRoutes = [
  {
    method: 'GET',
    url: '/api/reports/global',
    handler: homeController.getGlobalReport
  }
]

module.exports = DecorationsRoutes;