const express = require('express');
const mongoose = require('mongoose');
const Vendor = require('./models/vendor');
const Building = require('./models/building');
const Room = require('./models/room');
const Item = require('./models/item');
const usersRoutes = require('./routes/users');
const buildingsRoutes = require('./routes/buildings');
const roomsRoutes = require('./routes/rooms');
const itemsRoutes = require('./routes/items');
const workordersRoutes = require('./routes/workorders');
const vendorsRoutes = require('./routes/vendors');
const jobsRoutes = require('./routes/jobs');

// Start App
const app = express();

// Connect with MongoDb
mongoose
  .connect(
    'mongodb+srv://root:PARtizan1945@benleeds-j2qky.mongodb.net/BenLeeds_db?retryWrites=true',
    {
      useNewUrlParser: true,
      useCreateIndex: true
    }
  )
  .then(() => {
    console.log('Connected to MongoDB...');
  })
  .catch(err => {
    console.log('Connection failed: ', err.message);
  });

// Middlewares
// Body Parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// Routes
// All
app.get('/api/all', async (req, res, next) => {
  const buildings = await Building.find();
  const users = await Vendor.find();
  const rooms = await Room.find();
  const items = await Item.find();
  res.status(200).json({
    message: 'success',
    users: users,
    buildings: buildings,
    rooms: rooms,
    items: items
  });
});

app.use(usersRoutes);
app.use(buildingsRoutes);
app.use(roomsRoutes);
app.use(itemsRoutes);
app.use(workordersRoutes);
app.use(vendorsRoutes);
app.use(jobsRoutes);

module.exports = app;
