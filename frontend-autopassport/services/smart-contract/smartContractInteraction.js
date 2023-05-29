export async function smartContractInteraction(getContract, formValues, smartContractFunction, contractAddress, contractABI) {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts"
  });

  const contract = getContract(contractAddress, contractABI);

  const { brand, model, vehicleIdentificationNumber, colorCode, dateOfManufacture, uriIpfsUrl } = formValues;
  const walletAddress = accounts[0]?.toString();
  
  const transactionHash = await smartContractFunction(
    contract, walletAddress, brand, model, vehicleIdentificationNumber, colorCode, dateOfManufacture, uriIpfsUrl
    );
  console.log(`The token has been created successfully ${transactionHash}`);
  alert(`The token has been created successfully ${transactionHash}`);
}