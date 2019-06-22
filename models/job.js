const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
  apartment: String,
  building: String,
  name: { type: String, required: true },
  subcat: { type: String, required: true },
  room: { type: String, required: true },
  price: Number,
  //namesti za status da ima created, pa onda da ima sent, i onda na kraju finished
  quantity: Number,
  workerComment: String,
  status: { type: String, required: true},
  adminComment: String,
  sentDate: {type: Date, default: Date.now()},
  endDate: Date,
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' }
});

module.exports = mongoose.model('Job', jobSchema);
