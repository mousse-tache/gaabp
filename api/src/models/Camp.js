const mongoose = require('mongoose');

const Camp = new mongoose.Schema({
  unit: mongoose.Types.ObjectId,
  dateSoumission: Date,
  debutDuCamp: Date,
  finDuCamp: Date,
  comments: String
});

module.exports = mongoose.model('camp', Camp);
