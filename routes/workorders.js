const express = require('express');
const Workorder = require('../models/workorder');
const Job = require('../models/job');

const router = express.Router();

// Get All
router.get('/api/workorders', async (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const woQuery = Workorder.find();

  try {
    if (pageSize && currentPage) {
      woQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    const workordersCount = await Workorder.countDocuments();
    const workorders = await woQuery
      .populate('user')
      .populate('jobs')
      .populate({
        path: 'jobs',
        populate: { path: 'vendor' }
      })
      .sort('status')
      .sort({ sendDate: -1 });
    res.status(200).json({
      message: 'success',
      workorders: workorders,
      count: workordersCount
    });
  } catch (error) {
    res.status(500).json({
      message: 'No workorder fetched!'
    });
  }
});

// Worker creating with starting info
router.post('/api/workorderStartInfo', async (req, res, next) => {
  try {
    const workorder = new Workorder({
      user: req.body.userId,
      submitDate: Date.now(),
      buildingNumber: Number(req.body.building),
      apartmentNumber: Number(req.body.apartment),
      jobs: [],
      finishDate: '',
      sendDate: ''
    });
    const result = await workorder.save();
    res.status(201).json({ message: 'success', workorder: result });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Worker adding finish date
router.post('/api/workorderFinishDate', async (req, res, next) => {
  const workorder = await Workorder.findById(req.body.id);
  workorder.finishDate = Date.now();
  const result = await workorder.save();
  res.status(200).json({ message: 'success', workorder: result });
});

// // Worker adding jobs
router.post('/api/workorderJobs', async (req, res, next) => {
  let savedJobs = [];
  for (let i = 0; i < req.body.items.length; i++) {
    const job = new Job({
      apartment: req.body.apartment,
      building: req.body.building,
      name: req.body.items[i].name,
      subcat: req.body.items[i].subcat,
      room: req.body.items[i].room,
      price: req.body.items[i].price,
      quantity: req.body.items[i].quantity,
      workerComment: req.body.items[i].comment,
      status: 'created'
    });
    const savedJob = await job.save();
    savedJobs.push(savedJob);
  }
  const workorder = await Workorder.findById(req.body.id);
  for (let i = 0; i < savedJobs.length; i++) {
    workorder.jobs.push(savedJobs[i]._id);
  }
  workorder.sendDate = Date.now();
  const savedWorkorder = await workorder.save();
  res
    .status(200)
    .json({ message: 'success', jobs: savedJobs, workorder: savedWorkorder });
});

module.exports = router;
