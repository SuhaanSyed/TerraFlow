// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LosslessLotteryStakingFarmers {
    uint256 constant DECIMALS = 18; // Assuming Flow tokens have 18 decimals (adjust if different)
    uint256 constant DECIMAL_FACTOR = 10 ** DECIMALS;

    // Farmer struct to store farmer details and the total amount requested.
    struct Farmer {
        uint256 requestedAmount;
        uint256 totalStaked;
        address[] investors;
        uint256 rewardPool; // Accumulated rewards
    }

    // Staking details for each investor
    struct Investor {
        uint256 amountStaked;
    }

    // Map farmer addresses to their staking details
    mapping(address => Farmer) public farmers;

    // Map investor addresses to the staking details for each farmer
    mapping(address => mapping(address => Investor)) public investorStakes;

    // Address of the ERC20 staking token (for example, a stablecoin or other ERC20 token)
    // IERC20 public stakingToken;

    // Contract's internal reward pool
    uint256 public rewardPool;

    // Event declarations
    event FarmerCreated(address farmer, uint256 requestedAmount);
    event Staked(address farmer, address investor, uint256 amount);
    event Unstaked(address farmer, address investor, uint256 amount);
    event RewardsDistributed(address farmer, uint256 rewards);

    constructor(uint256 _initialRewards) {
        rewardPool = _initialRewards * DECIMAL_FACTOR; // Adjust to token scale
    }

    // Helper to convert raw integer amount to token-scaled value
    function toTokenAmount(uint256 amount) internal pure returns (uint256) {
        return amount * DECIMAL_FACTOR;
    }

    // Helper to convert token-scaled value to readable integer
    function fromTokenAmount(
        uint256 tokenAmount
    ) internal pure returns (uint256) {
        return tokenAmount / DECIMAL_FACTOR;
    }

    // Helper to get the current contract's reward balance
    function getContractRewardBalance() external view returns (uint256) {
        return fromTokenAmount(rewardPool);
    }

    // Create a new farmer's funding request
    function createFarmer(uint256 _requestedAmount) external {
        require(
            _requestedAmount > 0,
            "Requested amount must be greater than 0"
        );
        require(
            farmers[msg.sender].requestedAmount == 0,
            "Farmer already exists"
        );

        address[] memory temp;

        // Convert requested amount to token-scaled value
        uint256 requestedAmountInTokens = toTokenAmount(_requestedAmount);

        // Create a new farmer with the requested amount and initialize total staked and reward pool
        farmers[msg.sender] = Farmer({
            requestedAmount: requestedAmountInTokens, // Amount the farmer is requesting
            totalStaked: 0, // Initial total staked is 0
            investors: temp, // No investors at the start
            rewardPool: 0 // Initial reward pool is 0
        });

        emit FarmerCreated(msg.sender, requestedAmountInTokens);
    }

    // Investors stake their tokens in favor of a farmer
    function stakeTokens(address farmer) external payable {
        require(farmers[farmer].requestedAmount > 0, "Farmer does not exist");
        require(msg.value > 0, "Amount must be greater than 0");

        // payable(address(this)).transfer(msg.value);

        // Update farmer's total staked and add the investor to the list
        Farmer storage f = farmers[farmer];
        // Update farmer's total staked (convert value to tokens)
        uint256 stakedAmount = toTokenAmount(msg.value);
        f.totalStaked += stakedAmount;
        f.investors.push(msg.sender);

        // Track the investor's staking amount
        investorStakes[farmer][msg.sender].amountStaked += stakedAmount;

        emit Staked(farmer, msg.sender, msg.value);
    }

    // Automatically distribute rewards from the contract's reward pool based on stake proportions
    function distributeRewards(address farmer) external {
        Farmer storage f = farmers[farmer];
        require(f.totalStaked > 0, "No staking for this farmer");

        // Calculate the total reward to be distributed
        uint256 totalRewards = f.totalStaked / 10; // Example: 10% rewards
        require(totalRewards <= rewardPool, "Not enough rewards in the pool");

        // Add rewards to farmer's reward pool
        f.rewardPool += totalRewards;

        // Reduce the contract's reward pool
        rewardPool -= totalRewards;

        emit RewardsDistributed(farmer, totalRewards);
    }

    // Investors can claim back their initial staked amount after the staking period
    function unstakeTokens(address farmer) external payable {
        Investor storage investor = investorStakes[farmer][msg.sender];
        require(investor.amountStaked > 0, "No tokens to unstake");

        uint256 amountToReturn = investor.amountStaked;
        investor.amountStaked = 0;

        /// Transfer the initial staked amount back to the investor (convert back to Flow tokens)
        payable(msg.sender).transfer(fromTokenAmount(amountToReturn));

        emit Unstaked(farmer, msg.sender, fromTokenAmount(amountToReturn));
    }

    // Farmers can collect the staking rewards (accumulated rewards)
    function collectFarmerRewards(address farmer) external {
        require(farmers[farmer].requestedAmount > 0, "Farmer does not exist");

        Farmer storage f = farmers[farmer];
        uint256 reward = f.rewardPool;
        require(reward > 0, "No rewards to collect");

        // Reset the reward pool for the farmer
        f.rewardPool = 0;
        // Transfer the rewards to the farmer (convert back to Flow tokens)
        payable(farmer).transfer(fromTokenAmount(reward));

        emit RewardsDistributed(farmer, fromTokenAmount(reward));
    }

    // Admin can deposit tokens into the contract's reward pool (optional)
    function depositRewards() external payable {
        require(msg.value > 0, "Amount must be greater than 0");

        // Add the rewards to the contract's reward pool (convert to token-scaled value)
        rewardPool += toTokenAmount(msg.value);
    }

    // Function to check the current reward pool for the contract
    function getContractRewards() external view returns (uint256) {
        return rewardPool;
    }

    // Function to check the balance of the contract (in native tokens like ETH)
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    // Function to get farmer information
    function getFarmerInfo(
        address farmer
    )
        external
        view
        returns (
            uint256 requestedAmount,
            uint256 totalStaked,
            address[] memory investors,
            uint256 reward
        )
    {
        Farmer storage f = farmers[farmer];
        return (f.requestedAmount, f.totalStaked, f.investors, f.rewardPool);
    }
}
