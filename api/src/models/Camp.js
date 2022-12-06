import mongoose from 'mongoose'

const Camp = new mongoose.Schema({
  unit: String,
  dateSoumission: Date,
  debutDuCamp: Date,
  finDuCamp: Date,
  cahierCamp: String,
  lieuDuCamp: Object,
  chefUnite: Object,
  chefCamp: Object,
  comments: String,
  membres: Array,
  approuve: Boolean,
  approuvePar: Object,
  evaluation: String
});

export default mongoose.model('camp', Camp);
