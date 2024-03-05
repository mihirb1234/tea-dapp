const hre = require("hardhat");
async function main() {
  // const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const chai = await hre.ethers.getContractFactory("Chai");
  const contract = await chai.deploy(); //instance of contract

  await contract.waitForDeployment();
  console.log("Address of contract:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
