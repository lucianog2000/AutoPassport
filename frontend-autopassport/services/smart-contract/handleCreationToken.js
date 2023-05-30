import { createAutoPassport } from "./createAutoPassport";
import { getContract } from "./getContract";

export async function handleTokenCreation(formValues, contractAddress, contractABI) {
  //obtenemos una instacia del contrato
  const contract = getContract(contractAddress, contractABI);

  const { brand, model, vehicleIdentificationNumber, colorCode, dateOfManufacture, uriIpfsUrl, walletAddress } = formValues;
  //creamos el token
  const transactionHash = await createAutoPassport(
    contract, walletAddress, brand, model, vehicleIdentificationNumber, colorCode, dateOfManufacture, uriIpfsUrl
    );
  console.log(`The token has been created successfully ${transactionHash}`);
  alert(`The token has been created successfully ${transactionHash}`);
}