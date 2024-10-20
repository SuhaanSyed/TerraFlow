import React from 'react';  

function HomePage({ onGetStarted }) {  
  return (  
    <div className="HomePage">  
      <h1 className="title">TerraFlow</h1>  
      <p className = "mission-statement">
        Helping farmers raise funds directly from supporters to grow their businesses, strengthen their communities, 
        and improve their financial stability for long-term success in agriculture.
      </p>  
      <button 
        onClick={onGetStarted} 
        className="get-started-button"
      >
        Get Started  
      </button>  
    </div>  
  );  
}  

export default HomePage;