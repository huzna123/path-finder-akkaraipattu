const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// CORS மற்றும் JSON மிடில்வேர்களை அமைத்தல்
app.use(cors());
app.use(express.json());

// 1. MongoDB Atlas Connection String
const MONGO_URI = 'mongodb+srv://fathihuz45_db_user:Huzna1234@cluster0.wdojzsz.mongodb.net/traveldb?retryWrites=true&w=majority';

// 2. Local MongoDB Connection String (இன்டர்நெட் பிரச்சனை இருந்தால் இதை பயன்படுத்தலாம்)
// const MONGO_URI = 'mongodb://127.0.0.1:27017/traveldb';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully! 🚀'))
  .catch(err => console.log('DB Connection Error: ', err));

// Destination Schema & Model
const destinationSchema = new mongoose.Schema({
  title: String,
  category: String,
  lat: Number,
  lng: Number,
  distanceFromLocation: String,
  description: String,
  openingHours: String,
  peakHours: String,
  bestTimeToVisit: String,
  entryFee: String,
  parking: String,
  dressCode: String,
  image: String
});

const Destination = mongoose.model('Destination', destinationSchema);

// 1. GET: Fetch all destinations
app.get('/api/destinations', async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (err) {
    console.error('SERVER ERROR DETAILS:', err);
    res.status(500).json({ error: err.message });
  }
});

// 2. GET: Fetch single destination by ID
app.get('/api/destinations/:id', async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }
    res.json(destination);
  } catch (err) {
    console.error('SERVER ERROR DETAILS:', err);
    res.status(500).json({ error: err.message });
  }
});

// 3. POST: Add new destination
app.post('/api/destinations', async (req, res) => {
  try {
    const newDestination = new Destination(req.body);
    const savedDestination = await newDestination.save();
    res.status(201).json(savedDestination);
  } catch (err) {
    console.error('SERVER ERROR DETAILS:', err);
    res.status(500).json({ error: err.message });
  }
});

// 4. PUT: Update destination
app.put('/api/destinations/:id', async (req, res) => {
  try {
    const updatedDestination = await Destination.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updatedDestination) {
      return res.status(404).json({ error: 'Destination not found for update' });
    }
    res.json(updatedDestination);
  } catch (err) {
    console.error('SERVER ERROR DETAILS:', err);
    res.status(500).json({ error: err.message });
  }
});

// 5. DELETE: Remove destination
app.delete('/api/destinations/:id', async (req, res) => {
  try {
    const deletedDestination = await Destination.findByIdAndDelete(req.params.id);
    if (!deletedDestination) {
      return res.status(404).json({ error: 'Destination not found for deletion' });
    }
    res.json({ message: 'Destination deleted successfully' });
  } catch (err) {
    console.error('SERVER ERROR DETAILS:', err);
    res.status(500).json({ error: err.message });
  }
});

// Start Server
app.listen(5000, () => {
  console.log('Server is running on port 5000 🚀');
});