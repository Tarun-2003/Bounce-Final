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

//   );
// }

// export default App;
