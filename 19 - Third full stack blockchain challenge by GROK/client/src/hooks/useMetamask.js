import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function useMetamask() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const prov = new ethers.BrowserProvider(window.ethereum);
      const sign = await prov.getSigner();
      setAccount(accounts[0]);
      setProvider(prov);
      setSigner(sign);
      console.log('Connected to MetaMask!');
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

  useEffect(() => {
    if (!provider || !account) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        setAccount(null);
        setSigner(null);
      } else {
        setAccount(accounts[0]);
        provider.getSigner().then(setSigner);
      }
    };

    const handleChainChanged = () => {
      const prov = new ethers.BrowserProvider(window.ethereum);
      setProvider(prov);
      prov.getSigner().then(setSigner);
    };

    window.ethereum?.on?.('accountsChanged', handleAccountsChanged);
    window.ethereum?.on?.('chainChanged', handleChainChanged);

    return () => {
      try {
        window.ethereum?.removeListener?.('accountsChanged', handleAccountsChanged);
        window.ethereum?.removeListener?.('chainChanged', handleChainChanged);
      } catch (e) {
        // ignore
      }
    };
  }, [provider, account]);

  return { account, provider, signer, connectWallet };
}

export default useMetamask;
