const express = require('express');
const Job = require('../models/job');
const Vendor = require('../models/vendor');

const router = express.Router();

// Get Jobs
router.get('/api/jobs', async (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const jobsQuery = Job.find();
  if (pageSize && currentPage) {
    jobsQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  const jobsCount = await Job.countDocuments();
  const jobs = await jobsQuery.populate('vendor');
  res
    .status(200)
    .json({ message: 'success', jobs: jobs, count: jobsCount });
});
// Create Job
router.post('/api/job', async (req, res, next) => {
  let submittedJob = await Job.findById(req.body.jobId);
  submittedJob.adminComment = req.body.adminComment;
  submittedJob.endDate = req.body.endDate;
  submittedJob.vendor = req.body.vendorId;
  submittedJob.status = 'sent';
  const savedJob = await submittedJob.save();
  const vendor = await Vendor.findById(req.body.vendorId);
  let index = vendor.jobs.indexOf(
    vendor.jobs.find(j => {
      return j == savedJob._id;
    })
  );
  vendor.jobs.splice(index, 1);
  vendor.jobs.push(savedJob._id);
  const savedVendor = await vendor.save();
  res
    .status(200)
    .json({ message: 'success', job: savedJob, vendor: savedVendor });
});

module.exports = router;
