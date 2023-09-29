//SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract Wallet {

  event createdTransaction(address indexed creator, uint indexed indexTransaction, uint amount);
  event SendedTransaction(address indexed to, uint indexed indexTransaction, uint amount);

  address[] approvers;
  uint quorum;
  struct Transaction {
    uint id;
    uint amount;
    address payable to;
    uint approvals;
    bool send;
  }
  mapping(uint => Transaction) transaction;
  uint nextId;
  mapping(address => mapping(uint => bool)) approvals;

  constructor(address[] memory _approvers, uint _quorum) payable {
    approvers = _approvers;
    quorum = _quorum;
  }

  // Create a transaction to approve in multisig
  function createTransction(uint amount, address payable to) onlyApprover() external {
    transaction[nextId] = Transaction(
      nextId,
      amount,
      to,
      0,
      false
    );

    emit createdTransaction(msg.sender, nextId, amount);
    nextId++;
  }

  // If transaction exist and reach the quorum, then it's sending 
  function sendTransction(uint id) onlyApprover() external {
    require(approvals[msg.sender][id] == false, 'approver has already been confirmed');
    require(transaction[id].send == false, 'transaction has already been sent');
	
	  if(approvals[msg.sender][id] == false) {
      approvals[msg.sender][id] = true;
      transaction[id].approvals++;
    }
	
    if(transaction[id].approvals >= quorum) {
      transaction[id].send = true;
      address payable to = transaction[id].to;
      uint amount = transaction[id].amount;
      to.transfer(amount);
      emit SendedTransaction(to, id, amount);
      return;
    }
  }

  modifier onlyApprover() {
    bool allowed = false;
	
    for(uint i; i<approvers.length; i++) {
      if(approvers[i] == msg.sender) {
        allowed = true;
      }
    }
	
    require(allowed == true, 'only approver allowed');
    _;
  }
}
