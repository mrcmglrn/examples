import { useEffect, useState } from "react";
import { ethers } from "ethers";

function MetamaskWallet() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [networkName, setNetworkName] = useState(null);
  const [provider, setProvider] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Asks METAMASK to connect the user's wallet
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);

        // Create a link to communicate with the blockchain VIA MITAMASK
        const prov = new ethers.BrowserProvider(window.ethereum);
        setProvider(prov);
        console.log("Connected to MetaMask!");
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  useEffect(() => {
    if (!provider || !account) return;

    let mounted = true;

    // Fetch balance and network when provider or account changes
    const fetchInfo = async () => {
      try {
        const bal = await provider.getBalance(account);
        // ethers v6 returns a BigInt for balances; use formatEther from ethers
        const formatted = ethers.formatEther(bal);
        if (mounted) setBalance(formatted);

        const network = await provider.getNetwork();
        if (mounted) setNetworkName(network.name || network.chainId?.toString());
      } catch (err) {
        console.error('Failed to fetch balance/network', err);
      }
    };

    fetchInfo();

    // Manages account switching IN METAMASK
    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        setAccount(null);
        setBalance(null);
      } else {
        setAccount(accounts[0]);
      }
    };

    // Manages chain switching IN METAMASK
    const handleChainChanged = () => {
      const prov = new ethers.BrowserProvider(window.ethereum);
      setProvider(prov);
    };

    // Add listeners to component for account and chain changes FROM METAMASK
    window.ethereum?.on?.('accountsChanged', handleAccountsChanged);
    window.ethereum?.on?.('chainChanged', handleChainChanged);

    // Cleanup listeners on unmount component or when dependencies change
    return () => {
      mounted = false;
      try {
        window.ethereum?.removeListener?.('accountsChanged', handleAccountsChanged);
        window.ethereum?.removeListener?.('chainChanged', handleChainChanged);
      } catch (e) {
        // ignore
      }
    };
  }, [provider, account]);

  return (
    <div>
      <h1>MetaMask React App</h1>
      <button onClick={connectWallet}>
        {account ? `Connected: ${account}` : "Connect Wallet"}
      </button>
      {account && (
        <div style={{ marginTop: 12 }}>
          <div><strong>Address:</strong> {account}</div>
          <div><strong>Balance:</strong> {balance ? `${balance} ETH` : 'Loading...'}</div>
          <div><strong>Network:</strong> {networkName || 'Loading...'}</div>
        </div>
      )}
    </div>
  );
}

export { MetamaskWallet };