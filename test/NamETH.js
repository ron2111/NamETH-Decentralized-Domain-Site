const { expect } = require("chai");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};
// it creates the the input to a smart contract readable/interactive unit
//  to convert to Wei value

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

    // list a domain
    const transaction = await namETH
      .connect(deployer)
      .list("jack.eth", tokens(10));
    // deployer: person who deploys the contract(we defined it), then we are using list function to list a domain

    // tokens(10) means the domain's cost is 10 eth or 10000000000000000000 Wei
    //  tokens function is created so as to not use this big number everytime
    await transaction.wait();
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

    // test for maxSupply variable
    it("Returns the max Supply", async () => {
      const result = await namETH.maxSupply(); // owner smoke test
      expect(result).to.equal(1);
    });

    it("Returns the total Supply", async () => {
      const result = await namETH.totalSupply(); // owner smoke test
      expect(result).to.equal(0);
    });
  });

  // Test for domain struct
  describe("Domain", () => {
    it("Returns domain attributes", async () => {
      domain = await namETH.getDomain(1);
      expect(domain.name).to.be.equal("jack.eth");
      expect(domain.cost).to.be.equal(tokens(10));
      expect(domain.isOwned).to.be.equal(false);
    });
  });

  describe("Minting", () => {
    // Minting tests
    const ID = 1;
    const AMOUNT = ethers.utils.parseUnits("10", "ether");

    beforeEach(async () => {
      const transaction = await namETH
        .connect(owner1)
        .mint(ID, { value: AMOUNT });
      await transaction.wait();
    });
    it("Updates the owner", async () => {
      // ownerOf function comes from ERC 721 library
      const owner = await namETH.ownerOf(ID);
      expect(owner).to.be.equal(owner1.address);
    });

    it("Updates the domain address", async () => {
      // ownerOf function comes from ERC 721 library
      const domain = await namETH.getDomain(ID);
      expect(domain.isOwned).to.be.equal(true);
    });

    it("Updates the contract balance", async () => {
      // ownerOf function comes from ERC 721 library
      const result = await namETH.getBalance();
      expect(result).to.be.equal(AMOUNT);
    });

    it("Updates the total supply", async () => {
      // ownerOf function comes from ERC 721 library
      const result = await namETH.totalSupply();
      expect(result).to.be.equal(1);
    });
  });

  //  Eithdrawing function tests
  describe("Withdrawing", () => {
    const ID = 1;
    const AMOUNT = ethers.utils.parseUnits("10", "ether");

    beforeEach(async () => {
      balanceBefore = await ethers.provider.getBalance(deployer.address); // get the balance before
      let transaction = await namETH
        .connect(owner1)
        .mint(ID, { value: AMOUNT });
      // mint a nft with owner1
      await transaction.wait();

      transaction = await namETH.connect(deployer).withdraw(); // then we use the withdraw function to get the payment from contract to deployer's address
      await transaction.wait();
    });
    it("Updates the owner balance", async () => {
      // owner balance should be increased
      const balanceAfter = await ethers.provider.getBalance(deployer.address);
      expect(balanceAfter).to.be.greaterThan(balanceBefore);
    });

    it("Updates the contract balance", async () => {
      // contract balance should be 0, because we have withdrawn all the eth
      const result = await namETH.getBalance();
      expect(result).to.be.equal(0);
    });
  });
});
