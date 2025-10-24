// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract MyCollection is ERC721, Ownable {
    string private baseTokenURI;
    uint256 private nextTokenId;
    uint256 public maxSupply;
    uint256 public mintPrice;

    constructor(
        string memory _collectionName, 
        string memory _collectionSymbol,
        string memory _baseTokenURI,
        uint256 _maxSupply,
        uint256 _mintPrice
    ) ERC721(_collectionName, _collectionSymbol) Ownable(msg.sender) {
        require(_maxSupply > 0, "Max supply must be greater than 0");
        baseTokenURI = _baseTokenURI;
        nextTokenId = 0;
        maxSupply = _maxSupply;
        mintPrice = _mintPrice;
    }

    // Override _baseURI to return the baseTokenURI
    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    // Owner-only function to set base token URI
    function setBaseTokenURI(string memory _baseTokenURI) external onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    // Owner-only minting function
    function mint(address to) external onlyOwner {
        nextTokenId++;
        require(nextTokenId <= maxSupply, "Max supply reached");
        _safeMint(to, nextTokenId);
    }

    // Function to set the mint price
    function setMintPrice(uint256 _mintPrice) external onlyOwner {
        mintPrice = _mintPrice;
    }

    // Public minting function
    function publicMint() external payable {
        require(msg.value >= mintPrice, "Insufficient payment");
        nextTokenId++;
        require(nextTokenId <= maxSupply, "Max supply reached");
        _safeMint(msg.sender, nextTokenId);
        payable(msg.sender).transfer(msg.value - mintPrice);
    }

    // Withdraw function to transfer contract balance to the owner
    function withdraw() external onlyOwner {
        (bool success, ) = payable(owner()).call{value: address(this).balance}("");
        require(success, "Withdraw failed");
    }

    // Override transferOwnership to ensure only the owner can transfer ownership
    function transferOwnership(address newOwner) public override onlyOwner {
        super.transferOwnership(newOwner);
    }

    // Function to get the total supply of minted tokens
    function totalSupply() external view returns (uint256) {
        return nextTokenId;
    }
}
