const { deployProxy, upgradeProxy } = require("@openzeppelin/truffle-upgrades");
const { expect } = require("chai");

const MyTokenV1 = artifacts.require("MyToken");
const MyTokenV2 = artifacts.require("MyTokenV2");

contract("MyTokenV2 - Transparent Proxy Upgrade", (accounts) => {
  const [owner, admin, user1] = accounts;
  const totalSupply = new web3.utils.BN(web3.utils.toWei("1000000", "ether"));
  const addSupply = new web3.utils.BN(web3.utils.toWei("1000", "ether"));

  let tokenInstance;

  before(async () => {
    // Deploy della V1 con Transparent Proxy
    tokenInstance = await deployProxy(
      MyTokenV1,
      [owner],
      { initializer: "initialize", from: owner }
    );
    console.log("V1 deployed at:", tokenInstance.address);
  });

  describe("V1 Tests", () => {
    it("should have the correct total supply", async () => {
      const supply = await tokenInstance.totalSupply();
      expect(supply.eq(totalSupply)).to.be.true;
    });

    it("should allow minting in V1", async () => {
      const balanceOwner = await tokenInstance.balanceOf(owner);
      expect(balanceOwner.eq(totalSupply)).to.be.true;
    });
  });

  describe("V2 Upgrade and Tests", () => {
    before(async () => {
      // Upgrade alla V2
      tokenInstance = await upgradeProxy(tokenInstance.address, MyTokenV2, {
        call: {
          fn: "initializeV2",
          args: [owner],
        },
        from: owner,
      });
      console.log("Upgraded to V2 at:", tokenInstance.address);
    });

    it("should still have the correct total supply", async () => {
      const supply = await tokenInstance.totalSupply();
      const expectedSupply = totalSupply.add(addSupply);
      expect(supply.eq(expectedSupply)).to.be.true;
    });

    it("should have trading enabled after upgrade", async () => {
      const tradingEnabled = await tokenInstance.tradingEnabled();
      expect(tradingEnabled).to.be.true;
    });

    it("should allow transfers when trading is enabled", async () => {
      const amount = new web3.utils.BN(web3.utils.toWei("1000", "ether"));
      const initialBalanceUser1 = await tokenInstance.balanceOf(user1);
      await tokenInstance.transfer(user1, amount, { from: owner });
      const finalBalanceUser1 = await tokenInstance.balanceOf(user1);
      expect(finalBalanceUser1.eq(initialBalanceUser1.add(amount))).to.be.true;
    });
  });
});