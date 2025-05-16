// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import { IHooks } from "@uniswap/v4-core/src/interfaces/IHooks.sol";
import { PoolKey } from "@uniswap/v4-core/src/types/PoolKey.sol";
import { Currency } from "@uniswap/v4-core/src/types/Currency.sol";
import { IPositionManager } from "@uniswap/v4-periphery/src/interfaces/IPositionManager.sol";
import { Actions } from "@uniswap/v4-periphery/src/libraries/Actions.sol";
import { IPermit2 } from "@uniswap/permit2/src/interfaces/IPermit2.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { DeltaStrategies } from "./DeltaStrategies.sol";
import { AccessControlUpgradeable } from "@openzeppelin-upgradeable/contracts/access/AccessControlUpgradeable.sol";
import { Initializable } from "@openzeppelin-upgradeable/contracts/proxy/utils/Initializable.sol";
import { PausableUpgradeable } from "@openzeppelin-upgradeable/contracts/utils/PausableUpgradeable.sol";
import { ReentrancyGuardUpgradeable } from "@openzeppelin-upgradeable/contracts/utils/ReentrancyGuardUpgradeable.sol";

contract LPManager_V1 is Initializable, PausableUpgradeable, AccessControlUpgradeable, ReentrancyGuardUpgradeable {
  using DeltaStrategies for *;

  IPositionManager public positionManager;
  address public personalToken;
  uint24 public fee;
  int24 public tickSpacing;
  IPermit2 public permit2;

  event LiquidityAdded(address indexed sender, uint256 indexed tokenId, uint128 liquidity);
  event LiquidityRemoved(address indexed sender, uint256 indexed tokenId, uint128 liquidity);
  event LiquidityFeesCollected(address indexed sender, uint256 indexed tokenId);

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize(
    address _positionManager,
    address _token1,
    uint24 _fee,
    int24 _tickSpacing,
    address _permit2,
    address _admin
  ) public virtual initializer {
    __AccessControl_init();
    __Pausable_init();
    __ReentrancyGuard_init();

    positionManager = IPositionManager(_positionManager);
    personalToken = _token1;
    fee = _fee;
    tickSpacing = _tickSpacing;
    permit2 = IPermit2(_permit2);

    _grantRole(DEFAULT_ADMIN_ROLE, _admin);
  }

  receive() external payable whenNotPaused {}

  function addLiquidity(
    uint256 tokenId,
    uint128 liquidity,
    uint128 amount0Max,
    uint128 amount1Max,
    bytes calldata hookData,
    DeltaStrategies.AddLiquidity strategy,
    uint48 permitExpiration,
    uint256 deadline
  ) external payable virtual whenNotPaused nonReentrant onlyRole(DEFAULT_ADMIN_ROLE) {
    require(tokenId > 0, "Invalid token ID");
    require(liquidity > 0, "Invalid liquidity amount");
    require(deadline >= block.timestamp + 10, "Deadline expired or too close");

    // Manager becomes owner of the funds
    permit2.transferFrom(msg.sender, address(this), amount1Max, personalToken);

    // Manager approves
    IERC20(personalToken).approve(address(permit2), type(uint256).max);
    IPermit2(permit2).approve(personalToken, address(positionManager), amount1Max, permitExpiration);

    bytes memory actions;
    bytes[] memory params;
    if (strategy == DeltaStrategies.AddLiquidity.SETTLE_PAIR) {
      actions = abi.encodePacked(
        uint8(Actions.INCREASE_LIQUIDITY),
        uint8(Actions.SETTLE_PAIR)
      );
      params = new bytes[](2);
      params[0] = abi.encode(tokenId, liquidity, amount0Max, amount1Max, hookData);
      params[1] = abi.encode(Currency.wrap(address(0)), Currency.wrap(personalToken));
    } else if (strategy == DeltaStrategies.AddLiquidity.CLOSE_CURRENCY) {
      actions = abi.encodePacked(
        uint8(Actions.INCREASE_LIQUIDITY),
        uint8(Actions.CLOSE_CURRENCY),
        uint8(Actions.CLOSE_CURRENCY)
      );
      params = new bytes[](3);
      params[0] = abi.encode(tokenId, liquidity, amount0Max, amount1Max, hookData);
      params[1] = abi.encode(Currency.wrap(address(0)));
      params[2] = abi.encode(Currency.wrap(personalToken));
    } else if (strategy == DeltaStrategies.AddLiquidity.CLEAR_OR_TAKE) {
      actions = abi.encodePacked(
        uint8(Actions.INCREASE_LIQUIDITY),
        uint8(Actions.CLEAR_OR_TAKE), 
        uint8(Actions.CLEAR_OR_TAKE)
      );
      params = new bytes[](3);
      params[0] = abi.encode(tokenId, liquidity, amount0Max, amount1Max, hookData);
      params[1] = abi.encode(Currency.wrap(address(0)), amount0Max);
      params[2] = abi.encode(Currency.wrap(personalToken), amount1Max);
    } else {
      revert("Unsupported delta strategy add liquidity!");
    }

    try positionManager.modifyLiquidities{value: amount0Max}(abi.encode(actions, params), deadline) {
      emit LiquidityAdded(msg.sender, tokenId, liquidity);
    } catch {
      // ETH is automatic refunded to the sender when the transaction fails by a revert

      IERC20(personalToken).transfer(msg.sender, amount1Max);
      // TODO: LiquidityAddFailed
    }
  }

  function removeLiquidity(
    uint256 tokenId,
    uint128 liquidity,
    uint128 amount0Min,
    uint128 amount1Min,
    bytes calldata hookData,
    DeltaStrategies.RemoveLiquidity strategy,
    uint256 deadline
  ) external payable virtual whenNotPaused nonReentrant onlyRole(DEFAULT_ADMIN_ROLE) {
    // TODO: remove liquidity
  }

  function collect(
    uint256 tokenId,
    bytes calldata hookData,
    uint256 deadline
  ) external virtual whenNotPaused nonReentrant onlyRole(DEFAULT_ADMIN_ROLE) {
    // TODO: collect fees
  }

  function withdraw(address token) external onlyRole(DEFAULT_ADMIN_ROLE) {
    if (token == address(0)) {
      payable(msg.sender).transfer(address(this).balance);
    } else {
      IERC20(token).transfer(msg.sender, IERC20(token).balanceOf(address(this)));
    }
  }

  function transferOwnership(address newAdmin) external onlyRole(DEFAULT_ADMIN_ROLE) {
    require(newAdmin != address(0), "Invalid new owner");
    _grantRole(DEFAULT_ADMIN_ROLE, newAdmin);
    _revokeRole(DEFAULT_ADMIN_ROLE, msg.sender);
  }

  function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
    _pause();
  }

  function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
    _unpause();
  }

  // Maintain storage gap at END
  uint256[50] private __gap;

}