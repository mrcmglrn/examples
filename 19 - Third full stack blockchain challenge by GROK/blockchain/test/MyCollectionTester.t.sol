// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import { Test, console } from "forge-std/Test.sol";
import { MyCollection } from "../src/MyCollection.sol";
import { IERC721Receiver } from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721ReceiverMock is IERC721Receiver {
    function onERC721Received(
        address,
        address,
        uint256,
        bytes memory
    ) public pure returns (bytes4) {
        return this.onERC721Received.selector;
    }

    // Allow this contract to receive ETH
    receive() external payable {}
}

contract MyCollectionTester is Test {
    MyCollection public nftCollection;
    address public owner;
    address public user1;
    address public user2;

    // Test constants
    string constant COLLECTION_NAME = "My NFT Collection";
    string constant COLLECTION_SYMBOL = "MNC";
    string constant BASE_URI = "ipfs://QmYourBaseURI/";
    uint256 constant MAX_SUPPLY = 5;
    uint256 constant MINT_PRICE = 0.1 ether;

    function setUp() public {
        // Set up test addresses
        owner = address(new ERC721ReceiverMock());
        user1 = address(new ERC721ReceiverMock());
        user2 = address(new ERC721ReceiverMock());

        // Deploy contract as owner
        vm.prank(owner);
        nftCollection = new MyCollection(
            COLLECTION_NAME,
            COLLECTION_SYMBOL,
            BASE_URI,
            MAX_SUPPLY,
            MINT_PRICE
        );
    }

    function test_InitialState() public view {
        assertEq(nftCollection.name(), COLLECTION_NAME);
        assertEq(nftCollection.symbol(), COLLECTION_SYMBOL);
        assertEq(nftCollection.maxSupply(), MAX_SUPPLY);
        assertEq(nftCollection.mintPrice(), MINT_PRICE);
        assertEq(nftCollection.totalSupply(), 0);
        assertEq(nftCollection.owner(), owner);
    }

    function test_OwnerMint() public {
        vm.prank(owner);
        nftCollection.mint(user1);

        assertEq(nftCollection.totalSupply(), 1);
        assertEq(nftCollection.ownerOf(1), user1);
    }

    function test_PublicMint() public {
        // Fund user1 with enough ETH to mint
        vm.deal(user1, 1 ether);
        
        // Mint as user1
        vm.prank(user1);
        nftCollection.publicMint{value: MINT_PRICE}();

        assertEq(nftCollection.totalSupply(), 1);
        assertEq(nftCollection.ownerOf(1), user1);
    }

    function test_RevertIf_PublicMintUnderpriced() public {
        vm.deal(user1, 1 ether);
        vm.prank(user1);
        vm.expectRevert("Insufficient payment");
        nftCollection.publicMint{value: MINT_PRICE - 0.01 ether}();
    }

    function test_WithdrawBalance() public {
        // Fund user1 and perform a mint to add balance to contract
        vm.deal(user1, 1 ether);
        vm.prank(user1);
        nftCollection.publicMint{value: MINT_PRICE}();

        // Record owner's balance before withdrawal
        uint256 initialBalance = owner.balance;

        // Withdraw as owner
        vm.prank(owner);
        nftCollection.withdraw();

        // Check that owner received the mint price
        assertEq(owner.balance, initialBalance + MINT_PRICE);
        assertEq(address(nftCollection).balance, 0);
    }

    function test_RevertIf_WithdrawBalanceByUser() public {
        // Fund user1 and perform a mint to add balance to contract
        vm.deal(user1, 1 ether);
        vm.prank(user1);
        nftCollection.publicMint{value: MINT_PRICE}();

        // Withdraw as user2
        vm.prank(user2);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, user2));
        nftCollection.withdraw();
    }

    function test_SetBaseURI() public {
        string memory newBaseURI = "ipfs://QmNewBaseURI/";
        
        vm.prank(owner);
        nftCollection.setBaseTokenURI(newBaseURI);

        // Mint a token to check URI
        vm.prank(owner);
        nftCollection.mint(user1);
        
        assertEq(nftCollection.tokenURI(1), string.concat(newBaseURI, "1"));
    }

    function test_RevertIf_NonOwnerMint() public {
        vm.prank(user1);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, user1));
        nftCollection.mint(user2);
    }

    function test_RevertIf_MintBeyondMaxSupply() public {
        vm.startPrank(owner);
        for (uint256 i = 0; i < MAX_SUPPLY; i++) {
            nftCollection.mint(user1);
        }
        vm.expectRevert("Max supply reached");
        nftCollection.mint(user1);
        vm.stopPrank();
    }

}
