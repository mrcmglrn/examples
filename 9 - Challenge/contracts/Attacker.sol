// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Attacker {

    /* ========== STATE VARIABLES ========== */

	address public lastSetter;
    bool public breached;
    string public bestCrypto;
    uint public meaningOfLife;
    uint[10] public powersOfTwo;

    /* ========== EVENTS ========== */

    /* ========== CONSTRUCTOR ========== */

    constructor() {}

    /* ========== WRITE FUNCTIONS ========== */
	
    function setLastSetter(bytes calldata _lastSetter) public {
        lastSetter = abi.decode(_lastSetter, (address));
    }

    function setBreached(bytes calldata _breached) public {
        breached = abi.decode(_breached, (bool));
    }

    function setBestCrypto(bytes calldata _bestCrypto) public {
        bestCrypto = string(_bestCrypto);
    }

    function setMeaningOfLife(bytes calldata _meaningOfLife) public {
        meaningOfLife = abi.decode(_meaningOfLife, (uint256));
    }

    function setPowersOfTwoForIndexNine(bytes calldata _value) public {
        powersOfTwo[9] = abi.decode(_value, (uint256));
    }

    function setPowersOfTwoWithIndex(bytes calldata _value) public {
        (uint8 _param1, uint256 _param2) = abi.decode(_value, (uint8, uint256));
        powersOfTwo[_param1] = _param2;
    }

    function setAll(bytes calldata _allValue) public {
        (address _param1, bool _param2, string memory _param3, uint256 _param4, uint256 _param5) = abi.decode(_allValue, (address, bool, string, uint256, uint256));
        
        lastSetter = _param1; 
        breached = _param2;
        bestCrypto = _param3;
        meaningOfLife = _param4;
        powersOfTwo[9] = _param5;
    }

    function setAllWithIndex(bytes calldata _allValue) public {
        (address _param1, bool _param2, string memory _param3, uint256 _param4, uint8 _param5, uint256 _param6) = abi.decode(_allValue, (address, bool, string, uint256, uint8, uint256));
        
        lastSetter = _param1; 
        breached = _param2;
        bestCrypto = _param3;
        meaningOfLife = _param4;
        powersOfTwo[_param5] = _param6;
    }

}