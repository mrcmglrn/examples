//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721_Manual.sol";

// Is a collection of NFT
contract NftMinting is ERC721_Manual {

  string public name;
  string public symbol;
  uint256 public tokenCount;
  mapping(uint256 => string) private _tokenURIs;

  constructor(string memory _name, string memory _symbol) {
    name = _name;
    symbol = _symbol;
  }

  // Return metadata of NFT by internet (p.es. IPFS)
  // THIS FUNCTION IS CALL FROM THIRD PARTY (LIKE OPEN SEA) TO RETRIEVE METADATA ON NFT
  function tokenURI(uint256 tokenId) public view returns(string memory) {
    require(_owners[tokenId] != address(0), "TokenId doesn't exist");
    return _tokenURIs[tokenId];
  }

  // Create a new NFT inside our collection
  // THIS FUNCTION IS CALL FROM FRONTEND TO CREATE NFT BY METADATA
  function mint(string memory _tokenURI) public {
    tokenCount += 1;
    _balances[msg.sender] += 1;
    _owners[tokenCount] = msg.sender;
    _tokenURIs[tokenCount] = _tokenURI;

    // When FROM address is 0x0 means that we are creating a new NFT 
    emit Transfer(address(0), msg.sender, tokenCount);
  }

  // Update supportInterface for interact with OPEN SEA (specifing the metadatas presents)
  function supportInterface(bytes4 interfaceId) public pure override returns(bool) {
    return interfaceId == 0x80ac58cd || interfaceId == 0x5b5e139f;
  }

}