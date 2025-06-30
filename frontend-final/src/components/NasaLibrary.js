import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import '../App.css';

function NasaLibrary() {
  const [nasaData, setNasaData] = useState([]);
  const [query, setQuery] = useState('space');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Base URL logic
  const API_BASE_URL =
    process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/api/nasa-library?query=${query}`)
      .then(response => {
        const filteredData = response.data.filter(
          item => item.data[0].media_type === 'image'
        );
        setNasaData(filteredData);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching NASA library data", error);
        setError("Failed to fetch data. Please try again.");
        setLoading(false);
      });
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value;
    setQuery(searchValue);
  };

  return (
    <div className="nasa-library">
      <h1>NASA Image Library</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          placeholder="Search for images"
          defaultValue={query}
        />
        <button type="submit">Search</button>
      </form>

      <p className="search-instructions">
        Try searching for terms like "milky way", "blackhole", "satellite", etc.
      </p>

      {loading && (
        <div className="loading">
          <ClipLoader size={150} color="#00bfff" loading={loading} />
          <p>Loading data...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError(null)}>Try Again</button>
        </div>
      )}

      {nasaData && nasaData.length > 0 && !loading && !error ? (
        <div className="nasa-library-items">
          {nasaData.map((item, index) => (
            <div key={index} className="nasa-library-item">
              <h3>{item.data[0].title}</h3>
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
