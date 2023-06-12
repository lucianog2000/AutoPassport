import { getContract } from "./getContract";

export async function handleRequestInflation(contractAddress, contractABI) {
  try {
    const contract = getContract(contractAddress, contractABI);
    const transaction = await contract.requestTruflationInflation(); 
    const receipt = await transaction.wait();
    return receipt;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}