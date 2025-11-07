import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import VotingSystemDataService from '../services/votingSystemDataService.js';

function useContract(provider, account) {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (!provider || !account) return;

    const initializeContract = async () => {
      try {
        const signer = await provider.getSigner();
        const addressResponse = await VotingSystemDataService.getVotingSystemAddress();
        const abiResponse = await VotingSystemDataService.getVotingSystemABI();
        const contractAddress = addressResponse.data;
        const contractABI = abiResponse.data;

        const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
        setContract(contractInstance);
        console.log('Contract initialized!');
      } catch (error) {
        console.error('Error initializing contract:', error);
      }
    };

    initializeContract();
  }, [provider, account]);

  return { contract };
}

export default useContract;
