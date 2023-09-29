const NftMintingCollection = artifacts.require("NftMintingCollection");

module.exports = async function (deployer) {
  await deployer.deploy(NftMintingCollection, "NftMintingCollection", "XYZC", "https://ipfs.io/ipfs/QmPDjo3mUvmtEUVHK5fnAZKqgcxUpsmna7s7kxK7wM1GsS/");
  const nftMintingCollection = await NftMintingCollection.deployed();
  await nftMintingCollection.mint(10); // makes 10 copies!!!
  await nftMintingCollection.mint(1); // makes 1 copies!!!
};