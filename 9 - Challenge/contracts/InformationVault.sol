// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract InformationVault {

    /* ========== STATE VARIABLES ========== */

    address public lastSetter;
    bool public breached;
    string public bestCrypto;
    uint public meaningOfLife;
    uint[10] public powersOfTwo;

    /* ========== EVENTS ========== */

    error GenericFunctionExecutor();

    /* ========== CONSTRUCTOR ========== */

    constructor() {
        lastSetter = msg.sender;
        bestCrypto = "Bitcoin";
        meaningOfLife = 7;

        uint i;
        for(i=0; i<powersOfTwo.length; i++) {
            powersOfTwo[i] = 2 ** i;
        }
        
        powersOfTwo[9] = 1024;
    }

    /* ========== WRITE FUNCTIONS ========== */

    function setVaultVariables(string memory _bestCrypto, uint _meaningOfLife) public {
        require(msg.sender == lastSetter, "Error on setVaultVariables: msg.sender is not authorized!");
        lastSetter = msg.sender;
        bestCrypto = _bestCrypto;
        meaningOfLife = _meaningOfLife;
    }

    function genericFunctionExecutor(address _contract, bytes calldata _arguments, string calldata _methodSignature) public {
        (bool success, bytes memory data) = _contract.delegatecall(abi.encodeWithSignature(_methodSignature, _arguments));
		
        if (!success) {
            revert GenericFunctionExecutor();
        }
    }
}
