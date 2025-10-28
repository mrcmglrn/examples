import { Contract, JsonRpcProvider, Wallet } from 'ethers';
import contractABI from '../contracts/VotingSystemABI.js';
import contractAddress from '../contracts/VotingSystemAddress.js';

const rpcUrl = process.env.SEPOLIA_RPC;
const votingSystemProvider = new JsonRpcProvider(rpcUrl);
const votingSystemReadContract = new Contract(contractAddress, contractABI, votingSystemProvider);

const privateKey = process.env.PRIVATE_KEY;
if (!privateKey) throw new Error('PRIVATE_KEY not set');
const signer = new Wallet(privateKey, votingSystemProvider);
const votingSystemWriteContract = new Contract(contractAddress, contractABI, signer);

export { votingSystemProvider, votingSystemReadContract, votingSystemWriteContract };