const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// CORS மற்றும் JSON மிடில்வேர்களை அமைத்தல்
app.use(cors());
app.use(express.json());

// MongoDB connection string (Environment Variable பயன்படுத்த பரிந்துரைக்கப்படுகிறது)
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://fathihuz45_db_user:Huzna1234@cluster0.wdojzsz.mongodb.net/traveldb?retryWrites=true&w=majority';

// Serverless-ல் மீண்டும் மீண்டும் இணைப்பை ஏற்படுத்தாமல் இருக்க Helper Function
let isConnected = false;
const connectToDatabase = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log('MongoDB Connected Successfully! 🚀');
  } catch (err) {
    console.error('DB Connection Error: ', err);
  }
};

// ஒவ்வொரு Request வரையிலும் DB இணைப்பைச் சரிபார்த்தல்
app.use(async (req, res, next) => {
  await connectToDatabase();
  next();
});

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

const Destination = mongoose.models.Destination || mongoose.model('Destination', destinationSchema);

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

// Vercel Serverless Function-க்காக App-ஐ எக்ஸ்போர்ட் செய்தல்
module.exports = app;