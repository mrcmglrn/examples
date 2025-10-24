import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import MyCollectionDataService from '../services/myCollectionDataService.js';

function useContract(provider, account) {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (!provider || !account) return;

    const initializeContract = async () => {
      try {
        const signer = await provider.getSigner();
        const addressResponse = await MyCollectionDataService.getMyCollectionAddress();
        const abiResponse = await MyCollectionDataService.getMyCollectionABI();
        const contractAddress = addressResponse.data.value;
        const contractABI = abiResponse.data.value;

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
