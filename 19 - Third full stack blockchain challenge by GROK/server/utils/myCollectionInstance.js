import { Contract, JsonRpcProvider, Wallet } from 'ethers';
import contractABI from '../contracts/MyCollectionABI.js';
import contractAddress from '../contracts/MyCollectionAddress.js';

const rpcUrl = process.env.SEPOLIA_RPC;
const myCollectionProvider = new JsonRpcProvider(rpcUrl);
const myCollectionReadContract = new Contract(contractAddress, contractABI, myCollectionProvider);

const privateKey = process.env.PRIVATE_KEY;
if (!privateKey) throw new Error('PRIVATE_KEY not set');
const signer = new Wallet(privateKey, myCollectionProvider);
const myCollectionWriteContract = new Contract(contractAddress, contractABI, signer);

export { myCollectionProvider, myCollectionReadContract, myCollectionWriteContract };