// External Dependancies
const mongoose = require('mongoose')

const Nomination = new mongoose.Schema({
  membre: mongoose.Types.ObjectId,
  details: Object,
  status: Number
})

module.exports = mongoose.model('Nomination', userSchema)
