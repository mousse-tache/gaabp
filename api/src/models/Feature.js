// External Dependancies
import mongoose from 'mongoose'

const Feature = new mongoose.Schema({
  _id: Number,
  name: String,
  activated: Boolean
})

export default mongoose.model('Feature', Feature)
