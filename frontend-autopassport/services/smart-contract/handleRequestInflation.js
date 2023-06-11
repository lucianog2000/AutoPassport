import { getContract } from "./getContract";

export async function handleRequestGasolineInflation(contractAddress, contractABI) {
  try {
    const contract = getContract(contractAddress, contractABI);
    const gasLimit = 3000000;
    const data = '{"date":"2021-10-05","location":"us","categories":"true"}';
    // const keypath = "categories.Gasoline, other fuels, and motor oil";
    const transaction = await contract.requestGasolineInflation(data, { gasLimit: gasLimit }); 
    const receipt = await transaction.wait();
    const transactionHash = receipt.transactionHash;
    return transactionHash;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}