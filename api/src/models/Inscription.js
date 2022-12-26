// External Dependancies
import mongoose from 'mongoose'

const inscriptionSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  courriel: String,
  formation: String,
  cd: Date,
  priorite: Number,
  comment: String
})

export default mongoose.model('Inscription', inscriptionSchema)
