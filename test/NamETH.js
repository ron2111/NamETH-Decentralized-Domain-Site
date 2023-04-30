const { expect } = require("chai");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("NamETH", () => {
  it("has a name", async () => {
    const NamETH = await ethers.getContractFactory("NamETH"); //gest the js version of smart contract with the help of ethers library
    let namETH = await NamETH.deploy(); // then we deploy it

    // now as it is deployed we can use/test its js functions here, so we have got result variable to get the name property of smart contract gthat we declared earlier in the contract
    const result = await namETH.name();
    expect(result).to.equal("NamETH"); // here we test that the result should be same as the original name, then we declare the test as passed
  });
});
