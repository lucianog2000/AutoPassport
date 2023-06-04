export async function createAutoPassport(
  contract, 
  formValues) {
  //interactuamos con la funcion createAutoPassport de nuestro contrato
  const { 
    brand,
    model,
    vehicleIdentificationNumber,
    colorCode,
    dateOfManufacture,
    warrantyExpirationDate,
    fuel_type,
    last_update,
    uriIpfsUrl,
    walletAddress } = formValues;
  const transaction = await contract.createAutoPassport(
    walletAddress, 
    brand, 
    model, 
    vehicleIdentificationNumber, 
    colorCode, 
    dateOfManufacture, 
    warrantyExpirationDate, 
    fuel_type, 
    last_update, 
    uriIpfsUrl
  );
  const receipt = await transaction.wait();
  const transactionHash = receipt.transactionHash;
  return transactionHash;
}