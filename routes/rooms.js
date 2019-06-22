const express = require('express');
const Room = require('../models/room');

const router = express.Router();

router.get('/api/rooms', async (req, res, next) => {
  const rooms = await Room.find();
  res.status(200).json({ message: 'success', rooms: rooms });
});

module.exports = router;
