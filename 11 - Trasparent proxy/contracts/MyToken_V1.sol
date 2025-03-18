// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract MyToken is Initializable, ERC20Upgradeable {

  uint256 public constant MAX_TOTAL_SUPPLY = 1000000 * 10 ** 18; 
  
  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize(
    address owner
  ) public initializer {
    __ERC20_init("MyToken", "MMTK");
    _mint(owner, MAX_TOTAL_SUPPLY);
  }

  function _update(
    address from,
    address to,
    uint256 amount
  ) internal virtual override(ERC20Upgradeable) {
    super._update(from, to, amount);
  }

}
