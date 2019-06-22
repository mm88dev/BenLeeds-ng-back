const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model('Room', roomSchema);
