// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

library DeltaStrategies {

  enum AddLiquidity {
    SETTLE_PAIR,
    CLOSE_CURRENCY,
    CLEAR_OR_TAKE,
    FAKE_TO_TEST 
  }

  enum RemoveLiquidity {
    TAKE_PAIR,
    CLOSE_CURRENCY,
    CLEAR_OR_TAKE,
    FAKE_TO_TEST
  }

}
