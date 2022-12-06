import mongoose from 'mongoose'

const Decoration = new mongoose.Schema({
  membre: mongoose.Types.ObjectId,
  type: Number,
  dateObtention: Date,
  comments: String
});

export default mongoose.model('decoration', Decoration);
