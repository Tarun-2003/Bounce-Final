import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import '../App.css';
function NasaLibrary() {
  const [nasaData, setNasaData] = useState([]);
  const [query, setQuery] = useState('space'); // Default search query
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch NASA Library data from the API
  useEffect(() => {
    setLoading(true); // Start loading
    axios
      .get(`https://images-api.nasa.gov/search?q=${query}`)
      .then(response => {
        // Filter out any video items from the response
        const filteredData = response.data.collection.items.filter(item => item.data[0].media_type === 'image');
        setNasaData(filteredData); // Set only image data
        setLoading(false); // End loading
      })
      .catch(error => {
        console.error("Error fetching NASA library data", error);
        setError("Failed to fetch data. Please try again."); // Set error message
        setLoading(false); // End loading
      });
  }, [query]);

  // Handle the search input change
  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value;
    setQuery(searchValue);  // Update the query and fetch new results
  };

  return (
    <div className="nasa-library">
      <h1>NASA Image Library</h1>
      
      {/* Search bar with button */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          placeholder="Search for images"
          defaultValue={query}  // Set default value for the input
        />
        <button type="submit">Search</button>
      </form>

      {/* Instructions on what to search for */}
      <p className="search-instructions">
        Try searching for terms like "milky way", "blackhole", "satellite", etc.
      </p>

      {/* Show loading spinner */}
      {loading && (
        <div className="loading">
          <ClipLoader size={150} color="#00bfff" loading={loading} />
          <p>Loading data...</p>
        </div>
      )}

      {/* Show error message */}
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError(null)}>Try Again</button>
        </div>
      )}

      {/* Display images */}
      {nasaData && nasaData.length > 0 && !loading && !error ? (
        <div className="nasa-library-items">
          {nasaData.map((item, index) => (
            <div key={index} className="nasa-library-item">
              <h3>{item.data[0].title}</h3>
              {/* Render only images */}
              <img
                src={item.links[0].href}
                alt={item.data[0].title}
                style={{ width: '100%' }}
              />
            </div>
          ))}
        </div>
      ) : (
        !loading && !error && <p>No results found</p>
      )}
    </div>
  );
}

export default NasaLibrary;
