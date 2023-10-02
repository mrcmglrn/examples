// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AbiEncoder {

    bytes public resultAddress;
    bytes public resultBoolean;
    bytes public resultString;
    bytes public resultUint;
    bytes public resultArray;
    bytes public resultAll;
    bytes public resultAllPlusIndex;
    
    function encodeAddress(address _addressValue) public returns (bytes memory) {
        bytes memory encoded = abi.encode(_addressValue);
        resultAddress = encoded;
        return encoded;
    }

    function encodeBoolean(bool _boolValue) public returns (bytes memory) {
        bytes memory encoded = abi.encode(_boolValue);
        resultBoolean = encoded;
        return encoded;
    }

    function encodeString(string memory _stringValue) public returns (bytes memory) {
        bytes memory encoded = bytes(_stringValue);
        resultString = encoded;
        return encoded;
    }

    function encodeUint256(uint _uintValue) public returns (bytes memory) {
        bytes memory encoded = abi.encode(_uintValue);
        resultUint = encoded;
        return encoded;
    }

    function encodeArray(uint _uintIndex, uint _uintValue) public returns (bytes memory) {
        bytes memory encoded = abi.encode(_uintIndex, _uintValue);
        resultArray = encoded;
        return encoded;
    }

    function encodeAll(address _addressValue, bool _boolValue, string memory _stringValue, uint _uintValue, uint _uintValue2) public returns (bytes memory) {
        bytes memory encoded = abi.encode(_addressValue, _boolValue, _stringValue, _uintValue, _uintValue2);
        resultAll = encoded;
        return encoded;
    }

    function encodeAllPlusIndex(address _addressValue, bool _boolValue, string memory _stringValue, uint _uintValue, uint _uintValue2, uint _uintValue3) public returns (bytes memory) {
        bytes memory encoded = abi.encode(_addressValue, _boolValue, _stringValue, _uintValue, _uintValue2, _uintValue3);
        resultAllPlusIndex = encoded;
        return encoded;
    }

}