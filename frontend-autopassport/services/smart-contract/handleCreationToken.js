import { createAutoPassport } from "./createAutoPassport";
import { getContract } from "./getContract";

export async function handleCreationToken(formValues, contractAddress, contractABI) {
  //obtenemos una instancia del contrato
  const contract = getContract(contractAddress, contractABI);

  //creamos el token
  const transactionHash = await createAutoPassport(
    contract,
    formValues
    );
  console.log(`The token has been created successfully ${transactionHash}`);
  alert(`The token has been created successfully ${transactionHash}`);
}