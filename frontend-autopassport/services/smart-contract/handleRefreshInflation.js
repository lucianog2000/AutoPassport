import { getContract } from "./getContract";

export async function handleRefreshInflation(contractAddress, contractABI) {
  try {
    const contract = getContract(contractAddress, contractABI);
    const transaction = await contract.truflationInflation();
    return transaction;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}