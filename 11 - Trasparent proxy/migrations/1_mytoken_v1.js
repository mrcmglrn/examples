const { deployProxy } = require("@openzeppelin/truffle-upgrades");
const MyToken = artifacts.require("MyToken");

module.exports = async function (deployer, network, accounts) {
  const [owner] = accounts;

  try {
    const instance = await deployProxy(MyToken, 
                                       [owner], 
                                       { deployer, initializer: "initialize" }
                                      );

    console.log("Deployed Proxy at:", instance.address);
  } catch (error) {
    console.error("Error during deployment:", error.message);
    console.error("Stack Trace:", error.stack);
    process.exit(1);
  }
};
