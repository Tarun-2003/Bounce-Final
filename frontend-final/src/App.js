// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Bar, Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';
// import './App.css';
// import { ClipLoader } from 'react-spinners';

// // Registering required components from Chart.js
// ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

// function App() {
//   // const [apod, setApod] = useState(null);
//   // const [loading, setLoading] = useState(true);
//   // const [error, setError] = useState(null);
//   // const [date, setDate] = useState('');
//   const [imageIndex, setImageIndex] = useState(0);
//   const [marsRoverData, setMarsRoverData] = useState([]);
//   const [neoWsData, setNeoWsData] = useState([]);
//   const [nasaLibraryData, setNasaLibraryData] = useState([]);
//   const [sol, setSol] = useState(1000);  // Sol state to track current Sol

//   // Handle the date change for APOD
//   // const handleDateChange = (event) => {
//   //   setDate(event.target.value);
//   // };

//   // Fetch APOD data for the selected date
//   const fetchAPOD = (selectedDate) => {
//     setLoading(true);
//     axios
//       .get(`http://localhost:5000/api/apod?date=${selectedDate}`)
//       .then((response) => {
//         setApod(response.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError('Failed to fetch data');
//         setLoading(false);
//       });
//   };

//   // Fetch Mars Rover photos for the current Sol
//   const fetchMarsRoverPhotos = (currentSol) => {
//     setLoading(true);
//     axios
//       .get(`http://localhost:5000/api/mars-rover-photos?sol=${currentSol}`)
//       .then((response) => {
//         setMarsRoverData(response.data);
//         setImageIndex(0);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError('Failed to fetch Mars Rover photos');
//         setLoading(false);
//       });
//   };

//   // Fetch NeoWs data
//   const fetchNeoWsData = () => {
//     setLoading(true);
//     axios
//       .get('http://localhost:5000/api/neows')
//       .then((response) => {
//         setNeoWsData(response.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError('Failed to fetch NeoWs data');
//         setLoading(false);
//       });
//   };

//   // Fetch NASA Library data from the backend
//   const fetchNasaLibraryData = (query) => {
//     axios
//       .get(`http://localhost:5000/api/nasa-library?query=${query}`)
//       .then((response) => {
//         setNasaLibraryData(response.data);
//       })
//       .catch((err) => {
//         setError('Failed to fetch NASA Library data');
//       });
//   };

//   // Fetch data on page load
//   useEffect(() => {
//     fetchAPOD('');  // Fetch today's APOD by default
//     fetchMarsRoverPhotos(sol);  // Fetch Mars Rover photos for the current Sol
//     fetchNeoWsData();  // Fetch NeoWs data
//     fetchNasaLibraryData('mars');  // Default to 'mars' query
//   }, [sol]);

//   // Handle Next/Previous Image for Mars Rover Photos
//   const handleNextImage = () => {
//     if (imageIndex < marsRoverData.length - 1) {
//       setImageIndex(imageIndex + 1);
//     }
//     if (imageIndex === marsRoverData.length - 1) {
//       setSol(sol + 1); // Move to the next Sol (Martian day)
//     }
//   };

//   const handlePrevImage = () => {
//     if (imageIndex > 0) {
//       setImageIndex(imageIndex - 1);
//     }
//     if (imageIndex === 0 && sol > 1000) {
//       setSol(sol - 1); // Move to the previous Sol (Martian day)
//     }
//   };

//   // Handle search form submission for NASA Library
//   const handleSearch = (event) => {
//     event.preventDefault();
//     const query = event.target.search.value;  // Get the search query value
//     fetchNasaLibraryData(query);  // Fetch NASA Library data based on the search query
//   };

//   // Prepare data for NeoWs Bar Chart
//   const chartData = {
//     labels: neoWsData.map((item) => item.name), // Use asteroid names as labels
//     datasets: [
//       {
//         label: 'Magnitude of Near-Earth Objects',
//         data: neoWsData.map((item) => item.absolute_magnitude_h), // Magnitude data
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Pie Chart for NeoWs Magnitude Distribution
//   const pieChartData = {
//     labels: ['Magnitude < 10', '10 ≤ Magnitude < 15', 'Magnitude ≥ 15'],
//     datasets: [
//       {
//         data: [
//           neoWsData.filter(item => item.absolute_magnitude_h < 10).length,
//           neoWsData.filter(item => item.absolute_magnitude_h >= 10 && item.absolute_magnitude_h < 15).length,
//           neoWsData.filter(item => item.absolute_magnitude_h >= 15).length
//         ],
//         backgroundColor: [
//           'rgba(196, 38, 38, 0.86)', // Light red
//           'rgba(199, 176, 26, 0.79)', // Yellowish
//           'rgba(181, 30, 143, 0.86)'  // Purpleish
//         ],
//         borderColor: [
//           'rgba(75, 192, 192, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(75, 192, 192, 1)'
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   if (loading) return (
//     <div className="spinner">
//       <ClipLoader size={150} color="#00bfff" loading={loading} />
//       <p>Loading data...</p>
//     </div>
//   );

//   if (error) return (
//     <div className="error-message">
//       <p>{error}</p>
//       <button onClick={() => setError(null)}>Try Again</button>
//     </div>
//   );

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Astronomy Picture of the Day (APOD)</h1>
//         <h2>{apod?.title}</h2>
//         <img src={apod?.url} alt={apod?.title} style={{ maxWidth: '100%' }} />
//         <p>{apod?.explanation}</p>

//         {/* Date Picker */}
//         <div>
//           <input
//             type="date"
//             onChange={handleDateChange}
//             value={date}
//             placeholder="Select Date"
//           />
//           <button onClick={() => fetchAPOD(date)}>Fetch APOD for Selected Date</button>
//         </div>

//         {/* Mars Rover Photo Navigation */}
//         <div className="mars-rover-section">
//           <h2 className="mars-rover-title">Mars Rover Photos</h2>
//           {marsRoverData.length > 0 && (
//             <>
//               <img
//                 src={marsRoverData[imageIndex]?.img_src}
//                 alt="Mars Rover"
//                 className="mars-rover-image"
//               />
//               <div className="mars-rover-buttons">
//                 <button onClick={handlePrevImage} disabled={imageIndex === 0}>
//                   Previous
//                 </button>
//                 <button onClick={handleNextImage} disabled={imageIndex === marsRoverData.length - 1}>
//                   Next
//                 </button>
//               </div>
//             </>
//           )}
//         </div>

//         {/* NeoWs Section - Displaying Bar Chart */}
//         <div className="neows-section">
//           <h2>Near-Earth Objects (NeoWs) Magnitude</h2>
//           <Bar data={chartData} options={{ responsive: true }} />
//         </div>

//         {/* NeoWs Section - Displaying Pie Chart */}
//         <div className="neows-pie-section">
//           <h2>Near-Earth Objects (NeoWs) Magnitude Distribution</h2>
//           <Pie data={pieChartData} options={{ responsive: true }} />
//         </div>

//         {/* NASA Library Section */}
//         <div className="nasa-library-section">
//           <h2>NASA Image Library</h2>
//           <form onSubmit={handleSearch}>
//             <input type="text" name="search" placeholder="Search for images" />
//             <button type="submit">Search</button>
//           </form>
//           {nasaLibraryData.length > 0 && nasaLibraryData.map((item, index) => (
//             <div key={index} className="nasa-library-item">
//               <h3>{item.data[0].title}</h3>
//               <img src={item.links[0].href} alt={item.data[0].title} style={{ width: '100%' }} />
//             </div>
//           ))}
//         </div>














//       </header>
//     </div>
//   );
// }

// export default App;

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import APOD from './components/APOD';
// import MarsRover from './components/MarsRover';
// import NeoWs from './components/NeoWs';
// import NasaLibrary from './components/NasaLibrary';
// import './App.css';

// function App() {
//   // State to toggle the mobile navbar
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   // Function to toggle menu visibility
//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <Router>
//       <div className="App">
//         {/* Navbar with links to different pages */}
//         <nav>
//           <div className="navbar-container">
//             {/* Logo or Navbar Toggle for Mobile */}
//             <div className="logo" onClick={toggleMenu}>
//               <span className="hamburger">&#9776;</span> {/* Hamburger Icon */}
//             </div>

//             {/* Links for Desktop */}
//             <ul className={`navbar ${isMenuOpen ? 'open' : ''}`}>
//               <li>
//                 <Link to="/">Home</Link>
//               </li>
//               <li>
//                 <Link to="/mars-rover">Mars Rover Photos</Link>
//               </li>
//               <li>
//                 <Link to="/neows">Near-Earth Objects (NeoWs)</Link>
//               </li>
//               <li>
//                 <Link to="/nasa-library">NASA Image & Video Library</Link>
//               </li>
//             </ul>
//           </div>
//         </nav>

//         {/* Routing to different pages */}
//         <Routes>
//           <Route path="/" element={<APOD />} />
//           <Route path="/mars-rover" element={<MarsRover />} />
//           {/* <Route path="/neows" element={<NeoWs />} />
//           <Route path="/nasa-library" element={<NasaLibrary />} /> */}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;



// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import APOD from './components/APOD';
// import MarsRover from './components/MarsRover';
// import NeoWs from './components/NeoWs';
// import NasaLibrary from './components/NasaLibrary';
// import './App.css';

// function App() {
//   // State to toggle the mobile navbar
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   // Function to toggle menu visibility
//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <Router>
//       <div className="App">
//         {/* Navbar with links to different pages */}
//         <nav>
//           <div className="navbar-container">
//             {/* Logo or Navbar Toggle for Mobile */}
//             <div className="logo" onClick={toggleMenu}>
//               <span className="hamburger">&#9776;</span> {/* Hamburger Icon */}
//             </div>

//             {/* Links for Desktop */}
//             <ul className={`navbar ${isMenuOpen ? 'open' : ''}`}>
//               <li>
//                 <Link to="/">Home</Link>
//               </li>
//               <li>
//                 <Link to="/mars-rover">Mars Rover Photos</Link>
//               </li>
//               <li>
//                 <Link to="/neows">Near-Earth Objects (NeoWs)</Link>
//               </li>
//               <li>
//                 <Link to="/nasa-library">NASA Image & Video Library</Link>
//               </li>
//             </ul>
//           </div>
//         </nav>

//         {/* Routing to different pages */}
//         <Routes>
//           <Route path="/" element={<APOD />} />
//           <Route path="/mars-rover" element={<MarsRover />} />
//           <Route path="/neows" element={<NeoWs />} />
//           <Route path="/nasa-library" element={<NasaLibrary />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import APOD from './components/APOD';
import MarsRover from './components/MarsRover';
import NeoWs from './components/NeoWs';
import NasaLibrary from './components/NasaLibrary';
import './App.css';

function App() {
  // State to toggle the mobile navbar
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className="App">
        {/* Navbar with links to different pages */}
        <nav>
          <div className="navbar-container">
            {/* Logo or Navbar Toggle for Mobile */}
            <div className="logo" onClick={toggleMenu}>
              <span className="hamburger">&#9776;</span> {/* Hamburger Icon */}
            </div>

            {/* Links for Desktop */}
            <ul className={`navbar ${isMenuOpen ? 'open' : ''}`}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/mars-rover">Mars Rover Photos</Link>
              </li>
              <li>
                <Link to="/neows">Near-Earth Objects (NeoWs)</Link>
              </li>
              <li>
                <Link to="/nasa-library">NASA Image Library</Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Routing to different pages */}
        <Routes>
          <Route path="/" element={<APOD />} />
          <Route path="/mars-rover" element={<MarsRover />} />
          <Route path="/neows" element={<NeoWs />} />
          <Route path="/nasa-library" element={<NasaLibrary />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import APOD from './components/APOD';
// import MarsRover from './components/MarsRover';
// import NeoWs from './components/NeoWs';
// import NasaLibrary from './components/NasaLibrary';
// import { ClipLoader } from 'react-spinners';
// import './App.css';

// function App() {
//   // State to toggle the mobile navbar
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
  
//   // Global loading and error state
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Function to toggle menu visibility
//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   // Function to show the loading spinner
//   const showLoading = () => {
//     setLoading(true);
//     setError(null);
//   };

//   // Function to show error
//   const showError = (message) => {
//     setLoading(false);
//     setError(message);
//   };

//   // Function to hide loading spinner and reset error
//   const hideLoading = () => {
//     setLoading(false);
//     setError(null);
//   };

//   return (
//     <Router>
//       <div className="App">
//         {/* Navbar with links to different pages */}
//         <nav>
//           <div className="navbar-container">
//             {/* Logo or Navbar Toggle for Mobile */}
//             <div className="logo" onClick={toggleMenu}>
//               <span className="hamburger">&#9776;</span> {/* Hamburger Icon */}
//             </div>

//             {/* Links for Desktop */}
//             <ul className={`navbar ${isMenuOpen ? 'open' : ''}`}>
//               <li>
//                 <Link to="/">Home</Link>
//               </li>
//               <li>
//                 <Link to="/mars-rover">Mars Rover Photos</Link>
//               </li>
//               <li>
//                 <Link to="/neows">Near-Earth Objects (NeoWs)</Link>
//               </li>
//               <li>
//                 <Link to="/nasa-library">NASA Image Library</Link>
//               </li>
//             </ul>
//           </div>
//         </nav>

//         {/* Show global loading spinner */}
//         {loading && (
//           <div className="spinner">
//             <ClipLoader size={150} color="#00bfff" loading={loading} />
//             <p>Loading data...</p>
//           </div>
//         )}

//         {/* Show global error message */}
//         {error && (
//           <div className="error-message">
//             <p>{error}</p>
//             <button onClick={() => setError(null)}>Try Again</button>
//           </div>
//         )}

//         {/* Routing to different pages */}
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <APOD
//                 setLoading={showLoading}
//                 setError={showError}
//                 setData={hideLoading}
//               />
//             }
//           />
//           <Route
//             path="/mars-rover"
//             element={
//               <MarsRover
//                 setLoading={showLoading}
//                 setError={showError}
//                 setData={hideLoading}
//               />
//             }
//           />
//           <Route
//             path="/neows"
//             element={
//               <NeoWs
//                 setLoading={showLoading}
//                 setError={showError}
//                 setData={hideLoading}
//               />
//             }
//           />
//           <Route
//             path="/nasa-library"
//             element={
//               <NasaLibrary
//                 setLoading={showLoading}
//                 setError={showError}
//                 setData={hideLoading}
//               />
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import APOD from './components/APOD';
// import MarsRover from './components/MarsRover';
// import NeoWs from './components/NeoWs';
// import NasaLibrary from './components/NasaLibrary';
// import './App.css';

// function App() {
//   // State to toggle the mobile navbar
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   // Function to toggle menu visibility
//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <Router>
//       <div className="App">
//         {/* Navbar with links to different pages */}
//         <nav>
//           <div className="navbar-container">
//             {/* Logo or Navbar Toggle for Mobile */}
//             <div className="logo" onClick={toggleMenu}>
//               <span className="hamburger">&#9776;</span> {/* Hamburger Icon */}
//             </div>

//             {/* Links for Desktop */}
//             <ul className={`navbar ${isMenuOpen ? 'open' : ''}`}>
//               <li>
//                 <Link to="/">Home</Link>
//               </li>
//               <li>
//                 <Link to="/mars-rover">Mars Rover Photos</Link>
//               </li>
//               <li>
//                 <Link to="/neows">Near-Earth Objects (NeoWs)</Link>
//               </li>
//               <li>
//                 <Link to="/nasa-library">NASA Image Library</Link>
//               </li>
//             </ul>
//           </div>
//         </nav>

//         {/* Routing to different pages */}
//         <Routes>
//           <Route path="/" element={<APOD />} />
//           <Route path="/mars-rover" element={<MarsRover />} />
//           <Route path="/neows" element={<NeoWs />} />
//           <Route path="/nasa-library" element={<NasaLibrary />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
