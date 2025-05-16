// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import { Test } from "forge-std/Test.sol";
import { console } from "forge-std/console.sol";
import { LPManager_V1 } from "../src/LPManager_V1.sol";
import { IHooks } from "@uniswap/v4-core/src/interfaces/IHooks.sol";
import { IPoolManager } from "@uniswap/v4-core/src/interfaces/IPoolManager.sol";
import { FixedPoint96 } from "@uniswap/v4-core/src/libraries/FixedPoint96.sol";
import { StateLibrary } from "@uniswap/v4-core/src/libraries/StateLibrary.sol";
import { FullMath } from "@uniswap/v4-core/src/libraries/FullMath.sol";
import { TickMath } from "@uniswap/v4-core/src/libraries/TickMath.sol";
import { PoolId, PoolIdLibrary } from "@uniswap/v4-core/src/types/PoolId.sol";
import { PoolKey } from "@uniswap/v4-core/src/types/PoolKey.sol";
import { Currency, CurrencyLibrary  } from "@uniswap/v4-core/src/types/Currency.sol";
import { IPositionManager } from "@uniswap/v4-periphery/src/interfaces/IPositionManager.sol";
import { LiquidityAmounts } from "@uniswap/v4-periphery/src/libraries/LiquidityAmounts.sol";
import { PositionInfoLibrary, PositionInfo } from "@uniswap/v4-periphery/src/libraries/PositionInfoLibrary.sol";
import { IPermit2 } from "@uniswap/permit2/src/interfaces/IPermit2.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { IERC721 } from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import { DeltaStrategies } from "../src/DeltaStrategies.sol";

contract TesterLPManager_V1 is Test {
  using CurrencyLibrary for Currency;
  using PoolIdLibrary for PoolKey;
  using StateLibrary for IPoolManager;

  LPManager_V1 public lpManager;
  IPoolManager public poolManager;
  IPositionManager public positionManager;
  IPermit2 public permit2;

  address constant USER = 0xYOUR_GENERIC_ADDRESS;
  address private personalToken;
  address private owner;
  uint256 private tokenId;
  
  error AccessControlUnauthorizedAccount(address account, bytes32 role);

  event LiquidityAdded(address indexed sender, uint256 indexed tokenId, uint128 liquidity);
  event LiquidityRemoved(address indexed sender, uint256 indexed tokenId, uint128 liquidity);
  event LiquidityFeesCollected(address indexed sender, uint256 indexed tokenId);

  function setUp() public {
    vm.createSelectFork(vm.envString("SEPOLIA_RPC"));
    lpManager = LPManager_V1(payable(vm.envAddress("PROXY_ADDRESS_LPMANAGER")));
    poolManager = IPoolManager(vm.envAddress("POOL_MANAGER"));
    positionManager = IPositionManager(vm.envAddress("POSITION_MANAGER"));
    permit2 = IPermit2(vm.envAddress("PERMIT2"));
    personalToken = vm.envAddress("PERSONAL_TOKEN");
    owner = vm.addr(vm.envUint("PRIVATE_KEY"));
    tokenId = vm.envUint("TOKEN_ID");
    vm.deal(owner, 10 ether);
    deal(personalToken, owner, 1000 ether);
    vm.deal(USER, 1 ether);
    deal(personalToken, USER, 100 ether);
  }
  
  // Happy path: Owner LPManager add liquidity in mode settlePair balanced
  function test_AddLiquidity_SettlePair_Balanced() public {
    // TODO: Happy path: Owner LPManager add liquidity in mode settlePair balanced
  }

  // Happy path: Owner LPManager add liquidity in mode closeCurrency unbalanced on ETH
  function test_AddLiquidity_CloseCurrency_UnbalancedOnETH() public {
    // TODO: Happy path: Owner LPManager add liquidity in mode closeCurrency unbalanced on ETH
  }

  // Happy path: Owner LPManager add liquidity in mode closeCurrency unbalanced on PERSONAL_TOKEN
  function test_AddLiquidity_CloseCurrency_UnbalancedOnPERSONAL_TOKEN() public {
    // TODO: Happy path: Owner LPManager add liquidity in mode closeCurrency unbalanced on PERSONAL_TOKEN
  }

  // Unhappy path: try adding liquidity on invalid DeltaStrategy
  function test_FailAddLiquidity_ForInvalidDeltaStrategy() public {
    // TODO: Unhappy path: try adding liquidity on invalid DeltaStrategy
  }

  // Unhappy path: smart contract is paused
  function test_FailAddLiquidity_WhenSCPaused() public {
    // TODO: Unhappy path: smart contract is paused
  }

  // Unhappy path: try adding liquidity from not owner
  function test_FailAddLiquidity_WhenNotOwner() public {
    // TODO: Unhappy path: try adding liquidity from not owner
  }

  // Unhappy path: try adding liquidity on invalid tokenId
  function test_FailAddLiquidity_ForInvalidTokenId() public {
    // TODO: Unhappy path: try adding liquidity on invalid tokenId
  }

  // Unhappy path: try adding liquidity without liquidity
  function test_FailAddLiquidity_ForInvalidLiquidity() public {
    // TODO: Unhappy path: try adding liquidity without liquidity
  }

  // Unhappy path: try adding liquidity with bad deadline
  function test_FailAddLiquidity_ForBadDeadline() public {
    // TODO: Unhappy path: try adding liquidity with bad deadline
  }
  
  // Happy path: Owner LPManager remove liquidity in mode takePair balanced
  function test_RemoveLiquidity_TakePair_Balanced() public {
    // TODO: Happy path: Owner LPManager remove liquidity in mode takePair balanced
  }

  // Happy path: Owner LPManager remove liquidity in mode clearOrTake unbalanced on ETH
  function test_RemoveLiquidity_ClearOrTake_UnbalancedOnETH() public {
    // TODO: Happy path: Owner LPManager remove liquidity in mode clearOrTake unbalanced on ETH
  }

  // Happy path: Owner LPManager remove liquidity in mode clearOrTake unbalanced on PERSONAL_TOKEN
  function test_RemoveLiquidity_ClearOrTake_UnbalancedOnPERSONAL_TOKEN() public {
    // TODO: Happy path: Owner LPManager remove liquidity in mode clearOrTake unbalanced on PERSONAL_TOKEN
  }

  // Unhappy path: try removing liquidity on invalid DeltaStrategy
  function test_FailRemoveLiquidity_ForInvalidDeltaStrategy() public {
    // TODO: Unhappy path: try removing liquidity on invalid DeltaStrategy
  }

  // Unhappy path: smart contract is paused
  function test_FailRemoveLiquidity_WhenSCPaused() public {
    // TODO: Unhappy path: smart contract is paused
  }

  // Unhappy path: try removing liquidity from not owner
  function test_FailRemoveLiquidity_WhenNotOwner() public {
    // TODO: Unhappy path: try removing liquidity from not owner
  }

  // Unhappy path: try removing liquidity on invalid tokenId
  function test_FailRemoveLiquidity_ForInvalidTokenId() public {
    // TODO: Unhappy path: try removing liquidity on invalid tokenId
  }

  // Unhappy path: try removing liquidity without liquidity
  function test_FailRemoveLiquidity_ForInvalidLiquidity() public {
    // TODO: Unhappy path: try removing liquidity without liquidity
  }

  // Unhappy path: try removing liquidity with bad deadline
  function test_FailRemoveLiquidity_ForBadDeadline() public {
    // TODO: Unhappy path: try removing liquidity with bad deadline
  }

  // Happy path: Owner LPManager collects fees
  function test_CollectsFees() public {
    uint256 deadline = block.timestamp + 5 minutes;

    address actualOwner = IERC721(address(positionManager)).ownerOf(tokenId);
    //console.log("Actual owner of tokenId", tokenId, "is", actualOwner);
    vm.startPrank(actualOwner);
    IERC721(address(positionManager)).approve(address(lpManager), tokenId);
    vm.stopPrank();

    vm.startPrank(owner);
    vm.expectEmit(true, true, false, true);
    emit LiquidityFeesCollected(owner, tokenId);

    lpManager.collect(
      tokenId,
      "", // hookData
      deadline
    );
    vm.stopPrank();
  }

  // Unhappy path: smart contract is paused
  function test_FailCollectsFees_WhenSCPaused() public {
    uint256 deadline = block.timestamp + 5 minutes;

    address actualOwner = IERC721(address(positionManager)).ownerOf(tokenId);
    //console.log("Actual owner of tokenId", tokenId, "is", actualOwner);
    vm.startPrank(actualOwner);
    IERC721(address(positionManager)).approve(address(lpManager), tokenId);
    vm.stopPrank();

    vm.startPrank(owner);
    lpManager.pause();
    vm.expectRevert("EnforcedPause()");

    lpManager.collect(
      tokenId,
      "", // hookData
      deadline
    );
    vm.stopPrank();
  }

  // Unhappy path: try collected fees liqidity from not owner
  function test_FailCollectsFees_WhenNotOwner() public {
    uint256 deadline = block.timestamp + 5 minutes;

    address actualOwner = IERC721(address(positionManager)).ownerOf(tokenId);
    //console.log("Actual owner of tokenId", tokenId, "is", actualOwner);
    vm.startPrank(actualOwner);
    IERC721(address(positionManager)).approve(address(lpManager), tokenId);
    vm.stopPrank();

    vm.startPrank(USER);
    vm.expectRevert(
      abi.encodeWithSelector(
        AccessControlUnauthorizedAccount.selector,
        USER,
        bytes32(0) // DEFAULT_ADMIN_ROLE
      )
    );
    lpManager.collect(
      tokenId,
      "", // hookData
      deadline
    );
    vm.stopPrank();
  }

  // Unhappy path: try collected fees on invalid tokenId
  function test_CollectsFees_ForInvalidTokenId() public {
    uint256 deadline = block.timestamp + 5 minutes;

    vm.startPrank(owner);
    vm.expectRevert("Invalid token ID");
    lpManager.collect(
      0,
      "", // hookData
      deadline
    );
    vm.stopPrank();
  }

  // Unhappy path: try collected fees on bad deadline
  function test_CollectsFees_ForBadDeadline() public {
    uint256 deadline = block.timestamp - 5 minutes;

    vm.startPrank(owner);
    vm.expectRevert("Deadline expired or too close");
    lpManager.collect(
      tokenId,
      "", // hookData
      deadline
    );
    vm.stopPrank();
  }

  //*******************//
  // UTILITY FUNCTIONS //
  //*******************//
  function _getTokensAmount() internal view returns (uint128 amount0, uint128 amount1) {
    // TODO: Get the amounts of tokens in the position
  }

  function _getAmount0ForLiquidity(
    uint160 sqrtPriceX96,
    uint160 sqrtA,
    uint160 sqrtB,
    uint128 liquidity
  ) private pure returns (uint128) {
    // TODO: _getAmount0ForLiquidity
  }

  function _getAmount1ForLiquidity(
    uint160 sqrtPriceX96,
    uint160 sqrtA,
    uint160 sqrtB,
    uint128 liquidity
  ) private pure returns (uint128) {
    // TODO: _getAmount1ForLiquidity
  }

  function _getAmount0Delta(
    uint160 sqrtA,
    uint160 sqrtB,
    uint128 liquidity
  ) private pure returns (uint256) {
    // TODO: _getAmount0Delta
  }

  function _getAmount1Delta(
    uint160 sqrtA,
    uint160 sqrtB,
    uint128 liquidity
  ) private pure returns (uint256) {
    // TODO: _getAmount1Delta
  }

  function _getLiquidityForAmounts(
    uint128 amount0, 
    uint128 amount1
  ) internal view returns (uint128 liquidity) {
    // TODO: _getLiquidityForAmounts
  }

  function _testGetPositionLiquidity() internal view {
    // TODO: _testGetPositionLiquidity
  }

  function _testGetPoolAndPositionInfo() internal view {
    // TODO: _testGetPoolAndPositionInfo
  }

  function _testPositionInfo() internal view {
    // TODO: _testPositionInfo
  }

  function _testGetSlot0() internal view {
    // TODO: _testGetSlot0
  }

}