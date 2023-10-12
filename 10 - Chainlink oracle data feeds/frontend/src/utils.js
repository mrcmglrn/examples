import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import DataFeed from './contracts/DataFeed.json';

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

const getDataFeed = async (web3) => {
  const networkId = await web3.eth.net.getId();
  console.log("NetworkId: "+networkId);
  const deployedNetwork = DataFeed.networks[networkId];
  //console.log("Contract address: "+deployedNetwork.address);
  //console.log("Contract ABI: "+JSON.stringify(DataFeed.abi, null, 2));
  return new web3.eth.Contract(
    DataFeed.abi,
    deployedNetwork && deployedNetwork.address,
  );
}

export { getWeb3, getDataFeed }