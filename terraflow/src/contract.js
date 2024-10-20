// contract.js
// import { ethers } from 'ethers';
import contractABI from "./abis/contractABI";
const ethers = require("ethers")

const contractAddress = "0x48A3b2Ffb6Df59f37f87140f66Cc282b475708e4";

export const getContract = () => {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        return new ethers.Contract(contractAddress, contractABI.abi, signer);
    } else {
        console.error("Ethereum object not found");
        return null;
    }
};

export const createFarmer = async (requestedAmount) => {
    console.log("am i here");
    const contract = getContract();
    console.log("what about here");
    if (contract) {
        try {
            const tx = await contract.createFarmer(requestedAmount);
            await tx.wait();
            console.log("Farmer created successfully");
        } catch (error) {
            console.error("Error creating farmer:", error);
        }
    }
};