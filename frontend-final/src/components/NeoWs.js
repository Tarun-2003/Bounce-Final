import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';
import '../App.css';
// Registering required components from Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

function NeoWs() {
  const [neoWsData, setNeoWsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch NeoWs data
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5000/api/neows') // Fetch data from your backend
      .then((response) => {
        setNeoWsData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch NeoWs data');
        setLoading(false);
      });
  }, []);

  // Loading and error handling
  if (loading) return <p>Loading Near-Earth Objects...</p>;
  if (error) return <p>{error}</p>;

  // Prepare data for NeoWs Bar Chart
  const chartData = {
    labels: neoWsData.map((item) => item.name), // Use asteroid names as labels
    datasets: [
      {
        label: 'Magnitude of Near-Earth Objects',
        data: neoWsData.map((item) => item.absolute_magnitude_h), // Magnitude data
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Pie Chart for NeoWs Magnitude Distribution
  const pieChartData = {
    labels: ['Magnitude < 10', '10 ≤ Magnitude < 15', 'Magnitude ≥ 15'],
    datasets: [
      {
        data: [
          neoWsData.filter(item => item.absolute_magnitude_h < 10).length,
          neoWsData.filter(item => item.absolute_magnitude_h >= 10 && item.absolute_magnitude_h < 15).length,
          neoWsData.filter(item => item.absolute_magnitude_h >= 15).length
        ],
        backgroundColor: [
          'rgba(196, 38, 38, 0.86)', // Light red
          'rgba(199, 176, 26, 0.79)', // Yellowish
          'rgba(181, 30, 143, 0.86)'  // Purpleish
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="neows">
      <h2>Near-Earth Objects (NeoWs)</h2>

      {/* Display Bar Chart for NeoWs Magnitude */}
      <div className="neows-bar-chart">
        <h3>Magnitude of Near-Earth Objects</h3>
        <Bar data={chartData} options={{ responsive: true }} width={500} height={300} />
      </div>

      {/* Display Pie Chart for NeoWs Magnitude Distribution */}
      <div className="neows-pie-chart">
        <h3>Magnitude Distribution</h3>
        <Pie data={pieChartData} options={{ responsive: true }} width={40} height={40} />
      </div>

      {/* Displaying the list of Near-Earth objects */}
     
    </div>
  );
}

export default NeoWs;
