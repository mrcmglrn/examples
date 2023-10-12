require('dotenv').config();
const LinkTokenInterface = artifacts.require("LinkTokenInterface");
const DataFeed = artifacts.require("DataFeed");

module.exports = async function (deployer, network, accounts) {
  let linkTokenAddress;
  let aggregatorAddress;

  // Access the network ID
  const networkId = await web3.eth.net.getId();
  console.log("networkId :"+networkId);

  if (networkId === 11155111) {
    // Ethereum Sepolia testnet
    linkTokenAddress = process.env.ETH_TEST_SEPOLIA_LINK_ADDRESS;
    aggregatorAddress = process.env.ETH_TEST_SEPOLIA_AGGREGATOR_BTCUSD;
  } else if (networkId === 80001) {
    // Polygon Mumbai testnet
    linkTokenAddress = process.env.MUMBAI_LINK_ADDRESS;
    aggregatorAddress = process.env.MUMBAI_AGGREGATOR_BTCUSD;
  } else {
    // Arbitrum Goerli testnet
    linkTokenAddress = process.env.ARB_TEST_GOERLI_LINK_ADDRESS;
    aggregatorAddress = process.env.ARB_TEST_GOERLI_AGGREGATOR_BTCUSD;
  }

  // Get an instance of LinkToken by testnet
  console.log("linkTokenAddress: "+linkTokenAddress);
  const linkTokenInstance = await LinkTokenInterface.at(linkTokenAddress);

  // Get an instance of DataFeed by testnet
  console.log("aggregatorAddress: "+aggregatorAddress);
  await deployer.deploy(DataFeed, aggregatorAddress);
  const dataFeed = await DataFeed.deployed();

  // Define the amount of LINK tokens to send, and do it
  const amountToSend = web3.utils.toWei("1", "ether");
  await linkTokenInstance.transfer(dataFeed.address, amountToSend, { from: accounts[0] });
};
