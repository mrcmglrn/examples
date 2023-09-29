const NftMinting = artifacts.require("NftMinting");

module.exports = async function (deployer) {
  await deployer.deploy(NftMinting, "NftMinting", "XYZ");
  const nftMinting = await NftMinting.deployed();
  await nftMinting.mint("https://ipfs.io/ipfs/QmVi58NTL6961vqECHWiJpYVojf7WzSc4GUMsSLuiuvUC9");
};