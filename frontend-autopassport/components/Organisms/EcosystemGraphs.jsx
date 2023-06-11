import { Heading, Flex, Text, Button } from "@chakra-ui/react";
import getConfig from "next/config";
import { useEffect, useState } from "react";
import GasolineInflationChart from "../Molecules/GasolineInflationChart";

export default function EcosystemViews() {
  const env = getConfig().publicRuntimeConfig;
  const address = env.SMART_CONTRACT_ADDRESS;

  const [contractAddress, setContractAddress] = useState("");
  const [holders, setHolders] = useState([]);
  const [abi, setAbi] = useState(0);

  useEffect(() => {
    const contractABI = require("../../utils/AutoPassport.json").abi;
    setContractAddress(address);
    const contractHolders = contractABI.holders;
    setHolders(contractHolders);
    console.log(address);
    setAbi(contractABI);
  }, []);

  return (
    <>
      <Flex direction="column" align="center">
        <Heading>AutoPassport Ecosystem Graphs</Heading>
        <Text>Contract in Mumbai Network: {contractAddress}</Text>
        <Text>Autopassport Holders: {holders}</Text>
        <Text>Gas Inflation:</Text>
        <Text></Text>
        <GasolineInflationChart contract={contractAddress} contractABI={abi} />
      </Flex>
    </>
  );
}
