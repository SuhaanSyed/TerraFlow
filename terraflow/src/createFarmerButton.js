import React, { useState, useEffect } from "react";
// import abi from "./abis/contractABI.json";
import { abi } from "./abi";

import { useWriteContract } from 'wagmi'
// import { abi } from './abi'

const contractAddress = "0x48A3b2Ffb6Df59f37f87140f66Cc282b475708e4";


const CreateFarmerButton = ({ capitalRequested, onSuccess }) => {
    const { data: hash, error, isPending, writeContract } = useWriteContract();

    const createFarmer = async () => {
        try {
            await writeContract({
                address: contractAddress,
                abi,
                functionName: 'createFarmer',
                args: [capitalRequested],
            });
            if (onSuccess) onSuccess(hash);
        } catch (err) {
            console.error("Error creating farmer:", err);
        }
    };

    return (
        <button onClick={createFarmer} disabled={isPending}>
            {isPending ? "Creating Farmer..." : "Create Farmer"}
        </button>
    );
};

export default CreateFarmerButton