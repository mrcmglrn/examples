// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract VotingSystem is Ownable {
    struct Proposal {
        string description;
        uint256 deadline;
        uint256 quorum;
        uint256 favorables;
        uint256 contraries;
        mapping(address => bool) status;
    }

    // Storage
    uint256 public proposalCounter = 0; // It's possible use it to "iterate" the mapping poposals!
    uint256 public activeVoters = 0;
    mapping(address => bool) public voters;
    mapping(uint256 => Proposal) public proposals;

    // Events
    event AddedVoter(address indexed voter);
    event RemovedVoter(address indexed voter);
    event ResultVoting(uint256 indexed proposalId, bool result);
    event CreatedProposal(uint256 indexed proposalId, string description, uint256 deadline, uint256 quorum);
    event VotedProposal(uint256 indexed proposalId, address indexed voter, bool choice);

    constructor() Ownable(msg.sender) {}

    // Owner's functions
    function addVoter(address voter) external onlyOwner() {
        require(voter != address(0), "Invalid voter address!");
        require(!voters[voter], "Voter already registered!");
        voters[voter] = true;
        activeVoters++;
        emit AddedVoter(voter);
    }

    function removeVoter(address voter) external onlyOwner() {
        require(voter != address(0), "Invalid voter address!");
        require(voters[voter], "Voter already removed or not exists!");
        delete voters[voter]; // It's equalent to voters[voter] = false;
        activeVoters--;
        emit RemovedVoter(voter);
    }

    function resultVoting(uint256 proposalId) external onlyOwner() returns(bool) {
        Proposal storage p = proposals[proposalId];
        require(proposalId > 0 && proposalId <= proposalCounter, "Proposal does not exist");
        require(p.deadline < block.timestamp, "It's too early for result!");

        bool result; // Default false
        if (p.favorables >= p.quorum && p.favorables > p.contraries) {
            result = true;
        }

        emit ResultVoting(proposalId, result);
        return result;
    }

    // Voter's functions
    function createProposal(string memory _description, uint256 _deadline, uint256 _quorum) external onlyVoters() {
        require(bytes(_description).length > 0, "Description is mandatory!");
        require(_deadline > 0, "Deadline is mandatory!");
        require(_quorum > 0, "Quorum is mandatory!");
        require(_quorum <= activeVoters, "Quorum exceeds voter count");

        unchecked { proposalCounter++; }
        Proposal storage p = proposals[proposalCounter]; // mappings doesn't exists in MEMORY, only in STORAGE!!!
        p.description = _description;
        p.deadline = block.timestamp + _deadline;
        p.quorum = _quorum;

        emit CreatedProposal(proposalCounter, _description, _deadline, _quorum);
    }

    function getProposal(uint256 proposalId) external view returns (string memory description, uint256 deadline, uint256 quorum, uint256 favorables, uint256 contraries, bool isActive) {
        require(proposalId > 0 && proposalId <= proposalCounter, "Proposal does not exist");

        Proposal storage p = proposals[proposalId];
        return (p.description, p.deadline, p.quorum, p.favorables, p.contraries, p.deadline >= block.timestamp);
    }

    function voteProposal(uint256 proposalId, bool choice) external onlyVoters() {
        require(proposalId > 0 && proposalId <= proposalCounter, "Proposal does not exist");
        Proposal storage p = proposals[proposalId];
        require(p.deadline > block.timestamp, "The time for voting proposal is finished!");
        require(!p.status[msg.sender], "The voter has already vote!");

        if (choice) {
            p.favorables++;
        } else {
            p.contraries++;
        }

        p.status[msg.sender] = true;
        emit VotedProposal(proposalId, msg.sender, choice);
    }

    modifier onlyVoters() {
        require(voters[msg.sender], "Not a registered voter");
        _;
    }
}
