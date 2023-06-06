import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer
} from '@chakra-ui/react';
import { useState } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import getConfig from 'next/config'
import { handleViewToken } from '@components/services/smart-contract/handleViewToken';

export default function TokenViewForm(){
  const  [vin, setVin] = useState("");
  // const  [tokenMetadata, setTokenMetadata] = useState();
  const router = useRouter();
  const env = getConfig().publicRuntimeConfig;
  const contractAddress = env.SMART_CONTRACT_ADDRESS;
  const contractABI = require("../../utils/AutoPassport.json").abi;
  const stackBackgroundColor = useColorModeValue('white', 'gray.700')
  return (
    <Flex
      minH={'100vh'}
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
            value={vin}
            onChange={(e) => setVin(e.target.value)}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={'pink.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'pink.300',
            }}
            onClick={async() => {
                try {
                  const data = await handleViewToken(vin, contractAddress, contractABI);
                  console.log(data);
                } catch (error) {
                  const { message } = error;
                  console.log(message);
                }
            }}
            >
            Request AutoPassport
          </Button>
        </Stack>
      </Stack>
      {/* {tokenMetadata && (
        <TableContainer 
        bg={stackBackgroundColor} 
        rounded={'xl'}
        boxShadow={'lg'} 
        spacing={4}
        w={'95%'}
        marginBottom={'60px'}>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Field</Th>
              <Th></Th>
              <Th>Value</Th>
            </Tr>
          </Thead>
          {Object.entries(tokenMetadata).map(([key, value]) => (
            <>
              <Tbody>
                <Tr>
                  <Td>{key}</Td>
                  <Td></Td>
                  <Td>{typeof value === 'object' ? JSON.stringify(value) : value}</Td>
                </Tr>
              </Tbody>
            </>
          ))}
        </Table>
      </TableContainer>
      )} */}
    </Flex>
  );
}

// async function getTokenMetadata(tokenId) {
//     const response = await axios.get(`api/tokens/${tokenId}`)
//     response.data.tokenId = tokenId;
//     console.log(response.data);
//     return response.data;
// }

