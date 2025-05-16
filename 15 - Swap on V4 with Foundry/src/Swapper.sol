// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import { UniversalRouter } from "@uniswap/universal-router/contracts/UniversalRouter.sol";
import { Commands } from "@uniswap/universal-router/contracts/libraries/Commands.sol";
import { IPoolManager } from "@uniswap/v4-core/src/interfaces/IPoolManager.sol";
import { PoolKey } from "@uniswap/v4-core/src/types/PoolKey.sol";
import { Currency } from "@uniswap/v4-core/src/types/Currency.sol";
import { IV4Router } from "@uniswap/v4-periphery/src/interfaces/IV4Router.sol";
import { Actions } from "@uniswap/v4-periphery/src/libraries/Actions.sol";
import { IPermit2 } from "@uniswap/permit2/src/interfaces/IPermit2.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Swapper {
  address public owner;

  UniversalRouter public immutable router;
  IPoolManager public immutable poolManager;
  IPermit2 public immutable permit2;
  address public immutable personalToken;

  event Refunded(address indexed user, address indexed asset, uint256 amount, bool isEther);

  constructor(
    address payable _router,
    address _poolManager,
    address _permit2,
    address _personalToken
  ) {
    owner = msg.sender;
    router = UniversalRouter(_router);
    poolManager = IPoolManager(_poolManager);
    permit2 = IPermit2(_permit2);
    personalToken = _personalToken;
  }

  receive() external payable {}

  function swapETHForPersonalToken (
    PoolKey calldata poolKey,
    uint128 amountIn,
    uint128 minAmountOut
  ) external payable returns (uint256 amountOut) {
    require(msg.value >= amountIn, "Insufficient ETH sent");

    bytes memory commands = abi.encodePacked(uint8(Commands.V4_SWAP));

    bytes memory actions = abi.encodePacked(
      uint8(Actions.SWAP_EXACT_IN_SINGLE),
      uint8(Actions.SETTLE_ALL),
      uint8(Actions.TAKE_ALL)
    );

    bytes[] memory params = new bytes[](3);
    params[0] = abi.encode(
      IV4Router.ExactInputSingleParams({
        poolKey: poolKey,
        zeroForOne: true,
        amountIn: amountIn,
        amountOutMinimum: minAmountOut,
        hookData: bytes("") // No hook
      })
    );
    params[1] = abi.encode(Currency.wrap(address(0)), amountIn);
    params[2] = abi.encode(Currency.wrap(personalToken), minAmountOut);

    bytes[] memory inputs = new bytes[](1);
    inputs[0] = abi.encode(actions, params);

    uint256 deadline = block.timestamp + 60;
    try router.execute{value: amountIn}(commands, inputs, deadline) {
      amountOut = IERC20(personalToken).balanceOf(address(this));
      IERC20(personalToken).transfer(msg.sender, amountOut);
    } catch {
      payable(msg.sender).transfer(amountIn);
      emit Refunded(msg.sender, address(0), amountIn, true);
    }

    return amountOut;
  }

  function swapPersonalTokenForETH(
    PoolKey calldata poolKey,
    uint128 amountIn,
    uint128 minAmountOut,
    uint48 permitExpiration
  ) external returns (uint256 amountOut) {
    // TO DO: Implement swapPersonalTokenForETH
  }

  function withdraw(address token) external onlyOwner {
    if (token == address(0)) {
      payable(msg.sender).transfer(address(this).balance);
    } else {
      IERC20(token).transfer(msg.sender, IERC20(token).balanceOf(address(this)));
    }
  }

  function transferOwnership(address newOwner) external onlyOwner {
    require(newOwner != address(0), "Invalid new owner");
    owner = newOwner;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Not owner");
    _;
  }
}