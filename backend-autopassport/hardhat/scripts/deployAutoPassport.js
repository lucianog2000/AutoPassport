const hre = require("hardhat");

async function main() {
  console.log("deploying contract...");
  const getAutoPassportContract = await hre.ethers.getContractFactory(
    "AutoPassport"
  );
  const contract = await getAutoPassportContract.deploy();
  await contract.deployed();
  const contractAddress = contract.address;
  console.log("Contract successfully deployed to", contractAddress);

//   //SendLinkToken
//   const linkTokenAddress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
//   const linkTokenABI = 
//   const walletAddress = process.env.PRIVATE_KEY_DEV;
//   const wallet = new ethers.Wallet(walletAddress, ethers.provider);
//    // Create an instance of the LINK Token contract
//    const linkTokenContract = new ethers.Contract(linkTokenAddress, linkTokenABI, wallet);

//    console.log("Sending LINK tokens to contract...");
//   const balance = await linkTokenContract.balanceOf(walletAddress);
//   const amount = ethers.utils.parseEther("1");
  
//   if (balance.lt(amount)) {
//     throw new Error("Insufficient balance");
//   }

//   const tx = await linkTokenContract.transfer(contractAddress, amount);
//   await tx.wait();
//   console.log("LINK tokens sent to the contract:", amount.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
