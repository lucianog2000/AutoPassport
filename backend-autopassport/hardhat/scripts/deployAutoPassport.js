const hre = require("hardhat");
async function main() {
  const getAutoPassportContract = await hre.ethers.getContractFactory("MultiWordConsumer");
  const contract = await getAutoPassportContract.deploy();
  await contract.deployed();
  console.log("Contract successfully deployed to", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
