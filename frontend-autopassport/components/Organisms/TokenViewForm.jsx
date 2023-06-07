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
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import { useState } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import getConfig from 'next/config'
import { handleViewToken } from '@components/services/smart-contract/handleViewToken';
import { tokenMetadata } from '@components/mocks/tokenMetadata';
import { useForm } from "react-hook-form";

export default function TokenViewForm(){
  const  [tokenMetadata, setTokenMetadata] = useState(null);
  const router = useRouter();
  const env = getConfig().publicRuntimeConfig;
  const contractAddress = env.SMART_CONTRACT_ADDRESS ?? '0xab87df5616a93b29f90d197b0a9ebe6c4fb7c6d4';
  const contractABI = require("../../utils/AutoPassport.json").abi;
  const stackBackgroundColor = useColorModeValue('white', 'gray.700')

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async (formData) => {
    const {vin} = formData;
    try {
      console.log('handleViewToken called')
      const data = await handleViewToken(vin, contractAddress, contractABI);
      const { uri } = data;      
      // Crea un objeto con los datos del token
      fetch(uri)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setTokenMetadata({tokenURI: uri, metadata: data});
      });
    } catch (error) {
      const { message } = error;
      console.log(message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex
          minH={'50vh'}
          align={'center'}
          justify={'center'}
          flexDirection={'column'}>
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
        </Flex>
      </form>
      {tokenMetadata && <TokenInfo tokenMetadata={tokenMetadata} />}
    </>
  );
}


const TokenInfo = ({ tokenMetadata }) => {

  return (
    <Flex align="center" justify="center" flexDirection="column">
      <Box w="80%">
        <Box
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          display="flex"
        >
          <Image
            src={tokenMetadata.metadata.image}
            alt="image-token"
            w="30%"
            h="auto"
            objectFit="cover"
          />
          <Box p="4" bg="green" w="70%">
            <Text fontWeight="bold" fontSize="xl">
              Token name: {tokenMetadata.metadata.name}
            </Text>
            <Text fontSize="md">Brand: {tokenMetadata.metadata.attributes.brand}</Text>
            <Text fontSize="md">Model: {tokenMetadata.metadata.attributes.model}</Text>
            <Box>
              <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
                Repair history
              </Heading>
              <UnorderedList display="flex" flexDirection="column">
                {tokenMetadata.metadata.attributes.repair_history.map((repair, index) => (
                  <ListItem key={index}>
                    Date: <Text>{repair.date}</Text>
                    Description: <Text>{repair.description}</Text>
                    Replacement Parts: <Text>{repair.replacementParts}</Text>
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>
          </Box>
        </Box>
      </Box>
    </Flex>

    // <TableContainer>
    //   <Table variant="striped" colorScheme="teal">
    //     <Thead>
    //       <Tr>
    //         <Th>Token name:</Th>
    //         <Th>Image</Th>
    //         <Th>Brand</Th>
    //         <Th>Model</Th>
    //       </Tr>
    //     </Thead>
    //     <Tbody>
    //       <Tr>
    //         <Td>{tokenMetadata.metadata.name}</Td>
    //         <Td><img src={tokenMetadata.metadata.image} width={500} alt='img-token' ></img></Td>
    //         <Td>{tokenMetadata.metadata.attributes.brand}</Td>
    //         <Td>{tokenMetadata.metadata.attributes.model}</Td>
    //       </Tr>
    //     </Tbody>
    //     <Tbody>
    //       {tokenMetadata.metadata.attributes.repair_history.map((repair, index) => (
    //         <Tr key={index}>
    //           <Td>{repair.date}</Td>
    //           <Td>{repair.description}</Td>
    //           <Td>{repair.cost}</Td>
    //         </Tr>
    //       ))}
    //     </Tbody>
    //   </Table>
    // </TableContainer>
  )
}


// async function getTokenMetadata(tokenId) {
//     const response = await axios.get(`api/tokens/${tokenId}`)
//     response.data.tokenId = tokenId;
//     console.log(response.data);
//     return response.data;
// }

