import { ethers } from 'ethers';
export function getContract(contractAddress, contractABI) {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    return contract;
  }
  catch (error) {
    console.log(`Error getContract: ${error}`);
  }
}