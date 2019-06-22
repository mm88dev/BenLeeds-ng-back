const express = require('express');
const Vendor = require('../models/vendor');

const router = express.Router();

// Get All
router.get('/api/vendors', async (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const vendorsQuery = Vendor.find();
  if (pageSize && currentPage) {
    vendorsQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  const vendorsCount = await Vendor.countDocuments();
  const vendors = await vendorsQuery.populate('jobs');
  res
    .status(200)
    .json({ message: 'success', vendors: vendors, count: vendorsCount });
});

// Create Vendor
router.post('/api/vendor', async (req, res, next) => {
  const vendor = new Vendor({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    category: req.body.category
  });
  const result = await vendor.save();
  res.status(200).json({ message: 'success', vendor: result });
});

// Edit Vendor
router.post('/api/vendor/:id', async (req, res, next) => {
  let submittedVendor = await Vendor.findById(req.params.id);
  submittedVendor.firstName = req.body.firstName;
  submittedVendor.lastName = req.body.lastName;
  submittedVendor.email = req.body.email;
  submittedVendor.category = req.body.category;
  const savedVendor = await submittedVendor.save();
  res.status(200).json({ message: 'success', vendor: savedVendor });
});

// Admin Delete Vendor
router.delete('/api/vendor/:id', async (req, res, next) => {
  const result = await Vendor.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: 'success', vendor: result });
});

module.exports = router;
