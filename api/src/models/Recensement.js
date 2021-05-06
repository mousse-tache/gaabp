// External Dependancies
const mongoose = require('mongoose')

const Recensement = new mongoose.Schema({
  date: Date,
  paiementComplet: Boolean,
  datePaiement: Date,
  details: Object,
  cost: Number,
  unitId: mongoose.Types.ObjectId || String
})

module.exports = mongoose.model('Recensement', Recensement)
