const hre = require("hardhat");

async function deployContracts() {
  console.log("Deploying PassportAccess Contract...");
  const getPassportAccessContract = await hre.ethers.getContractFactory("PassportAccess");
  const passportAccessContract = await getPassportAccessContract.deploy();
  await passportAccessContract.deployed();
  const passportAccessContractAddress = passportAccessContract.address;
  console.log("PassportAccess Contract successfully deployed to", passportAccessContractAddress);

  console.log("Deploying AutoPassport Contract...");
  const getAutoPassportContract = await hre.ethers.getContractFactory("AutoPassport");
  const autoPassportContract = await getAutoPassportContract.deploy(passportAccessContractAddress);
  await autoPassportContract.deployed();
  const autoPassportContractAddress = autoPassportContract.address;
  console.log("AutoPassport Contract successfully deployed to", autoPassportContractAddress);
  
  
  console.log("Waiting for propagation of the contract...");
  await new Promise((resolve) => setTimeout(resolve, 30000)); 

  console.log("Verifying contracts...");
  await hre.run("verify:verify", {
    address: passportAccessContractAddress,
    constructorArguments: [],
  });
  await hre.run("verify:verify", {
    address: autoPassportContractAddress,
    constructorArguments: [passportAccessContractAddress],
  });

}

deployContracts().catch((error) => {
  console.error(error);
  process.exitCode = 1;
})