import { useState } from 'react';
import useMetamask from '../hooks/useMetamask';
import useContract from '../hooks/useContract';
import { readContract, writeContract, writeUserContract } from '../utils/contractActions';

function MetamaskWallet() {
  const [error, setError] = useState(null);
  const { account, provider, connectWallet } = useMetamask();
  const { contract } = useContract(provider, account);

  // General read function
  const handleRead = async () => {
    if (!contract) {
      setError('Contract not initialized!');
      return;
    }
    try {
      const result = await readContract(contract);
      console.log('Read result:', result);
      setError(null);
    } catch (error) {
      console.error('Error calling read function:', error);
      setError('Failed to call read function: ' + error.message);
    }
  };

  // Owner write function
  const handleWrite = async () => {
    if (!contract) {
      setError('Contract not initialized!');
      return;
    }
    try {
      const tx = await writeContract(contract, "0x9Ba9EFD5A1FFB3879379598e1DB10d765c26D2E5");
      console.log('Transaction sent:', tx.hash);
      await tx.wait();
      console.log('Transaction confirmed');
      setError(null);
    } catch (error) {
      console.error('Error calling write function:', error);
      setError('Failed to call write function: ' + error.message);
    }
  };

  // User write function
  const handleUserWrite = async () => {
    if (!contract) {
      setError('Contract not initialized!');
      return;
    }
    try {
      const tx = await writeUserContract(contract);
      console.log('Transaction sent:', tx.hash);
      await tx.wait();
      console.log('Transaction confirmed');
      setError(null);
    } catch (error) {
      console.error('Error calling write user function:', error);
      setError('Failed to call write function: ' + error.message);
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
          <div>
            <strong>Address:</strong> {account}
          </div>
          <div style={{ marginTop: 12 }}>
            <button onClick={handleRead} disabled={!contract}>
              Call Read Function
            </button>
            <button onClick={handleWrite} disabled={!contract}>
              Call Write Function
            </button>
            <button onClick={handleUserWrite} disabled={!contract}>
              Call Write User Function
            </button>
          </div>
          {error && (
            <div style={{ marginTop: 12, color: 'red' }}>
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MetamaskWallet;
