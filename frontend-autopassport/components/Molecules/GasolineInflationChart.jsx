import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Container, Image, Flex } from '@chakra-ui/react';
import { Chart, registerables } from 'chart.js';
import { handleRequestGasolineInflation } from "@components/services/smart-contract/handleRequestInflation";
import AutoCheckGasInflation from '@components/components/Molecules/AutoCheckGas';
import { handleRequestCarInflation } from '@components/services/smart-contract/handleCarInflation';
Chart.register(...registerables);

export default function GasolineInflationChart(props) {

  const chartRef = useRef(null);
  const [forceUpdate, setForceUpdate] = useState(false);
  const canvasRef = useRef(null);
  const {contract, contractABI} = props;


  const checkGasInflation = async () => {
    try {
      await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      await handleRequestGasolineInflation(contract, contractABI)
      alert('truflation Gasoline Index requested...');
    //   await handleCheckFines(props.contract, props.contractABI)
    } catch (error) {
      const { message } = error;
      console.log(message);
    }
  };
  const checkCarInflation = async () => {
    try {
      await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      await handleRequestCarInflation(contract, contractABI)
      alert('truflation Car Index requested...');
    //   await handleCheckFines(props.contract, props.contractABI)
    } catch (error) {
      const { message } = error;
      console.log(message);
    }
  };

 
  useEffect(() => {
    
    if (!canvasRef.current) {
      const canvas = document.getElementById("myCanvas");
      canvasRef.current = canvas;
    }

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');

    const newChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['start-date:2021-01-01', 'end-date:2023-06-02'],
        datasets: [{
          label: 'Gasoline, other fuels, and motor oil',
          data: [136.5564387722994, 181.72219967745283],
          backgroundColor: 'rgba(0, 123, 255, 0.5)',
        }],
      },
    });
    // req.add("data", '{"interval":"day","start-date":"2021-01-01","end-date":"2023-06-02","location":"us","categories":"true"}');


    setForceUpdate(!forceUpdate);
    chartRef.current = newChartInstance;
  }, []);

  return (
    <>
    <Flex align="center" w="80%">
    <Box p={4} shadow="md" bg="white" w="30rem" h="20rem">
        <canvas id="myCanvas" ref={canvasRef}></canvas>
        
      </Box>
      <Container>
    <Image src={"https://emerald-equivalent-aphid-762.mypinata.cloud/ipfs/QmVJYfNZbtyuqMpZNbwooZDkJiqupW34D4Wsu5AD2zvWRg?_gl=1*u7gysc*rs_ga*OTVlZGJkZmEtZGRlYS00NTE3LWI3NmQtMmM1OGI2OTYzYmNm*rs_ga_5RMPXG14TE*MTY4NjQ0NTUyMC4zMS4xLjE2ODY0NDU1MzguNDIuMC4w"}/>
    <Button onClick={checkGasInflation}>Check Gasoline Inflation</Button>
    <Button onClick={checkCarInflation}>Check Car Purchases Inflation</Button>
    </Container>
    <AutoCheckGasInflation/>
    
    </Flex>
      
    </>
  );
}
