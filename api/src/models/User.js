// External Dependancies
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  courriel: String,
  cd: Date,
  formations: Array,
  nominations: Array,
  isAdmin: Boolean,
  details: Object
})

module.exports = mongoose.model('User', userSchema)
