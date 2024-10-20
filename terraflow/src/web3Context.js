// Web3Context.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const initWeb3 = async () => {
            if (typeof window.ethereum !== "undefined") {
                const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
                setProvider(web3Provider);

                const web3Signer = web3Provider.getSigner();
                setSigner(web3Signer);

                const accounts = await web3Provider.send("eth_requestAccounts", []);
                setAccount(accounts[0]);
            } else {
                console.error("Ethereum object not found");
            }
        };

        initWeb3();
    }, []);

    return (
        <Web3Context.Provider value={{ provider, signer, account }}>
            {children}
        </Web3Context.Provider>
    );
};

export const useWeb3 = () => useContext(Web3Context);