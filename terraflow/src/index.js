import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import { PrivyProvider } from '@privy-io/react-auth';
import { base, flowTestnet, flowMainnet, baseGoerli, mainnet, sepolia, polygon, polygonMumbai } from 'viem/chains';

import App from './App';

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
          logo: 'https://your-logo-url',
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },

        defaultChain: flowTestnet,
        // Replace this with a list of your desired supported chains
        supportedChains: [base, mainnet, flowTestnet, flowMainnet, sepolia, base, baseGoerli, polygon, polygonMumbai]
      }}
    >
      <App />
    </PrivyProvider>
  </React.StrictMode>,
);