
import { ethers } from "ethers";
import { getContract } from "./getContract";


async function smartContractInteraction(getContract, formValues, smartContractFunction) {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts"
  });

  // TODO: - Contract address must be fetched from a database/backend
  const contractAddress = "0xf104C43C220a9d63Bf5CC6F715B09ad83028C72d";
  const contractABI = require("../../utils/AutoPassport.json").abi;
  const contract = getContract(contractAddress, contractABI);

  const { brand, model, vehicleIdentificationNumber, colorCode } = formValues;
  const walletAddress = accounts[0]?.toString();
  const dateOfManufacture = new Date().toISOString().split("T")[0].toString();
  const uriIpfsUrl = "/";

  const transactionHash = await smartContractFunction(
    contract, walletAddress, brand, model, vehicleIdentificationNumber, colorCode, dateOfManufacture, uriIpfsUrl
  );

  alert(`The token has been created successfully ${transactionHash}`);
}