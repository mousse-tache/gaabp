const mongoose = require('mongoose');

const Decoration = new mongoose.Schema({
  membre: mongoose.Types.ObjectId,
  type: Number,
  dateObtention: Date,
  comments: String
});

module.exports = mongoose.model('decoration', Decoration);
