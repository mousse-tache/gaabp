// External Dependancies
const mongoose = require('mongoose')

const Feature = new mongoose.Schema({
  _id: Number,
  name: String,
  activated: Boolean
})

module.exports = mongoose.model('Feature', Feature)
