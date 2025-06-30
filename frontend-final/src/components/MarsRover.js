import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

function MarsRover() {
  const [marsRoverData, setMarsRoverData] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [sol, setSol] = useState(1000); // Default Martian Sol (day)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'https://apod-65s3.onrender.com'

  // Fetch Mars Rover photos for the selected Sol
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/api/mars-rover-photos?sol=${sol}`)
      .then((response) => {
        setMarsRoverData(response.data);
        setImageIndex(0);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch Mars Rover photos');
        setLoading(false);
      });
  }, [sol]);

  const handleNextImage = () => {
    if (imageIndex < marsRoverData.length - 1) {
      setImageIndex(imageIndex + 1);
    } else {
      setSol(sol + 1); // Move to the next Sol
    }
  };

  const handlePrevImage = () => {
    if (imageIndex > 0) {
      setImageIndex(imageIndex - 1);
    } else if (sol > 1000) {
      setSol(sol - 1); // Move to the previous Sol
    }
  };

  if (loading) return <p>Loading Mars Rover Photos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mars-rover">
      <h2>Mars Rover Photos (Sol: {sol})</h2>

      {marsRoverData.length > 0 && (
        <div className="mars-rover-image-container">
          <img
            src={marsRoverData[imageIndex]?.img_src}
            alt="Mars Rover"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      )}

      <div className="mars-rover-buttons">
        <button onClick={handlePrevImage} disabled={imageIndex === 0}>
          Previous
        </button>
        <button
          onClick={handleNextImage}
          disabled={imageIndex === marsRoverData.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MarsRover;
