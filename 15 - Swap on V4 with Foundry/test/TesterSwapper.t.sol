// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import { Test } from "forge-std/Test.sol";
import { console } from "forge-std/console.sol";
import { Swapper } from "../src/Swapper.sol";
import { UniversalRouter } from "@uniswap/universal-router/contracts/UniversalRouter.sol";
import { IHooks } from "@uniswap/v4-core/src/interfaces/IHooks.sol";
import { IPoolManager } from "@uniswap/v4-core/src/interfaces/IPoolManager.sol";
import { PoolKey } from "@uniswap/v4-core/src/types/PoolKey.sol";
import { Currency } from "@uniswap/v4-core/src/types/Currency.sol";
import { IV4Router } from "@uniswap/v4-periphery/src/interfaces/IV4Router.sol";
import { IPermit2 } from "@uniswap/permit2/src/interfaces/IPermit2.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TesterSwapper is Test {
  Swapper public swapper;
  IPermit2 public permit2;

  address constant SWAPPER = 0xYOUR_SWAPPER_ADDRESS;
  address constant USER = 0xYOUR_GENERIC_ADDRESS;
  address private personalToken;
  address private owner;

  function setUp() public {
    vm.createSelectFork(vm.envString("SEPOLIA_RPC"));
    swapper = Swapper(payable(SWAPPER));
    permit2 = IPermit2(vm.envAddress("PERMIT2"));
    personalToken = vm.envAddress("PERSONAL_TOKEN");
    owner = vm.addr(vm.envUint("PRIVATE_KEY"));
    vm.deal(owner, 10 ether);
    deal(personalToken, owner, 10 ether);
    vm.deal(USER, 1 ether);
    deal(personalToken, USER, 1 ether);
  }

  // Happy path: User swap ETH for PersonalToken
  function test_SwapETHtoPersonalToken() public {
    // TO DO: Happy path: User swap ETH for PersonalToken
  }

  // Unhappy path: User's swap fails because minAmountOut is too high
  function test_RefundIf_SwapOutputTooLow() public {
    // TO DO: Unhappy path: User's swap fails because minAmountOut is too high
  }

  // Unhappy path: User's swap fails due to insufficient ETH
  function test_RevertIf_InsufficientETH() public {
    // TO DO: Unhappy path: User's swap fails due to insufficient ETH
  }

  // Happy path: User swap PersonalToken for ETH
  function test_SwapPersonalTokenForETH() public {
    uint128 amountIn = 0.2 ether; // PersonalToken
    uint48 permitExpiration = uint48(block.timestamp + 1 days);
    uint128 minAmountOut = 0.001 ether; // ETH
    
    PoolKey memory key = PoolKey({
      currency0: Currency.wrap(address(0)),
      currency1: Currency.wrap(personalToken),
      fee: 3000,
      tickSpacing: 60,
      hooks: IHooks(address(0))
    });

    uint256 ethBefore = USER.balance;
    uint256 PersonalTokenBefore = IERC20(personalToken).balanceOf(USER);

    vm.startPrank(USER);
    IERC20(personalToken).approve(address(permit2), type(uint256).max);
    IPermit2(permit2).approve(personalToken, address(swapper), amountIn, permitExpiration);

    uint256 amountOut = swapper.swapPersonalTokenForETH(key, amountIn, minAmountOut, permitExpiration);
    vm.stopPrank();

    uint256 ethAfter = USER.balance;
    uint256 PersonalTokenAfter = IERC20(personalToken).balanceOf(USER);

    assertGt(ethAfter, ethBefore, "No ETH received");
    assertLt(PersonalTokenAfter, PersonalTokenBefore, "PersonalToken balance should decrease");
    assertGe(amountOut, minAmountOut, "Output below minAmountOut");
    assertApproxEqAbs(ethAfter - ethBefore, amountOut, 1e15, "ETH received mismatch");
  }

  // Unhappy path: User's swap fails because minAmountOut is too high
  function test_RefundIf_PersonalTokenSwapOutputTooLow() public {
    uint128 amountIn = 0.2 ether; // PersonalToken
    uint160 permitAmount = uint160(amountIn); // PersonalToken
    uint48 permitExpiration = uint48(block.timestamp + 1 days);
    uint128 minAmountOut = 0.01 ether; // ETH

    PoolKey memory key = PoolKey({
      currency0: Currency.wrap(address(0)),
      currency1: Currency.wrap(personalToken),
      fee: 3000,
      tickSpacing: 60,
      hooks: IHooks(address(0))
    });
    
    uint256 ethBefore = USER.balance;
    uint256 PersonalTokenBefore = IERC20(personalToken).balanceOf(USER);

    vm.startPrank(USER);
    IERC20(personalToken).approve(address(permit2), permitAmount);
    IPermit2(permit2).approve(personalToken, address(swapper), amountIn, permitExpiration);
    swapper.swapPersonalTokenForETH(key, amountIn, minAmountOut, permitExpiration);
    vm.stopPrank();

    uint256 ethAfter = USER.balance;
    uint256 PersonalTokenAfter = IERC20(personalToken).balanceOf(USER);

    assertEq(ethAfter, ethBefore, "Unexpected ETH gain");
    assertEq(PersonalTokenAfter, PersonalTokenBefore, "Unexpected PersonalToken loss");
  }

  // Unhappy path: User's swap fails due to insufficient PersonalToken
  function test_RevertIf_PermitTooLow() public {
    uint128 amountIn = 0.2 ether; // PersonalToken
    uint160 permitAmount = uint160(0.1 ether); // PersonalToken
    uint48 permitExpiration = uint48(block.timestamp + 1 days);
    uint128 minAmountOut = 0.001 ether; // ETH

    PoolKey memory key = PoolKey({
      currency0: Currency.wrap(address(0)),
      currency1: Currency.wrap(personalToken),
      fee: 3000,
      tickSpacing: 60,
      hooks: IHooks(address(0))
    });

    vm.startPrank(USER);
    IERC20(personalToken).approve(address(permit2), permitAmount);
    IPermit2(permit2).approve(personalToken, address(swapper), amountIn, permitExpiration);
    vm.expectRevert();
    swapper.swapPersonalTokenForETH(key, amountIn, minAmountOut, permitExpiration);
    vm.stopPrank();
  }

  // Happy path: Owner withdraws ETH
  function test_OwnerCanWithdrawETH() public {
    uint256 contractBalanceBefore = address(swapper).balance;
    vm.deal(address(swapper), 1 ether);
    uint256 ownerBalanceBefore = owner.balance;

    vm.startPrank(owner);
    swapper.withdraw(address(0));
    vm.stopPrank();

    uint256 ownerBalanceAfter = owner.balance;

    assertGt(ownerBalanceAfter, ownerBalanceBefore, "ETH not withdrawn");
    assertEq(address(swapper).balance, contractBalanceBefore, "Contract balance not zero");
  }

}