const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
require('dotenv').config();  // For using environment variables

const app = express();
app.use(cors()); // Enable CORS to allow frontend to communicate

const API_KEY = process.env.NASA_API_KEY;  // Store your NASA API key securely in .env
console.log("API Key: ", API_KEY);


// Endpoint to fetch Astronomy Picture of the Day (APOD)
app.get('/api/apod', async (req, res) => {
  const date = req.query.date || '';  // Use the date from query if available
  try {
    // Make the request to the NASA APOD API
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`
    );
    res.json(response.data);  // Send the APOD data back to the frontend
  } catch (err) {
    console.error("Error fetching APOD data:", err.message);
    res.status(500).json({ error: 'Failed to fetch APOD data' });  // Handle errors
  }
});

// Endpoint to fetch Mars Rover photos (Curiosity rover)
app.get('/api/mars-rover-photos', async (req, res) => {
  const sol = req.query.sol || 1000;  // Default to Sol 1000 if no sol is provided
  try {
    const response = await axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${API_KEY}`
    );
    res.json(response.data.photos);  // Send Mars Rover photos to the frontend
  } catch (err) {
    console.error("Error fetching Mars Rover photos:", err.message);
    res.status(500).json({ error: 'Failed to fetch Mars Rover photos' });
  }
});

// Endpoint to fetch Near-Earth Objects (NeoWs)
app.get('/api/neows', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${API_KEY}`
    );
    res.json(response.data.near_earth_objects);  // Send NeoWs data to the frontend
  } catch (err) {
    console.error("Error fetching NeoWs data:", err.message);
    res.status(500).json({ error: 'Failed to fetch NeoWs data' });
  }
});

// Endpoint to search NASA Image and Video Library
// Endpoint to search NASA Image and Video Library
app.get('/api/nasa-library', async (req, res) => {
  const query = req.query.query || 'mars';  // Default to searching for "mars"
  try {
    const response = await axios.get(
      `https://images-api.nasa.gov/search?q=${query}`
    );
    res.json(response.data.collection.items);  // Send search results to the frontend
  } catch (err) {
    console.error("Error fetching NASA Library data:", err.message);
    res.status(500).json({ error: 'Failed to fetch NASA Library data' });
  }
});



// if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app
 app.use(express.static(path.join(__dirname, 'client/build')));

  // Fallback to index.html for any other request
  // app.get('*', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  // });
// }




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
