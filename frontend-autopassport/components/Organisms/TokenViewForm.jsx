import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Box,
  Image,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Spinner,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import { useState, useEffect  } from "react";
import { useRouter } from "next/router";
import getConfig from 'next/config'
import { handleViewToken } from '@components/services/smart-contract/handleViewToken';
import { useForm } from "react-hook-form";
import { handleCheckFines } from '@components/services/smart-contract/handleCheckFines';
import { handleRequestInflation } from '@components/services/smart-contract/handleRequestInflation';
import { handleRefreshInflation } from '@components/services/smart-contract/handleRefreshInflation';

export default function TokenViewForm(){
  const  [tokenMetadata, setTokenMetadata] = useState(null);
  const [spinnerState, setSpinnerState] = useState(false);
  const router = useRouter();
  const env = getConfig().publicRuntimeConfig;
  const contractAddress = env.SMART_CONTRACT_ADDRESS;
  const contractABI = require("../../utils/AutoPassport.json").abi;
  const stackBackgroundColor = useColorModeValue('white', 'gray.700')

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  const parseHexToInt = (hexTokenId) => {
    const hexValue = hexTokenId._hex.startsWith('0x') ? hexTokenId._hex.slice(2) : hexTokenId._hex;
    const parseTokenId = parseInt(hexValue, 16);
    return parseTokenId;
  }

  const fetchIpfs = async (uri) => {
    try {
      const ipfs = await fetch(uri);
      return ipfs.json();
    } catch (error) {
      console.log(error);
    }
  }
  const onSubmit = async (formData) => {
    setTokenMetadata(null);
    try {
      await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      const data = await handleViewToken(formData.vin, contractAddress, contractABI);
      const { uri, tokenId, objCar } = data;
      const { hasFines } = objCar;
      const parseTokenId = parseHexToInt(tokenId);
      const ipfs = await fetchIpfs(uri);
      setSpinnerState(true);
      setTimeout(() => {
        setTokenMetadata({tokenURI: uri, metadata: ipfs, tokenId: parseTokenId, hasFines: hasFines});
      }, 15000);
    } catch (error) {
      const { message } = error;
      console.log(message);
    }
  };

  return (
        <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          flexDirection={'column'}>
          <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            spacing={4}
            w={'full'}
            maxW={'md'}
            bg={stackBackgroundColor}
            rounded={'xl'}
            boxShadow={'lg'}
            p={6}
            my={12}>
              <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                Enter a VIN
              </Heading>
              <Text
                fontSize={{ base: 'sm', sm: 'md' }}
                color={useColorModeValue('gray.800', 'gray.400')}>
                You&apos;ll get a list with all metadata of the AutoPassport
              </Text>
              <FormControl id="tokenId">
                <Input
                  placeholder="VIN"
                  _placeholder={{ color: 'gray.500' }}
                  type="string"
                  minLength={15}
                  {...register("vin", { required: true})}
                />
              </FormControl>
              <Stack spacing={6}>
                <Button
                  type='submit'
                  bg={'pink.400'}
                  color={'white'}
                  w="full"
                  _hover={{
                    bg: 'pink.300',
                  }}
                  >
                  Request AutoPassport
                </Button>
              </Stack>
          </Stack>
          </form>
          {tokenMetadata && <TokenInfo tokenMetadata={tokenMetadata} />}
          {
            (!tokenMetadata && spinnerState) 
              && <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color='blue.500'
                  size='xl'
                />
          }
        </Flex>
  );
}

const TokenInfo = ({ tokenMetadata }) => {
  const {tokenId, metadata, hasFines } = tokenMetadata
  const { name, image, attributes } = metadata;
  const env = getConfig().publicRuntimeConfig;
  const contractAddress = env.SMART_CONTRACT_ADDRESS
  const contractABI = require("../../utils/AutoPassport.json").abi;
  const [CPI, setCPI] = useState("");

  const openSeaLink = `https://testnets.opensea.io/es/assets/mumbai/${contractAddress}/${tokenId}`;

  const checkFines = async () => {
    try {
      await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      await handleCheckFines(attributes.vin, contractAddress, contractABI);
      alert('Fines checked, please click again in request autopassport');
    } catch (error) {
      const { message } = error;
      console.log(message);
    }
  };

  const RenderDataSection = (heading, value) => (
    <Text py="1">
      <Heading 
      fontSize={{ base: 'sm', sm: 'md' }}
      color={useColorModeValue('gray.700', 'gray.400')}
      >
      {heading}:
      </Heading> 
      {value}
    </Text>
  );
  
  const renderHistory = (historyTitle ,arrayHistory) => {
    if (arrayHistory.length === 0) return null;
    return (
      <>
        <Heading
          fontSize={{ base: 'sm', sm: 'md' }}
          color={'gray.700'}
        >
          {historyTitle}:
        </Heading>
        <Accordion allowToggle>
          {arrayHistory.map((item, index) => (
            <AccordionItem key={index}>
              <h2>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left'>
                    {item.description}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Text py="1">
                  <Heading
                    fontSize={{ base: 'sm', sm: 'md' }}
                    color={'gray.700'}
                  >
                    Date:
                  </Heading>
                  {item.date}
                </Text>
                <Text py="1">
                  <Heading
                    fontSize={{ base: 'sm', sm: 'md' }}
                    color={'gray.700'}
                  >
                    Replacement parts:
                  </Heading>
                  {item.replacementParts}
                </Text>
                <Text py="1">
                  <Heading
                    fontSize={{ base: 'sm', sm: 'md' }}
                    color={'gray.700'}
                  >
                    Mileage at the moment:
                  </Heading>
                  {item.mileageAtTheMoment}
                </Text>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </>
    );
  };

  async function requestTruflationData() {
    try {
      await handleRequestInflation(contractAddress, contractABI);
      
    } catch (error) {
      console.log(error);
    }
  }
  async function refreshTruflationData() {
    try {
      const data = await handleRefreshInflation(contractAddress, contractABI);
      const jsonData = JSON.parse(data)
      const roundedNumber = Number(jsonData.yearOverYearInflation.toFixed(2));
      setCPI(roundedNumber);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    refreshTruflationData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return (
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        p={5}
        m={10}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        my={12}
        border={0}
      >
        <Image
          objectFit='cover'
          maxW={760}
          maxH={520}
          src={image}
          alt='Token image'
        />
        <Stack>
          <CardBody p={5}>
            <Heading 
            size='lg'
            color={useColorModeValue('gray.800', 'gray.400')}
            >
              {name} 
              {hasFines && <Badge p={2} ml={5} colorScheme="red" size='lg'>🔉 This car has fines</Badge>}
              {!hasFines && <Badge p={2} ml={5} colorScheme="blue" size='lg'>🔉 This car has not fines</Badge>}
            </Heading>
            {RenderDataSection('Milage', attributes.mileage)}
            {RenderDataSection('Color code', attributes.color_code)}
            {RenderDataSection('Date of manufacture', attributes.date_of_manufacture)}
            {RenderDataSection('Warranty expiration', attributes.warranty_expiration_date)}
            {RenderDataSection('Fuel type', attributes.fuel_type)}
            {renderHistory('Repair history', attributes.repair_history)}
            {renderHistory('Maintenance history', attributes.maintenance_history)}
            {RenderDataSection('Last update', attributes.last_update)}
          </CardBody>
          <CardFooter>
            <Button as={'a'} variant='solid' colorScheme='blue' href={openSeaLink} target="_blank">
              See in OpenSea
            </Button>
            <Button as={'a'} variant='solid' colorScheme='red' mx={2} onClick={() => { checkFines() }}>
              Check if this car has fines
            </Button>
            <Button as={'a'} variant='solid' colorScheme='pink' mx={2} href={'/update-nft-metadata'}>
              Update NFT
            </Button>
          </CardFooter>
          <CardFooter display={'flex'} justifyContent={'center'} flexDirection={'column'}>
            <Stack spacing={3} marginBottom={5}>
              <Alert status='info' borderRadius={'md'}>
                <AlertIcon />
                <p>
                  This is our Devaluation Calculator and we are working on it to<br/>
                  give the possibility to calculate the devaluation of US cars using<br/>       
                  multiple parameters, For example: USA CPI Data, market value, etc.<br/>
                  Comming soon...<br/>  
                </p>
              </Alert>
            </Stack>
            <Button marginBottom={5} width={220} onClick={()=> {alert('Comming soon')}}>
              Open Devaluation calculator
            </Button>
            <StatGroup>
              <Button marginRight={20} onClick={async()=> {requestTruflationData()}}>Request updated data</Button>
              <Stat>
                <StatLabel>USA CPI Data powered by Truflation</StatLabel>
                <StatNumber>{CPI}%</StatNumber>
                {/* <StatHelpText>
                  <StatArrow type='increase' />
                  23.36%
                </StatHelpText>
                <StatHelpText>
                  <StatArrow type='decrease' />
                  23.36%
                </StatHelpText> */}
              </Stat>
              <Button width={5} marginLeft={5} onClick={()=> {refreshTruflationData()}}>
                <RepeatIcon/>
              </Button>
            </StatGroup>
          </CardFooter>
        </Stack>
      </Card>
  )
}

