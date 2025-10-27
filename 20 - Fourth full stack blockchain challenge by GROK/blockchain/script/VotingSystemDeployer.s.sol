// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import { Script, console } from "forge-std/Script.sol";
import { VotingSystem } from "../src/VotingSystem.sol";

contract VotingSystemDeployer is Script {
    VotingSystem public votingSystem;

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);
        votingSystem = new VotingSystem();
        vm.stopBroadcast();

        console.log("VotingSystem deployed at:", address(votingSystem));
    }
}
