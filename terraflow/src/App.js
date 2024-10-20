import "./App.css";  
import { usePrivy } from "@privy-io/react-auth";  
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";  
import ListingsPage from "./listings";  
import HomePage from "./HomePage";  
import React from "react";  
import logo from './logo.png';  
import Profile from "./Profile";  

function App() {  
  const { ready, authenticated, user, login, logout } = usePrivy();  

  if (!ready) {  
    return null;  
  }  

  const handleGetStarted = () => {  
    login();  
  };  

  return (  
    <div className="App">  
      <nav className="navbar">  
        <img src={logo} alt="Terraflow Logo" className="logo" />  
        <ul className="nav-links">  
          <li><Link to="/listings">Listings</Link></li>  
          <li><a href="#about">About Us</a></li>  
          <li><a href="#contact">Contact</a></li>  
          <li><Link to="/profile">Profile</Link></li> {/* Updated line */}  
        </ul>  
      </nav>  
      <header className="App-header">  
        {ready && authenticated ? (  
          <div>  
            <textarea  
              readOnly  
              value={JSON.stringify(user, null, 2)}  
              style={{ width: "600px", height: "250px", borderRadius: "6px" }}  
            />  
            <br />  
            <button onClick={logout} style={{ marginTop: "20px", padding: "12px", backgroundColor: "#069478", color: "#FFF", border: "none", borderRadius: "6px" }}>  
              Log Out  
            </button>  
          </div>  
        ) : (  
          <HomePage onGetStarted={handleGetStarted} />  
        )}  
      </header>  
    </div>  
  );  
}  

function AppWrapper() {  
  return (  
    <Router>  
      <Routes>  
        <Route path="/" element={<App />} />  
        <Route path="/listings" element={<ListingsPage />} />  
        <Route path="/profile" element={<Profile />} /> {/* Ensure this is correct */}  
      </Routes>  
    </Router>  
  );  
}  
import "./App.css";
import React, { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ListingsPage from "./listings";
import HomePage from "./HomePage";
import logo from './logo.png';
import { FaUserCircle } from 'react-icons/fa';
import { UserProvider, useUser } from './UserContext';

function App() {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const { setUser } = useUser();


  useEffect(() => {
    if (ready && authenticated) {
      setUser(user);
    }
  }, [ready, authenticated, user, setUser]);

  if (!ready) {
    return null;
  }
  const handleGetStarted = () => {
    login(); // This will trigger the Privy login modal  
  };

  // return new ethers.Contract(contractAddress, contractABI, signer);

  return (
    <div className="App">
      <header className="App-header">
        {ready && authenticated ? (
          <div>
            <textarea
              readOnly
              value={JSON.stringify(user, null, 2)}
              style={{ width: "600px", height: "250px", borderRadius: "6px" }}
            />
            <br />
            <button onClick={logout} style={{ marginTop: "20px", padding: "12px", backgroundColor: "#069478", color: "#FFF", border: "none", borderRadius: "6px" }}>
              Log Out
            </button>
          </div>
        ) : (
          <HomePage onGetStarted={handleGetStarted} />
        )}
      </header>
    </div>

  );
}

function AppWrapper() {
  return (
    <UserProvider>
      <Router>
        <nav className="navbar">
          <img src={logo} alt="Terraflow Logo" className="logo" />
          <ul className="nav-links">
            <li><Link to="/listings">Listings</Link></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#profile"><FaUserCircle size={24} /></a></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/listings" element={<ListingsPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default AppWrapper;