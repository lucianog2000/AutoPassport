import { updateAutoPassport  } from "./updateAutoPassport";
import { getContract } from "./getContract";

export async function handleUpdateToken(data, contractAddress, contractABI) {
  //obtenemos una instacia del contrato
  const contract = getContract(contractAddress, contractABI);

  const transactionHash = await updateAutoPassport(contract, data);
  console.log(`The token has been updated successfully ${transactionHash}`);
  alert(`The token has been updated successfully ${transactionHash}`);
}