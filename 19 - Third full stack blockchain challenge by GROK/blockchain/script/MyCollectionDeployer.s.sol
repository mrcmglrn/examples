// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import { Script, console } from "forge-std/Script.sol";
import { MyCollection } from "../src/MyCollection.sol";

contract MyCollectionScript is Script {
    MyCollection public myCollection;
    string constant NAME = "MyCollection";
    string constant SYMBOL = "MYC";
    string constant BASE_URI = "placeholder";
    uint256 constant MAX_SUPPLY = 10000;
    uint256 constant MINT_PRICE = 0.01 ether;

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        console.log("Deploying MyCollection with the following parameters:");
        console.log("-------------------------------");
        console.log("Name:", NAME);
        console.log("Symbol:", SYMBOL);
        console.log("Base URI:", BASE_URI);
        console.log("Max Supply:", MAX_SUPPLY);
        console.log("Mint Price (in wei):", MINT_PRICE);

        vm.startBroadcast(deployerPrivateKey);
        myCollection = new MyCollection(NAME, SYMBOL, BASE_URI, MAX_SUPPLY, MINT_PRICE);
        vm.stopBroadcast();

        console.log("MyCollection deployed to:", address(myCollection));
    }
}
