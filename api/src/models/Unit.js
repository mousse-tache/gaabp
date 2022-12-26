// External Dependancies
import mongoose from 'mongoose'

const unitSchema = new mongoose.Schema({
  nom: String,
  chef: mongoose.Types.ObjectId,
  group: mongoose.Types.ObjectId,
  assistants: Array,
  cd: Date,
  branche: Number,
  genre: Number,
  membres: Array,
  // Active
  a: Boolean
})

export default mongoose.model('Unit', unitSchema)
