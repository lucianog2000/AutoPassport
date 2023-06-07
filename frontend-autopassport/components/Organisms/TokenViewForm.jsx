import {
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
import { tokenMetadata } from '@components/mocks/tokenMetadata';
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
    const {vin} = formData;

    // TODO: Manejar error ya que handleViewToken devuelve siempre lo mismo, por mas que el token no exista
    // TODO: Manejar error de que no se encuentre el token
    // Revisar que no este harcodeado en el backend
    try {
      const data = await handleViewToken(vin, contractAddress, contractABI);
      const { uri, tokenId } = data;
      const parseTokenId = parseHexToInt(tokenId);
      fetch(uri)
      .then(response => response.json())
      .then(data => {
        setTokenMetadata({tokenURI: uri, metadata: data, tokenId: parseTokenId});
      });
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

  const openSeaLink = `https://testnets.opensea.io/es/assets/mumbai/0xab87df5616a93b29f90d197b0a9ebe6c4fb7c6d4/${tokenId}`;
  return (
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        p={5}
        m={10}
      >
        <Image
          objectFit='cover'
          maxW={{ base: '100%', sm: '60%' }}
          src={image}
          alt='Token image'
        />
        <Stack>
          <CardBody p={5}>
            <Heading size='md'>{name}</Heading>
            <Text py={1}>
              <Heading size='sm'>Date of manufacture:</Heading> {attributes.date_of_manufacture} 
            </Text>
            <Text py='1'>
              <Heading size='sm'>Milage:</Heading> {attributes.mileage} 
            </Text>
            <Text py='1'>
              <Heading size='sm'>Warranty expiration:</Heading> {attributes.warranty_expiration_date} 
            </Text>
            <Text py='1'>
              <Heading size='sm'>Color:</Heading> {attributes.color_code} <Input type='color' readOnly value={'#E4E7EB'} ></Input>
            </Text>
          </CardBody>

          <CardFooter>
            <Button as={'a'} variant='solid' colorScheme='blue' mx={2} href={openSeaLink} target="_blank">
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


// async function getTokenMetadata(tokenId) {
//     const response = await axios.get(`api/tokens/${tokenId}`)
//     response.data.tokenId = tokenId;
//     console.log(response.data);
//     return response.data;
// }

