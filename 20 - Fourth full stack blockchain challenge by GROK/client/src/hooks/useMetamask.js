import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function useMetamask() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [network, setNetwork] = useState(null);
  const [signer, setSigner] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const prov = new ethers.BrowserProvider(window.ethereum);
      const net = await prov.getNetwork();
      const sign = await prov.getSigner();
      setAccount(accounts[0]);
      setProvider(prov);
      setNetwork(net.chainId.toString());
      setSigner(sign);
      console.log('Connected to MetaMask!');
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

  useEffect(() => {
    if (!provider || !account) return;

    const handleAccountsChanged = async (accounts) => {
      if (accounts.length === 0) {
        setAccount(null);
        setSigner(null);
        setNetwork(null);
      } else {
        setAccount(accounts[0]);
        provider.getSigner().then(setSigner);
      }
    };

    const handleChainChanged = async () => {
      const prov = new ethers.BrowserProvider(window.ethereum);
      const net = await prov.getNetwork();
      const sign = await prov.getSigner();
      setProvider(prov);
      setNetwork(net.chainId.toString());
      setSigner(sign);
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

  return { account, provider, network, signer, connectWallet };
}

export default useMetamask;
