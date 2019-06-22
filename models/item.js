const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  name: { type: String, required: true },
  subcat: { type: String, required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  price: Number,
  status: {type: String, required: true, default: 'ready'},
  quantity: Number,
  comment: String,
});

module.exports = mongoose.model('Item', itemSchema);
