import mongoose from 'mongoose'

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

export default mongoose.model('DemandeNomination', DemandeNomination)
