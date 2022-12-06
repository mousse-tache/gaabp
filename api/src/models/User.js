// External Dependancies
import mongoose from 'mongoose'

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

export default mongoose.model('User', userSchema)
