import { updateAutoPassport } from "./updateAutoPassport";
import { getContract } from "./getContract";

export async function handleUpdateToken(data, contractAddress, contractABI) {
  const contract = getContract(contractAddress, contractABI);
  const transactionHash = await updateAutoPassport(contract, data);
  alert(`The token has been updated successfully ${transactionHash}`);
}