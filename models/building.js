const mongoose = require('mongoose');

const buildingSchema = mongoose.Schema({
  region: { type: String, required: true },
  regionId: { type: Number },
  number: { type: Number, required: true },
  adress: { type: String, required: true },
  zip: { type: Number, required: true }
});

module.exports = mongoose.model('Building', buildingSchema);
