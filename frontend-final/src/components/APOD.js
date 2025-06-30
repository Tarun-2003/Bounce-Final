import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
function APOD() {
  const [apod, setApod] = useState(null); // State to store the APOD data
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to handle errors
  const [date, setDate] = useState(''); // State to handle date selection

  // Handle the date change for APOD
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  // Fetch APOD data for the selected date
  const fetchAPOD = (selectedDate) => {
    setLoading(true); // Set loading state before fetching
    const dateToFetch = selectedDate || new Date().toISOString().split('T')[0]; // Use today's date by default
    axios
      .get(`http://localhost:5000/api/apod?date=${dateToFetch}`)
      .then((response) => {
        setApod(response.data);
        setLoading(false); // Set loading state to false after successful fetch
      })
      .catch((err) => {
        setError('Failed to fetch APOD data');
        setLoading(false); // Set loading state to false after error
      });
  };

  // Use effect to fetch data on page load (fetch today's APOD by default)
  useEffect(() => {
    fetchAPOD(''); // Fetch today's APOD by default
  }, []);

  // Show loading state
  if (loading) return <p>Loading...</p>;

  // Show error if fetching fails
  if (error) return <p>{error}</p>;

  return (
    <div className="apod">
      <h1>Astronomy Picture of the Day (APOD)</h1>
      <h2>{apod?.title}</h2>
      <img src={apod?.url} alt={apod?.title} style={{ maxWidth: '100%' }} />
      <p>{apod?.explanation}</p>

      {/* Date Picker to select a specific date */}
      <div>
        <input
          type="date"
          onChange={handleDateChange}
          value={date}
          placeholder="Select Date"
        />
        <button onClick={() => fetchAPOD(date)}>Fetch APOD for Selected Date</button>
      </div>
    </div>
  );
}

export default APOD;
