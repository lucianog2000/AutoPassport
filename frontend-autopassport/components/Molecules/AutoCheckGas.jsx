import { useState, useEffect } from 'react';
import { getContract } from "../../services/smart-contract/getContract";

export default function AutoCheckGasInflation() {
  const [gasInflation, setGasInflation] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contract = getContract(contractAddress, contractABI);
        const result = await contract.getGasInflation();
        setGasInflation(result);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <p>Gasoline Inflation: {gasInflation}</p>
    </div>
  );
}
