// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import { Script } from "forge-std/Script.sol";
import { console } from "forge-std/console.sol";
import { Swapper } from "../src/Swapper.sol";

contract DeployerSwapper is Script {
  function run() external {
    uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
    
    address payable universalRouter = payable(vm.envAddress("UNIVERSAL_ROUTER"));
    address poolManager = vm.envAddress("POOL_MANAGER");
    address permit2 = vm.envAddress("PERMIT2");
    address personalToken = vm.envAddress("PEROSNAL_TOKEN");

    vm.startBroadcast(deployerPrivateKey);
    Swapper swapper = new Swapper(
      universalRouter,
      poolManager,
      permit2,
      personalToken
    );
    vm.stopBroadcast();

    console.log("Swapper deployed at:", address(swapper));
  }
}
