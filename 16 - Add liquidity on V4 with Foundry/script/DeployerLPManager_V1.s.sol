// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import { Script } from "forge-std/Script.sol";
import { console } from "forge-std/console.sol";
import { Upgrades } from "@openzeppelin-foundry-upgrades/src/Upgrades.sol";
import { LPManager_V1 } from "../src/LPManager_V1.sol";

contract DeployLPManager_V1 is Script {
  function run() external {
    uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

    address payable positionManager = payable(vm.envAddress("POSITION_MANAGER"));
    address personalToken = vm.envAddress("PERSONAL_TOKEN");
    uint24 fee = uint24(vm.envUint("FEE"));
    int24 tickSpacing = int24(vm.envInt("TICK_SPACING"));
    address permit2 = vm.envAddress("PERMIT2");

    vm.startBroadcast(deployerPrivateKey);
    address proxy = Upgrades.deployTransparentProxy(
      "LPManager_V1.sol:LPManager_V1",
      msg.sender,
      abi.encodeCall(
        LPManager_V1.initialize,
        (positionManager, personalToken, fee, tickSpacing, permit2, msg.sender)
      )
    );
    require(proxy != address(0), "Proxy deployment failed");
    vm.stopBroadcast();

    console.log("LPManager_V1 deployed at:", address(proxy));
  }
}
