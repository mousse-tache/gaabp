// External Dependancies
const mongoose = require('mongoose')

const DemandeNomination = new mongoose.Schema({
  user: mongoose.Types.ObjectId,
  date: Date,
  approvers: Array,
  fidelite: String,
  role: String,
  unit: String,
  group: String,
  engagementChef: String,
  engagementAssistant: String,
  dossierCriminel: String,
  deonto: String,
  motivation: String,
  complete: Boolean
})

module.exports = mongoose.model('DemandeNomination', DemandeNomination)
