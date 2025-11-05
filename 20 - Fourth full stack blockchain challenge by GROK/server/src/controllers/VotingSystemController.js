import { votingSystemReadContract, votingSystemWriteContract } from "../utils/votingSystemInstance.js";
import _contractAddress from '../contracts/VotingSystemAddress.js';
import _contractABI from '../contracts/VotingSystemABI.js';
import JSONBig from 'json-bigint';
import { ethers } from "ethers";

export function getContractABI(req, res) {
  try {
    const contractABI = _contractABI;
    return res.status(200).json(contractABI);
  } catch (err) {
    console.error("getContractABI error", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}

export function getContractAddress(req, res) {
  try {
    const contractAddress = _contractAddress;
    return res.status(200).json(contractAddress);
  } catch (err) {
    console.error("getContractAddress error", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}

export async function getProposalCounter(req, res) {
  try {
    const proposalCounter = await votingSystemReadContract.proposalCounter();
    return res.status(200).jsonBig(proposalCounter);
  } catch (err) {
    console.error("getProposalCounter error", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}

export async function getActiveVoters(req, res) {
  try {
    const activeVoters = await votingSystemReadContract.activeVoters();
    return res.status(200).jsonBig(activeVoters);
  } catch (err) {
    console.error("getActiveVoters error", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}

export async function getVoterByAddress(req, res) {
  const voter = req.params.voter;
  try {
    const voterStatus = await votingSystemReadContract.voters(voter);
    return res.status(200).json(voterStatus);
  } catch (err) {
    console.error("getVoters error", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}

export async function getProposalById(req, res) {
  const proposalId = req.params.proposalId;
  try {
    const proposalStatus = await votingSystemReadContract.proposals(proposalId);
    return res.status(200).jsonBig(proposalStatus);
  } catch (err) {
    console.error("getProposals error", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}

export async function getResultVoting(req, res) {
  const proposalId = req.params.proposalId;
  try {
    const tx = await votingSystemWriteContract.resultVoting(proposalId);
    const receipt = await tx.wait();
    return res.status(200).jsonBig(receipt);
  } catch (err) {
    console.error("getResultVoting error", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}
