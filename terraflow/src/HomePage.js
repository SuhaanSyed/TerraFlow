import React from 'react';  

function HomePage({ onGetStarted }) {  
  return (  
    <div className="HomePage">  
      <h1>Welcome to TerraFlow</h1>  
      <p>Explore our features and enjoy your stay!</p>  
      <button onClick={onGetStarted} style={{ padding: '10px', backgroundColor: '#676FFF', color: '#FFF', border: 'none', borderRadius: '6px' }}>  
        Get Started  
      </button>  
    </div>  
  );  
}  

export default HomePage;