const hre = require("hardhat");

async function main() {
  console.log("deploying PassportAccess Contract...");
  const getPassportAccessContract = await hre.ethers.getContractFactory(
    "PassportAccess"
  );
  const contract = await getPassportAccessContract.deploy();
  await contract.deployed();
  const contractAddress = contract.address;
  console.log("PassportAccess Contract successfully deployed to", contractAddress);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
