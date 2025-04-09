// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import { Script } from "forge-std/Script.sol";
import { MyToken } from "../src/MyToken.sol";

contract DeployerMyToken is Script {
  function run() external returns(MyToken) {
    vm.startBroadcast();
    MyToken myToken = new MyToken(1_000_000 * 10 ** 18);
    vm.stopBroadcast();
    return myToken;
  }
}