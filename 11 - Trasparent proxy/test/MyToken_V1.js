const { deployProxy } = require("@openzeppelin/truffle-upgrades");
const { expect } = require('chai');

const MyToken = artifacts.require("MyToken");

contract("MyToken (Upgradeable)", (accounts) => {
    const [owner] = accounts;

    let tokenInstance;

    beforeEach(async () => {
        // Deploy the contract using the proxy pattern.
        tokenInstance = await deployProxy(MyToken, 
                                          [owner], 
                                          { initializer: "initialize", from: owner }
                                         );
    });

    describe("✅ Initialization", () => {
        it("should have the correct total supply", async () => {
            const totalSupply = await tokenInstance.totalSupply();
            expect(totalSupply.toString()).to.equal(web3.utils.toWei("1000000", "ether"));
        });

        it("should assign the initial supply to the owner", async () => {
            const ownerBalance = await tokenInstance.balanceOf(owner);
            expect(ownerBalance.toString()).to.equal(web3.utils.toWei("1000000", "ether"));
        });
    });

});
