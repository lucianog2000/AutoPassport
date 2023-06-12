import { createAutoPassport } from "./createAutoPassport";
import { getContract } from "./getContract";

export async function handleCreationToken(formValues, contractAddress, contractABI) {
  const contract = getContract(contractAddress, contractABI);
  const transactionHash = await createAutoPassport(
    contract,
    formValues
  );
  return transactionHash;
}