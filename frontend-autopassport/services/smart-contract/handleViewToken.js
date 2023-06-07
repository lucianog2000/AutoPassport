import { getCarByVIN } from "./getCarByVIN";
import { getContract } from "./getContract";

export async function handleViewToken(vin, contractAddress, contractABI) {
  //obtenemos una instancia del contrato
  try {
    const contract = getContract(contractAddress, contractABI);
    const response = await getCarByVIN(contract, vin);
    console.log(`The token has been obtained successfully`);
    return response;
  }
  catch (error) {
    console.log(`Error handleViewToken: ${error}`);
  }
}