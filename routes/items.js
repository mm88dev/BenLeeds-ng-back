const express = require('express');
const Item = require('../models/item');

const router = express.Router();

// Get All
router.get('/api/items', async (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const itemsQuery = Item.find();
  try {
    if (pageSize && currentPage) {
      itemsQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    const itemsCount = await Item.countDocuments();
    const items = await itemsQuery.sort('name').populate('room');
    res
      .status(200)
      .json({ message: 'success', items: items, count: itemsCount });
  } catch (error) {
    res.status(500).json({
      message: 'No fetched items!'
    });
  }
});

// Reset All Items Status
router.get('/api/itemsReset', async (req, res, next) => {
  const items = await Item.find();
  for (let i = 0; i < items.length; i++) {
    items[i].status = 'ready';
    items[i].quantity = null;
    items[i].comment = '';
    items[i].save();
  }
  res.status(200).json({ message: 'success', items: items });
});

// User Edit Item
router.post('/api/items/:id', async (req, res, next) => {
  let submittedItem = await Item.findById(req.params.id);

  if (req.body.status) {
    submittedItem.status = 'fixing';
    submittedItem.quantity = req.body.item.quantity;
    submittedItem.comment = req.body.item.comment;
  } else {
    submittedItem.status = 'ready';
    submittedItem.quantity = null;
    submittedItem.comment = '';
  }
  const savedItem = await submittedItem.save();
  res.status(200).json({ message: 'success', item: savedItem });
});

// Create New Item
router.post('/api/admin/item', async (req, res, next) => {
  const item = new Item({
    name: req.body.name,
    subcat: req.body.subcat,
    room: req.body.room,
    price: Number(req.body.price),
    quantity: null,
    comment: ''
  });
  const result = await item.save();
  res.status(200).json({ message: 'success', item: result });
});

// Admin Edit Items
router.post('/api/admin/item/:id', async (req, res, next) => {
  let submittedItem = await Item.findById(req.params.id);
  submittedItem.name = req.body.name;
  submittedItem.subcat = req.body.subcat;
  submittedItem.price = req.body.price;
  const savedItem = await submittedItem.save();
  res.status(200).json({ message: 'success', item: savedItem });
});

// Admin Delete Items
router.delete('/api/admin/item/:id', async (req, res, next) => {
  const result = await Item.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: 'success', item: result });
});

module.exports = router;
