// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import { Test, console } from "forge-std/Test.sol";
import { MyToken } from "../src/MyToken.sol";

contract MyTokenTester is Test {
    MyToken public myToken;
    string public name = "MyToken";
    string public symbol = "MTK";

    function setUp() public {
        myToken = new MyToken(name, symbol);
    }

    function test_GetName() public view {
        string memory currentName = myToken.name();
        assertEq(currentName, name, "Token name should match the initialized value");
    }

    function test_GetSymbol() public view {
        string memory currentSymbol = myToken.symbol();
        assertEq(currentSymbol, symbol, "Token symbol should match the initialized value");
    }
}
