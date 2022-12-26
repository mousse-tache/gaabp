import {
  getByCompletion,
  getByApprover,
  updateOne,
  addOne,
  refuseNomination,
  confirmNomination
} from '../controllers/users/nominationsController.js'

const NominationsRoutes = [
  {
    method: 'GET',
    url: '/api/demandenomination/:completion',
    handler: getByCompletion
  },
  {
    method: 'GET',
    url: '/api/demandenomination/approval/:userId',
    handler: getByApprover
  },
  {
    method: 'POST',
    url: '/api/demandenomination',
    handler: addOne
  },
  {
    method: 'PUT',
    url: '/api/demandenomination',
    handler: updateOne
  },
  {
    method: 'POST',
    url: '/api/demandenomination/confirm',
    handler: confirmNomination
  },
  {
    method: 'POST',
    url: '/api/demandenomination/refuse',
    handler: refuseNomination
  }
]

export default NominationsRoutes;