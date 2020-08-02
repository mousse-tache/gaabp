// External Dependancies
const mongoose = require('mongoose')

const FormationSchema = new mongoose.Schema({
  membre: mongoose.Types.ObjectId,
  details: Object,
  status: Number
})

module.exports = mongoose.model('Formation', userSchema)
