import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

function APOD() {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState('');

  //  Choose correct API base depending on environment
  const API_BASE_URL = 'https://apod-65s3.onrender.com'

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const fetchAPOD = (selectedDate) => {
    setLoading(true);
    const dateToFetch = selectedDate || new Date().toISOString().split('T')[0];

    axios
      .get(`${API_BASE_URL}/api/apod?date=${dateToFetch}`)
      .then((response) => {
        setApod(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch APOD data');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAPOD('');
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="apod">
      <h1>Astronomy Picture of the Day (APOD)</h1>
      <h2>{apod?.title}</h2>
      <img src={apod?.url} alt={apod?.title} style={{ maxWidth: '100%' }} />
      <p>{apod?.explanation}</p>

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
