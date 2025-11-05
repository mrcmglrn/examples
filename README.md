# General info about the projects

## 1 - Personal website frontend  
This is the frontend of my personal website, made with React.js. You can see the code, but if you run it, it won’t work because the backend and database are missing.  
The full site uses the **MERN stack** (MongoDB, Express, React, Node.js), it’s live on Render, and you can visit it at:  
**www.marcomigliorini.com**

## 2 - Metamask test  
A very simple frontend to force MetaMask to use only certain blockchain networks (a subset of chains).

## 3 - Smart Contract NFT minting collection  
Two smart contracts:  
- One **ERC721** written from scratch (by hand)  
- One **ERC1155** made with **OpenZeppelin**  
You can deploy them on **Mumbai testnet** and find them on **OpenSea**.

## 4 - Frontend NFT collection (run after project 3)  
A basic frontend to view the NFTs deployed on Mumbai. It’s simple but it works.

## 5 - Smart Contract multisig wallet  
Two smart contracts for a **multisig wallet (MxN)**:  
- One simple version  
- One more advanced

## 6 - Smart Contract DEX  
This is the DEX smart contract I told you about in the interview.  
It was written for **Solidity 0.6.3**, so it still uses **SafeMath.sol** for math operations.

## 7 - Tests for the DEX smart contract  
Tests for the DEX contract, written with **Truffle**.

## 8 - dApp game  
A **Rock-Paper-Scissors** game built as a dApp (decentralized app).

## 9 - Challenge  
Exploit of a smart contract deployed on Mumbai.

### "Attacker.sol" contract address  
The address of the **Attacker.sol** contract on Mumbai is:  
**0x1B8D0E15cd04d4A678cBd50Ab0624f9BfdCcb4D4**

### Run `node index.js` to exploit the smart contract  
In the terminal, run:  
```bash
node index.js
```  
This will attack the **InformationVault.sol** contract deployed at:  
**0xe27AdBD639a6B4e5F04eC1C8C45F1C796F45c862**

### ".env" file – change settings for the exploit  
The `.env` file (included for simplicity) lets you change:  
- `ATTACKER_PAYLOAD` → the data you want to write into the target contract’s storage  
- `ATTACKER_METHOD_SIGNATURE` → the function to call using `delegateCall` to do the overwrite

### "AbiEncoder.sol" – helper contract to create exploit payload  
The **AbiEncoder.sol** contract helps you create the correct payload for the function you want to call with `delegateCall`.

## 10 - Chainlink oracle data feeds  
A simple smart contract that reads **real-world data** (like prices) from **Chainlink oracles**. It shows how to get trusted data on-chain.

## 11 - Transparent proxy  
An **upgradeable smart contract** using the **Transparent Proxy pattern** (from OpenZeppelin). The logic can be updated without changing the address.

## 12 - Simple eCommerce  
A basic **online shop** on blockchain: users can buy products using crypto. Includes product list, cart, and payment.

## 13 - Stripe gateway integration  
Connects a web app to **Stripe** for fiat payments (euro, dollar). Users pay with credit card, and the backend records the order.

## 14 - ERC20 with Foundry  
An **ERC20 token** (custom coin) created and tested using **Foundry**. Includes mint, burn, transfer, and full tests.

## 15 - Swap on V4 with Foundry  
A **token swap** (like Uniswap) using **Uniswap V4 hooks**, built and tested with **Foundry**. You can exchange two tokens.

## 16 - Add liquidity on V4 with Foundry  
Add **liquidity** to a Uniswap V4 pool using **Foundry**. Includes approval, deposit, and position management.

## 17 - First full stack blockchain challenge
**Create and deploy a basic ERC20 token** on Sepolia testnet using Solidity and OpenZeppelin. Build an Express API to check token balance and display it on a React frontend. Full project with Git version control.

## 18 - Second full stack blockchain challenge
**React app that connects to MetaMask** and shows wallet address + ETH balance. Includes dropdown to switch between testnets (Sepolia, Goerli).  Clean code with Git commits.

## 19 - Third full stack blockchain challenge
**ERC721 contract to mint NFTs**, deployed on Sepolia. Express backend + React frontend with "Mint" button via MetaMask. Complete flow: deploy → API → mint.

## 20 - Fourth full stack blockchain challenge 
**Solidity contract for voting on proposals** (one vote per wallet). Express API + React UI to show proposals, vote, and see live results. Fully decentralized and versioned with Git.
