import { getCarByVIN } from "./getCarByVIN";
import { getContract } from "./getContract";

export async function handleViewToken(vin, contractAddress, contractABI) {
  try {
    const contract = getContract(contractAddress, contractABI);
    const response = await getCarByVIN(contract, vin);
    console.log(`The token has been obtained successfully`);
    return response;
  }
  catch (error) {
    console.log(`Error: ${error}`);
    if (typeof error === 'string' && error.includes('Error: unknown account #0')) {
      return new Error('Connect your wallet');
    }
    else {
      return new Error(error);
    }
  }
}