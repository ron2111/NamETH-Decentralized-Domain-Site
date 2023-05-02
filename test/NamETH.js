const { expect } = require("chai");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("NamETH", () => {
  let namETH;
  let deployer, owner1;

  const NAME = "NamETH";
  const SYMBOL = "NETH";
  beforeEach(async () => {
    // run before each individual test

    // signers are the accounts associated with the hardjat project, hardhat provides 20 test accounts as such with 10000 ETH
    [deployer, owner1] = await ethers.getSigners();

    const NamETH = await ethers.getContractFactory("NamETH"); //gest the js version of smart contract with the help of ethers library
    namETH = await NamETH.deploy("NamETH", "NETH"); // then we deploy it
  });

  describe("Deployement", () => {
    // deployement tests grouped

    it("has a name", async () => {
      // now as it is deployed we can use/test its js functions here, so we have got result variable to get the name property of smart contract gthat we declared earlier in the contract
      const result = await namETH.name();
      expect(result).to.equal(NAME); // here we test that the result should be same as the original name, then we declare the test as passed
    });

    it("has a symbol", async () => {
      const result = await namETH.symbol(); // symbol smoke test
      expect(result).to.equal(SYMBOL);
    });

    it("sets the owner", async () => {
      const result = await namETH.owner(); // owner smoke test
      expect(result).to.equal(deployer.address);
    });
  });
});
