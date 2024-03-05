const hre = require("hardhat");

async function getBalances(address) {
  const balanceBigInt = await ethers.provider.getBalance(address);
  const p = await ethers.formatEther(balanceBigInt);
  return p;
}

async function consoleBalances(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter} balance:`, await getBalances(address));
    counter++;
  }
}

async function consoleMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const name = memo.name;
    const from = memo.from;
    const message = memo.message;
    console.log(
      `At ${timestamp}, name ${name}, address ${from}, message ${message}`
    );
  }
}

async function main() {
  try {
    const [owner, from1, from2, from3] = await hre.ethers.getSigners();
    const chai = await hre.ethers.getContractFactory("Chai");
    const contract = await chai.deploy(); //instance of contract

    await contract.waitForDeployment();
    console.log("Address of contract:", await contract.getAddress());

    const addresses = [
      owner.getAddress(),
      from1.getAddress(),
      from2.getAddress(),
      from3.getAddress(),
    ];
    console.log("Before buying chai");
    await consoleBalances(addresses);

    const amount = { value: hre.ethers.parseEther("1") };
    await contract.connect(from1).buyChai("from1", "Very nice chai", amount);
    await contract.connect(from2).buyChai("from2", "Very nice course", amount);
    await contract
      .connect(from3)
      .buyChai("from3", "Very nice information", amount);

    console.log("After buying chai");
    await consoleBalances(addresses);

    // const memos = await contract.getMemos();

    const memos = await contract.getMemos();
    consoleMemos(memos);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
