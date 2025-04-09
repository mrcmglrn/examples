// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import "../src/MyToken.sol";

contract TesterMyToken is Test {
    MyToken public token;
    address public owner;
    address public user;

    function setUp() public {
        owner = address(this);
        user = address(0xB5536fd7955c1686c2E22F70ebA2759e05e123a3);
        token = new MyToken(1_000_000 ether);
    }

    function testInitialSupply() view public {
        assertEq(token.totalSupply(), 1_000_000 ether);
        assertEq(token.balanceOf(owner), 1_000_000 ether);
    }

    function testMintIncreasesBalanceAndSupply() public {
        uint256 amount = 1_000 ether;
        token.mint(user, amount);
        assertEq(token.balanceOf(user), amount);
        assertEq(token.totalSupply(), 1_000_000 ether + amount);
    }

    function testMintToZeroAddressReverts() public {
        vm.expectRevert();
        token.mint(address(0), 1_000 ether);
    }

    function testTransferBetweenAccounts() public {
        token.transfer(user, 500 ether);
        assertEq(token.balanceOf(user), 500 ether);
        assertEq(token.balanceOf(owner), 1_000_000 ether - 500 ether);
    }

    function testTransferFailIfInsufficientBalance() public {
        vm.prank(user);
        vm.expectRevert();
        token.transfer(owner, 1 ether);
    }
}
