import React, { useState } from "react";  

const Profile = () => {  
  const userName = "Matt Davis";  
  const investments = [  
    { id: 1, land: "Farm Land A", tokens: Math.floor(Math.random() * 100) },  
    { id: 2, land: "Farm Land B", tokens: Math.floor(Math.random() * 100) },  
    { id: 3, land: "Farm Land C", tokens: Math.floor(Math.random() * 100) },  
    { id: 4, land: "Farm Land D", tokens: Math.floor(Math.random() * 100) },  
    { id: 5, land: "Farm Land E", tokens: Math.floor(Math.random() * 100) },  
  ];  
  const [showInvestments, setShowInvestments] = useState(false);  
  const tokenValue = 1000; // Value of one token in dollars  

  const toggleInvestments = () => {  
    setShowInvestments(!showInvestments);  
  };  

  const totalValue =  
    investments.reduce((acc, investment) => acc + investment.tokens, 0) *  
    tokenValue;  

  return (  
    <div className="profile-container">  
      <div className="profile-heading">  
      <img  
        src="https://randomuser.me/api/portraits/men/1.jpg" // Random user image  
        alt="Profile"  
        className="profile-image"  
        style={{  
          borderRadius: "100%",  
          height: "100px",  
          width: "100px",  
          marginRight: "16px"  
        }}  
      />
        <h2 className="profile-name">{userName}</h2>  
      </div>  
      <button onClick={toggleInvestments} className="profile-button">  
        My Investments  
      </button>  
      {showInvestments && (  
        <div className="space-y-4 mb-6">  
          <h3 className="text-lg font-semibold text-gray-900 mb-2">  
            Investments  
          </h3>  
          {investments.map((investment) => (  
            <div key={investment.id} className="investment-item">  
              <p className="investment-text">  
                {investment.land}: {investment.tokens} Tokens  
              </p>  
              <div className="investment-actions">  
                <button  
                  onClick={() =>  
                    alert(  
                      `Value of ${investment.land}: $${  
                        investment.tokens * tokenValue  
                      }`  
                    )  
                  }  
                  className="investment-button"  
                >  
                  More  
                </button>  
                <button  
                  onClick={() =>  
                    alert(  
                      `Unstaked ${investment.tokens} tokens from ${investment.land}`  
                    )  
                  }  
                  className="unstake-button"  
                >  
                  Unstake  
                </button>  
              </div>  
            </div>  
          ))}  
          <button  
            onClick={() => alert(`Total Value: $${totalValue}`)}  
            className="total-value-button"  
          >  
            Total Value  
          </button>  
        </div>  
      )}  
      <div className="badges-section">  
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Badges</h3>  
        <div className="flex items-center">  
          <div className="badge-icon" style={{ fontSize: "3rem" }}>🏆</div>  
          <p className="badge-text">{investments.length} Badges</p>  
        </div>  
      </div>  
    </div>  
  );  
};  

export default Profile;