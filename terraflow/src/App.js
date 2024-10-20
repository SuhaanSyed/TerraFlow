import "./App.css";  
import { usePrivy } from "@privy-io/react-auth";  
import HomePage from "./HomePage";  
//import { useState } from "react";  
import logo from './logo.png';

function App() {  
  const { ready, authenticated, user, login, logout } = usePrivy();  

  if (!ready) {  
    return null;  
  }  

  const handleGetStarted = () => {  
    login(); // This will trigger the Privy login modal  
  };  

  return (  
    <div className="App">
       <nav className="navbar">  
        <img src= {logo} alt="Terraflow Logo" className="logo" />  
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

export default App;