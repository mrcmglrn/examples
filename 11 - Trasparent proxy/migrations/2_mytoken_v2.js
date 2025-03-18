const { deployProxy, upgradeProxy } = require("@openzeppelin/truffle-upgrades");

const MyTokenV1 = artifacts.require("MyToken");
const MyTokenV2 = artifacts.require("MyTokenV2");

module.exports = async function (deployer, network, accounts) {
  const owner = accounts[0];

  // Passo 1: Deploy della V1 con Transparent Proxy
  const tokenInstanceV1 = await deployProxy(
    MyTokenV1,
    [owner],
    { deployer, initializer: "initialize" }
  );
  console.log("MyToken V1 deployed via proxy at:", tokenInstanceV1.address);

  // Passo 2: Upgrade alla V2
  const tokenInstanceV2 = await upgradeProxy(tokenInstanceV1.address, MyTokenV2, {
    deployer,
    call: { fn: "initializeV2", args: [owner] },
  });
  console.log("MyToken upgraded to V2 at:", tokenInstanceV2.address);
};