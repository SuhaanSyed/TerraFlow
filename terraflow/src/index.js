import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import { PrivyProvider } from '@privy-io/react-auth';

import App from './App';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Make sure to import these from `@privy-io/wagmi`, not `wagmi`
import { WagmiProvider, createConfig } from '@privy-io/wagmi';

import { config } from './wagmiConfig';

const queryClient = new QueryClient();

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
          logo: '/logo.png',
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
          <App />
        </WagmiProvider>
      </QueryClientProvider>

    </PrivyProvider>
  </React.StrictMode>,
);