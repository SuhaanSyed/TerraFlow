export const abi = [
    {
        name: 'createFarmer',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [{ internalType: 'uint256', name: '_requestedAmount', type: 'uint256' }],
        outputs: [],
    },
    {
        name: 'stakeTokens',
        type: 'function',
        stateMutability: 'payable',
        inputs: [{ internalType: 'address', name: 'farmer', type: 'address' }],
        outputs: [],
    },
    {
        name: 'distributeRewards',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [{ internalType: 'address', name: 'farmer', type: 'address' }],
        outputs: [],
    },
    {
        name: 'unstakeTokens',
        type: 'function',
        stateMutability: 'payable',
        inputs: [{ internalType: 'address', name: 'farmer', type: 'address' }],
        outputs: [],
    },
    {
        name: 'collectFarmerRewards',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [{ internalType: 'address', name: 'farmer', type: 'address' }],
        outputs: [],
    },
    {
        name: 'depositRewards',
        type: 'function',
        stateMutability: 'payable',
        inputs: [],
        outputs: [],
    },
    {
        name: 'getFarmerInfo',
        type: 'function',
        stateMutability: 'view',
        inputs: [{ internalType: 'address', name: 'farmer', type: 'address' }],
        outputs: [
            { internalType: 'uint256', name: 'requestedAmount', type: 'uint256' },
            { internalType: 'uint256', name: 'totalStaked', type: 'uint256' },
            { internalType: 'address[]', name: 'investors', type: 'address[]' },
            { internalType: 'uint256', name: 'reward', type: 'uint256' }
        ],
    },
    {
        name: 'getContractRewardBalance',
        type: 'function',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    },
    {
        name: 'getContractRewards',
        type: 'function',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    },
    {
        name: 'getContractBalance',
        type: 'function',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    },
    {
        name: 'FarmerCreated',
        type: 'event',
        inputs: [
            { indexed: false, internalType: 'address', name: 'farmer', type: 'address' },
            { indexed: false, internalType: 'uint256', name: 'requestedAmount', type: 'uint256' },
        ],
    },
    {
        name: 'Staked',
        type: 'event',
        inputs: [
            { indexed: false, internalType: 'address', name: 'farmer', type: 'address' },
            { indexed: false, internalType: 'address', name: 'investor', type: 'address' },
            { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
        ],
    },
    {
        name: 'Unstaked',
        type: 'event',
        inputs: [
            { indexed: false, internalType: 'address', name: 'farmer', type: 'address' },
            { indexed: false, internalType: 'address', name: 'investor', type: 'address' },
            { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
        ],
    },
    {
        name: 'RewardsDistributed',
        type: 'event',
        inputs: [
            { indexed: false, internalType: 'address', name: 'farmer', type: 'address' },
            { indexed: false, internalType: 'uint256', name: 'rewards', type: 'uint256' },
        ],
    }
];
