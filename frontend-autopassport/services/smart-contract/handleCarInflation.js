import { getContract } from "./getContract";

export async function handleRequestCarInflation(contractAddress, contractABI) {
  try {
    const contract = getContract(contractAddress, contractABI);
    const gasLimit = 300000;
    const data = '{"date":"2021-10-05","location":"us","categories":"true"}';
    // const keypath = "categories.Vehicle purchases (net outlay)";
    const transaction = await contract.requestCarPurchasesInflation(data, { gasLimit: gasLimit }); 
    const receipt = await transaction.wait();
    const transactionHash = receipt.transactionHash;
    return transactionHash;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}