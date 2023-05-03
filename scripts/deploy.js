// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

async function main() {
  //  Setup accounts & variables
  const [deployer] = await ethers.getSigners();
  const NAME = "NamETH";
  const SYMBOL = "NETH";

  // Deploy Contract
  const NamETH = await ethers.getContractFactory("NamETH"); //gets the js version of smart contract with the help of ethers library
  const namETH = await NamETH.deploy(NAME, SYMBOL);
  await namETH.deployed();

  console.log(`Deployed Domain Contract at: ${namETH.address}\n`);

  // List 6 domains (pre-minted)
  const names = [
    "rohan.eth",
    "sanchit.eth",
    "mudit.eth",
    "viren.eth",
    "pragati.eth",
    "mamthur.eth",
  ];
  const costs = [
    // ether price
    tokens(10),
    tokens(25),
    tokens(15),
    tokens(2.5),
    tokens(3),
    tokens(1),
  ];

  // minting done beforeHand
  for (var i = 0; i < 6; i++) {
    const transaction = await namETH.connect(deployer).list(names[i], costs[i]);
    await transaction.wait();

    console.log(`Listed Domain ${i + 1}: ${names[i]}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
