import { getContract } from "./getContract";

export async function handleCheckFines(vin, contractAddress, contractABI) {
  try {
    const contract = getContract(contractAddress, contractABI);
    const response = await contract.checkFines(vin);
    return response;
  }
  catch (error) {
    console.log(`Error: ${error}`);
  }
}