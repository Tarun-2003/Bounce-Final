const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
require('dotenv').config();  // For environment variables

const app = express();
app.use(cors()); // Allow frontend communication

const API_KEY = process.env.NASA_API_KEY;
console.log("API Key loaded:", !!API_KEY); // Safer than printing the key

// ==================== API ROUTES ====================

// Astronomy Picture of the Day (APOD)
app.get('/api/apod', async (req, res) => {
  const date = req.query.date || '';
  try {
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`
    );
    res.json(response.data);
  } catch (err) {
    console.error("APOD error:", err.message);
    res.status(500).json({ error: 'Failed to fetch APOD data' });
  }
});

// Mars Rover Photos
app.get('/api/mars-rover-photos', async (req, res) => {
  const sol = req.query.sol || 1000;
  try {
    const response = await axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${API_KEY}`
    );
    res.json(response.data.photos);
  } catch (err) {
    console.error("Mars Rover error:", err.message);
    res.status(500).json({ error: 'Failed to fetch Mars Rover photos' });
  }
});

// Near-Earth Objects (NeoWs)
app.get('/api/neows', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${API_KEY}`
    );
    res.json(response.data.near_earth_objects);
  } catch (err) {
    console.error("NeoWs error:", err.message);
    res.status(500).json({ error: 'Failed to fetch NeoWs data' });
  }
});

// NASA Image and Video Library
app.get('/api/nasa-library', async (req, res) => {
  const query = req.query.query || 'mars';
  try {
    const response = await axios.get(
      `https://images-api.nasa.gov/search?q=${query}`
    );
    res.json(response.data.collection.items);
  } catch (err) {
    console.error("NASA Library error:", err.message);
    res.status(500).json({ error: 'Failed to fetch NASA Library data' });
  }
});

// ==================== STATIC FILE SERVING ====================

// Serve frontend build (React)
app.use(express.static(path.join(__dirname, 'client/build')));

// Fallback to React for unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// ==================== START SERVER ====================

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));

