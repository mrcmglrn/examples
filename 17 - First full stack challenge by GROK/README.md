# Task 1: Simple ERC20 Token Deployment (2/4 hours)

## Description:

	- Create and deploy a basic ERC20 token on a testnet (e.g., Sepolia) using Solidity.
	- Set up a simple Express API to query the token's balance for a given address.
	- Display it on a React frontend by API's call.

## Skills Tested:

	- Solidity: Writing and deploying an ERC20 smart contract.
	- Node.js/Express: Creating an API to interact with the blockchain.
	- React: Building a UI to display blockchain data.
	- Web3.js/ethers.js: Interacting with the EVM.
	- Git: Version control for project setup.

## Deliverables:

	1. Solidity ERC20 contract with standard functions (e.g., balanceOf, transfer).
	2. Deployed contract on Sepolia testnet (use Hardhat or Foundry).
	3. Express API endpoint (/balance/:address) to fetch token balance.
	4. React frontend with a form to input an address and display the balance.
	5. Git repository with commit history.

## Steps:

	- Write an ERC20 contract using OpenZeppelin.
	- Deploy using Hardhat/Foundry with a testnet provider (e.g., Alchemy/Infura).
	- Set up an Express server with an endpoint to query balance using ethers.js.
	- Build a React app to call the API and display the result.
	- Push code to a Git repository with clear commits.
