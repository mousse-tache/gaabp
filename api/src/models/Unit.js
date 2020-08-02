// External Dependancies
const mongoose = require('mongoose')

const unitSchema = new mongoose.Schema({
  nom: String,
  chef: mongoose.Types.ObjectId,
  group: mongoose.Types.ObjectId,
  assistants: Array,
  cd: Date,
  branche: Number,
  genre: Number,
  membres: Array
})

module.exports = mongoose.model('Unit', unitSchema)
