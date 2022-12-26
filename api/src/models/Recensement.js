// External Dependancies
import mongoose from 'mongoose'

const Recensement = new mongoose.Schema({
  date: Date,
  paiementComplet: Boolean,
  datePaiement: Date,
  details: Object,
  cost: Number,
  unitId: mongoose.Types.ObjectId || String
})

export default mongoose.model('Recensement', Recensement)