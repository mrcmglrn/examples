// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";

contract DataFeed {
  AggregatorV3Interface internal dataFeed;

  constructor(address _aggregatorAddress) {
    dataFeed = AggregatorV3Interface(_aggregatorAddress);
  }

  /**
   * Returns the latest data feed.
   */
  function getLatestData() public view returns (uint80 roundID, 
                                                                   int answer, 
                                                                   uint startedAt, 
                                                                   uint timeStamp, 
                                                                   uint80 answeredInRound) {
    return dataFeed.latestRoundData();
  }

  /**
   * Returns the historical data feed by roundId.
   */
  function getHistoricalData(uint80 roundId) public view returns (uint80 roundID, 
                                                                  int answer, 
                                                                  uint startedAt, 
                                                                  uint timeStamp, 
                                                                  uint80 answeredInRound) {
    return dataFeed.getRoundData(roundId);
  }

}