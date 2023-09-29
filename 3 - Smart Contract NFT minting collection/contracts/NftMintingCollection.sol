//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NftMintingCollection is ERC1155, Ownable {

  string public name;
  string public symbol;
  uint256 public tokenCount;
  string public baseURI;

  constructor(string memory _name, string memory _symbol, string memory _baseURI)
  ERC1155(_baseURI) {
    name = _name;
    symbol = _symbol;
    baseURI = _baseURI;
  }

  function mint(uint256 amount) public onlyOwner {
    tokenCount += 1;
    _mint(msg.sender, tokenCount, amount, "");
  }

  function uri(uint256 _tokenId) public view override returns(string memory) {
    return string (
      abi.encodePacked(
        baseURI,
        Strings.toString(_tokenId),
        ".json"
      )
    );
  }

}