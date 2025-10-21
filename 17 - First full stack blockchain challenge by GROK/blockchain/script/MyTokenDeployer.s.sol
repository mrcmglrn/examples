// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import { Script, console } from "forge-std/Script.sol";
import { MyToken } from "../src/MyToken.sol";

contract MyTokenDeployer is Script {
    MyToken public myToken;
    string public name = "MyToken";
    string public symbol = "MTK";

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        console.log("Deploying with the following parameters:");
        console.log("Name:", name);
        console.log("Symbol:", symbol);

        vm.startBroadcast(deployerPrivateKey);
        myToken = new MyToken(name, symbol);
        vm.stopBroadcast();

        console.log("MyToken deployed at:", address(myToken));
    }
}
