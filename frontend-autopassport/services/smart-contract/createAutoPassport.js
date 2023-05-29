export async function createAutoPassport(contract, walletAddress, brand, model, vehicleIdentificationNumber, colorCode, dateOfManufacture, uriIpfsUrl) {
  const transaction = await contract.createAutoPassport(
    walletAddress, brand, model, vehicleIdentificationNumber, colorCode, dateOfManufacture, uriIpfsUrl
  );
  const receipt = await transaction.wait();
  const transactionHash = receipt.transactionHash;
  return transactionHash;
}