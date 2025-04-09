// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import { Script } from "forge-std/Script.sol";
import { MyToken } from "../src/MyToken.sol";

contract MintMyToken is Script {
    function run() external {
        //address tokenAddress = vm.envAddress("TOKEN_ADDRESS");
        //address recipient = vm.envAddress("RECIPEINT_ADDRESS");
        //uint256 amount = vm.envUint("AMOUNT");

        address tokenAddress = 0x4563A3543C26CBD9cFEaE6619AD74B9d7790800F;
        address recipient = 0xB5536fd7955c1686c2E22F70ebA2759e05e123a3;
        uint256 amount = 1_000 * 10 ** 18;

        vm.startBroadcast();
        MyToken(tokenAddress).mint(recipient, amount);
        vm.stopBroadcast();
    }
}
