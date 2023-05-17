const hre = require("hardhat");

async function main() {
  const auto = await hre.ethers.getContractFactory("Passport");
  console.log("Deployeando contracto...");
  const carro = await auto.deploy();
  await carro.deployed();
  console.log("Contrato deployeado en la direccion", carro.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
