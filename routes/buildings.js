const express = require('express');
const Building = require('../models/building');

const router = express.Router();

router.get('/api/buildings', async (req, res, next) => {
  try {
    const buildings = await Building.find().sort({ number: 1 });
    res.status(200).json({ message: 'success', buildings: buildings });
  } catch (error) {
    res.status(500).json({ error: 'No buildings fetched!' });
  }
});

module.exports = router;
