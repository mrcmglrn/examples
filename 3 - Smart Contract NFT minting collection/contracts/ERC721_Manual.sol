//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ERC721_Manual {
  
  // This emits when an operator is enabled or disabled for an owner
  event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

  // This emits when the approved address for an NFT is change or reaffirmed
  event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);

  // This emits when ownership of any NFT changes by any mechanism
  event Transfer(address indexed owner, address indexed approved, uint256 indexed tokenId);

  // Numbers of ERC721 by address
  mapping(address => uint) internal _balances;

  // Owner of NFT by tokenId
  mapping(uint => address) internal _owners;

  // Enable/Disable third party address to manage asset of owner address
  mapping(address => mapping(address => bool)) private _operatorApprovals;

  // Approved address to manage NFT by tokenId
  mapping(uint => address) private _tokenApprovals;

  // Implement "balanceOf"
  function balanceOf(address owner) external view returns(uint256) {
    require(owner != address(0), "Owner cannot to be 0x0 address");
    return _balances[owner];
  }

  // Implement "ownerOf"
  function ownerOf(uint256 tokenId) public view returns(address) {
    address owner = _owners[tokenId];
    require(owner != address(0), "TokenID doesn't exist");
    return owner;
  }

  // Enable or disable approval for a third party to manage all of `msg.sender`'s assets
  function setApprovalForAll(address operator, bool approved) external {
    _operatorApprovals[msg.sender][operator] = approved;
    emit ApprovalForAll(msg.sender, operator, approved); 
  }

  // Query if an address is an authorized operator for another address
  function isApprovedForAll(address owner, address operator) public view returns(bool) {
    return _operatorApprovals[owner][operator];
  }

  // Change or reaffirm the approved address for an NFT
  function approve(address approved, uint256 tokenId) public payable {
    address owner = ownerOf(tokenId);
    require(
      msg.sender == owner || isApprovedForAll(owner, msg.sender), 
      "Msg.sender is not the owner or an approved operator"
    );
    _tokenApprovals[tokenId] = approved;
    emit Approval(owner, approved, tokenId);
  }

  // Get the approved address for a single NFT
  function getApproved(uint256 tokenId) public view returns(address) {
    require(_owners[tokenId] != address(0), "TokenId doesn't exist");
    return _tokenApprovals[tokenId];
  }

  // Transfers ownership of an NFT
  function transferFrom(address from, address to, uint256 tokenId) public {
    address owner = ownerOf(tokenId);
    require(
      msg.sender == owner || getApproved(tokenId) == msg.sender || isApprovedForAll(owner, msg.sender),
      "Msg.sender is not the owner or approved for transfer"
    );
    require(owner == from, "From address is not the owner");
    require(to != address(0), "Address is zero");
    require(_owners[tokenId] != address(0), "TokenID does not exist");

    // Reset approved
    approve(address(0), tokenId);

    // Update data
    _balances[from] -= 1;
    _balances[to] += 1;
    _owners[tokenId] = to;

    emit Transfer(from, to, tokenId);
  }

  // Standard transferFrom
  // Checks if onERC721Received is implemented WHEN sending to smart contracts
  function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public payable {
    transferFrom(from, to, tokenId);
    require(_checkOnERC721Received(), "Receiver not implemented");
  }

  function safeTransferFrom(address from, address to, uint256 tokenId) public payable {
    safeTransferFrom(from, to, tokenId, "");
  }

  // Oversimplified
  function _checkOnERC721Received() private pure returns(bool) {
    return true;
  }

  // EIP165: Query if a contract implements another interface
  function supportInterface(bytes4 interfaceId) public pure virtual returns(bool) {
    return interfaceId == 0x80ac58cd;
  }

}