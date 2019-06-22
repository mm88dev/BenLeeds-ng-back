const mongoose = require('mongoose');

const workorderSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  submitDate: Date,
  finishDate: Date,
  sendDate: Date,
  buildingNumber: Number,
  apartmentNumber: Number,
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  status: { type: String, default: 'pending' }
});

module.exports = mongoose.model('Workorder', workorderSchema);
