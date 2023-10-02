const InformationVault = artifacts.require("InformationVault");

module.exports = function (deployer) {
  deployer.deploy(InformationVault);
};
