// External Dependancies
const mongoose = require('mongoose')

const inscriptionSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  courriel: String,
  formation: String,
  cd: Date,
  priorite: Number,
  comment: String
})

module.exports = mongoose.model('Inscription', inscriptionSchema)
