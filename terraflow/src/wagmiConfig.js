import { mainnet, flowTestnet } from 'viem/chains';
import { http } from 'wagmi';

import { createConfig } from '@privy-io/wagmi';

// Replace these with your app's chains

export const config = createConfig({
    chains: [mainnet, flowTestnet],
    transports: {
        [mainnet.id]: http(),
        [flowTestnet.id]: http(),

    },
});