import React from 'react';  
import ReactDOM from 'react-dom/client';  

import './index.css';  

import { PrivyProvider } from '@privy-io/react-auth';  

import App from './App';  

// Import the logo image  
import logo from './logo.png'; // Adjust the path if the logo is in a different directory  

const root = ReactDOM.createRoot(document.getElementById('root'));  

root.render(  
  <React.StrictMode>  
    <PrivyProvider  
      appId="cm2gj29q9024fz9o8vrjqvv06"  
      config={{  
        // Display email and wallet as login methods  
        loginMethods: ['email', 'sms', 'wallet'],  
        // Customize Privy's appearance in your app  
        appearance: {  
          theme: 'light',  
          accentColor: '#676FFF',  
          logo: logo, // Use the imported logo  
        },  
        // Create embedded wallets for users who don't have a wallet  
        embeddedWallets: {  
          createOnLogin: 'users-without-wallets',  
        },  
      }}  
    >  
      <App />  
    </PrivyProvider>  
  </React.StrictMode>,  
);