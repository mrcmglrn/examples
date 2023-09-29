import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import SimpleStorage from './contracts/SimpleStorage.json';

/*
const getProvider = async () => {
  try {
    const provider = await detectEthereumProvider();
    console.log('Metamask provider detected!')
    return provider;
  } catch(error) {
    console.log('Install Metamask');
    console.log('Error: ' + error);
  }
}

const getChainId = async (provider) => {
  try {
    const chainId = await provider.request({ method: 'eth_chainId' });
    console.log('ChainId detected!')
    return chainId;
  } catch(error) {
    console.log('ChainId not detected');
    console.log(error);
  }
}

const getAccounts = async (provider) => {
  try {
    const accounts = await provider.request({ method: 'eth_requestAccounts' });
    console.log('Accounts detected!')
    return accounts;
  } catch(error) {
    console.log('Accounts not detected');
    console.log(error);
  }
}

const getBalance = async (web3, accounts) => {
  try {
    const balance = await web3.eth.getBalance(accounts[0]);
    console.log('Balance detected!')
    return balance;
  } catch(error) {
    console.log('Balance not detected');
    console.log(error);
  }
}

const handleChainChange = () => {
  window.ethereum.on('chainChanged', handleChainChanged);
  
  async function handleChainChanged(_chainId) {
    console.log('CHANGE CHAIN');
    window.location.reload();
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
  }
}
*/

const getWeb3 = () =>
  new Promise( async (resolve, reject) => {
    const provider = await detectEthereumProvider();
    if(provider) {
      try {
        // It's used "Promise" because it's not possible using "await" with "new"!
        const web3 = new Web3(provider);
        console.log('Web3 detected!')
        resolve(web3);
      } catch(error) {
        console.log('Web3 not detected, install Metamask!');
        console.log(error);
        reject(error);
      }
    }
  });

const getSimpleStorage = async (web3) => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = SimpleStorage.networks[networkId];
  return new web3.eth.Contract(
    SimpleStorage.abi,
    deployedNetwork && deployedNetwork.address,
  );
}

export { getWeb3, getSimpleStorage }