const mongoose = require('mongoose');

const vendorSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: String,
  email: String,
  category: String,
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }]
});

module.exports = mongoose.model('Vendor', vendorSchema);
