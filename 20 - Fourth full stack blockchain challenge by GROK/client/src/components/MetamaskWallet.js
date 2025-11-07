import { useState, useEffect } from 'react';
import useMetamask from '../hooks/useMetamask';
import useContract from '../hooks/useContract';
import { callRead, sendWrite } from '../utils/contractActions';

function MetamaskWallet({ children }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { account, provider, network, connectWallet } = useMetamask();
  const { contract } = useContract(provider, account);

  const handleRead = async (functionName, ...args) => {
    if (!contract) {
      setError('Contract not initialized!');
      return;
    }

    setLoading(true);
    
    try {
      const result = await callRead(contract, functionName, ...args);
      console.log(`${functionName}:`, result);
      setError(null);
      return result;
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleWrite = async (functionName, ...args) => {
    if (!contract) {
      setError('Contract not initialized!');
      return;
    }

    setLoading(true);

    try {
      const tx = await sendWrite(contract, functionName, ...args);
      console.log('Transaction sent:', tx.hash);
      const receipt = await tx.wait();
      console.log('Confirmed:', receipt.transactionHash);
      setError(null);
      return receipt;
    } catch (err) {
      console.error(err);
      setError(err.message || 'Transaction failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>MetaMask React App</h1>
      <button onClick={connectWallet}>
        {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
      </button>

      {account && (
        <div style={{ marginTop: 12 }}>
          <div><strong>Address:</strong> {account}</div>
          <div><strong>Network:</strong> {network}</div>

          {contract ? (
            <>
              {children({ handleRead, handleWrite })}

              {loading && <p>Transaction in progress...</p>}
              {error && (
                <div style={{ marginTop: 12, color: 'red' }}>
                  <strong>Error:</strong> {error}
                </div>
              )}
            </>
          ) : (
            <p>Loading contract...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default MetamaskWallet;
