// External Dependancies
const mongoose = require('mongoose')

const Recensement = new mongoose.Schema({
  date: Date,
  paiementComplet: Boolean,
  details: Object,
  cost: Number,
  unitId: mongoose.Types.ObjectId
})

module.exports = mongoose.model('Recensement', Recensement)
