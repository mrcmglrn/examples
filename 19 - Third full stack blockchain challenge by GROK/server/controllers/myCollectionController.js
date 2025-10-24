/*
 * This is for testing purposes only: as there are no additional steps on the server, other than simply calling
 * the blockchain, everything can be done from the frontend using Metamask.
 * However, if you want to interact with the smart contract from server side, you can use the code below.
 */
import { myCollectionProvider, myCollectionReadContract, myCollectionWriteContract } from "../utils/myCollectionInstance.js";

import _contractAddress from '../contracts/MyCollectionAddress.js';
import _contractABI from '../contracts/MyCollectionABI.js';

import { ethers } from "ethers";

export function getContractAddress(req, res) {
  try {
    const contractAddress = _contractAddress;
    return res.status(200).json({ message: "Contract address", value: contractAddress });
  } catch (err) {
    console.error("getContractAddress error", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}

export  function getContractABI(req, res) {
  try {
    const contractABI = _contractABI;
    return res.status(200).json({ message: "Contract ABI", value: contractABI });
  } catch (err) {
    console.error("getContractABI error", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}

export async function getTokenURI(req, res) {
  const { id } = req.body;
  try {
    const tokenURI = await myCollectionReadContract.tokenURI(id);
    return res.status(200).json({ message: "Value token URI", value: tokenURI.toString() });
  } catch (err) {
    console.error("getTokenURI error", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}

export async function setBaseTokenURI(req, res) {
  const { baseTokenURI } = req.body;
  try {
    const tx = await myCollectionWriteContract.setBaseTokenURI(baseTokenURI);
    const receipt = await tx.wait();
    return res.status(200).json({ message: "Base token URI updated", value: baseTokenURI.toString(), transactionHash: tx.hash, receipt: receipt });
  } catch (err) {
    console.error("setBaseTokenURI error", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}

export async function getMintPrice(req, res) {
  try {
    const mintPrice = await myCollectionReadContract.mintPrice();
    return res.status(200).json({ message: "Value mint price", value: mintPrice.toString() });
  } catch (err) {
    console.error("getMintPrice error", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}

export async function setMintPrice(req, res) {
  const { mintPrice } = req.body;
  try {
    const tx = await myCollectionWriteContract.setMintPrice(mintPrice);
    const receipt = await tx.wait();
    return res.status(200).json({ message: "Mint price updated", value: mintPrice.toString(), transactionHash: tx.hash, receipt: receipt });
  } catch (err) {
    console.error("setMintPrice error", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}

export async function getTotalSupply(req, res) {
  try {
    const totalSupply = await myCollectionReadContract.totalSupply();
    return res.status(200).json({ message: "Value total supply", value: totalSupply.toString() });
  } catch (err) {
    console.error("getTotalSupply error", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}

export async function mint(req, res) {
  const { to } = req.body;
  if (!ethers.isAddress(to)) {
    return res.status(400).json({ error: 'Invalid address' });
  }
  try {
    const tx = await myCollectionWriteContract.mint(to);
    const receipt = await tx.wait();
    return res.status(201).json({ message: "Minted successfully", transactionHash: tx.hash, receipt: receipt });
  } catch (err) {
    console.error("mint error", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}

export async function getOwner(req, res) {
  try {
    const owner = await myCollectionReadContract.owner();
    return res.status(200).json({ message: "Owner address", value: owner.toString() });
  } catch (err) {
    console.error("getOwner error", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}

export async function withdraw(req, res) {
  try {
    const tx = await myCollectionWriteContract.withdraw();
    const receipt = await tx.wait();
    return res.status(200).json({ message: "Withdraw successful", transactionHash: tx.hash, receipt: receipt });
  } catch (err) {
    console.error("withdraw error", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}

export async function transferOwnership(req, res) {
  const { newOwner } = req.body;
  if (!ethers.isAddress(newOwner)) {
    return res.status(400).json({ error: 'Invalid address' });
  }
  try {
    const tx = await myCollectionWriteContract.transferOwnership(newOwner);
    const receipt = await tx.wait();
    return res.status(200).json({ message: "Ownership transferred", value: newOwner.toString(), transactionHash: tx.hash, receipt: receipt });
  } catch (err) {
    console.error("transferOwnership error", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}
