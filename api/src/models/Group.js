// External Dependancies
import mongoose from 'mongoose'

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
  units: Array,
  public: Boolean,
  website: String
})

export default mongoose.model('Group', groupSchema)
