// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "./MyToken_V1.sol";

contract MyTokenV2 is MyToken {

  uint256 public constant ADD_SUPPLY = 1000 * 10 ** 18; 
  bool public tradingEnabled;

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initializeV2(
    address owner
  ) public reinitializer(2) {
    // Aggiornamenti specifici della V2
    tradingEnabled = true;

    // Opzionale: trasferisci il controllo a owner se necessario
    // Qui non serve, ma lo includo come esempio
    _mint(owner, ADD_SUPPLY); // Chiamata dummy per dimostrare compatibilità
  }



  // Sovrascrivi _update per aggiungere il controllo su tradingEnabled
  function _update(
    address from,
    address to,
    uint256 amount
  ) internal virtual override {
    require(tradingEnabled || from == address(0) || to == address(0), "Trading is not enabled");
    super._update(from, to, amount);
  }
}