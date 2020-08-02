// External Dependancies
const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
  nom: String,
  numero: String || Number,
  chef: mongoose.Types.ObjectId,
  ville: String,
  assistants: Array,
  cd: Date,
  region: String,
  adresse: String,
  foulard: String,
  units: Array
})

module.exports = mongoose.model('Group', groupSchema)
