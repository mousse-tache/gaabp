import { 
  createNewCamp,
  getLast,
  getList
}
 from '../controllers/campController.js'

const CampRoutes = [
  {
    method: 'POST',
    url: '/api/camp',
    handler: createNewCamp
  },
  {
    method: 'GET',
    url: '/api/camp/last/:unitId',
    handler: getLast
  },
  {
    method: 'GET',
    url: '/api/camps/list',
    handler: getList
  }
]

export default CampRoutes;