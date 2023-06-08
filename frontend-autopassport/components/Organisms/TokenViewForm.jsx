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
} from '@chakra-ui/react';
import { useState } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import getConfig from 'next/config'
import { handleViewToken } from '@components/services/smart-contract/handleViewToken';
import { useForm } from "react-hook-form";
import TokenUpdate from '@components/pages/update-nft-metadata';

export default function TokenViewForm(){
  const  [tokenMetadata, setTokenMetadata] = useState(null);
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

  const onSubmit = async (formData) => {

    setTokenMetadata(null);

    // TODO: Manejar error ya que handleViewToken devuelve siempre lo mismo, por mas que el token no exista
    // TODO: Manejar error de que no se encuentre el token
    // Revisar que no este harcodeado en el backend
    try {
      const data = await handleViewToken(formData.vin, contractAddress, contractABI);
      const { uri, tokenId } = data;
      const parseTokenId = parseHexToInt(tokenId);
      const ipfs = await axios.get(uri);
      setTokenMetadata({tokenURI: uri, metadata: ipfs.data, tokenId: parseTokenId});
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
                  {...register("vin", { required: true })}
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
        </Flex>
  );
}


const TokenInfo = ({ tokenMetadata }) => {
  const {tokenId, metadata } = tokenMetadata
  const { name, image, attributes } = metadata;

  const openSeaLink = `https://testnets.opensea.io/es/assets/mumbai/${'0x3FbE7826e1931373f355C86dd97873E3670633C0'}/${tokenId}`;
  
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
            <Button as={'a'} variant='solid' colorScheme='pink' mx={2} href={'/update-nft-metadata'}>
              Update NFT
            </Button>
          </CardFooter>
        </Stack>
      </Card>
  )
}

