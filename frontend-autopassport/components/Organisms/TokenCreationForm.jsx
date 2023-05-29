import React, { useState } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import ImageUploader from '../Molecules/ImageUploader';
import SelectInput from '../Molecules/SelectInput';
import axios from 'axios';
<<<<<<< Updated upstream
=======
// import { pinningFileToIPFS } from '../../services/pinningFileToIPFS';
// import { getContract } from '../../services/getContract';
// import { createAutoPassport } from '../../services/createAutoPassport';

>>>>>>> Stashed changes
export default function TokenCreationForm() {
  const router = useRouter();
  const [formValues, setFormValues] = useState({});

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleFile = async (fileData) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      file: fileData,
    }));
  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    const fileIPFS = pinningFileToIPFS(formValues); 

    if (!fileIPFS) {
      alert('Error to load file to IPFS. Try later or contact with support');
      return;
    }
    
    formValues['file'] = fileIPFS;

    try {
      const jsonData = JSON.stringify(formValues);
      console.log(jsonData)
      // TODO: Add the correct URL for the backend API
      const response = await axios.post('http://localhost:5000/api/create/', jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      const { message } = error;
      alert(`Error to create AutoPassport: ${message}. Try later or contact with support`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex minH={'100vh'} align={'center'} justify={'center'}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            Create AutoPassport
          </Heading>
          <ImageUploader handleChange={handleFile} />

          <SelectInput
            id="typeOfFuel" 
            label="Type of fuel" 
            placeholder="Select type of fuel" 
            options={SELECT_FUEL_ITEMS} 
            onChange={handleInputChange} 
          />

          <SelectInput
            id="Brand"
            label="Brand"
            placeholder="Select brand"
            options={SELECT_BRAND_ITEMS}
            onChange={handleInputChange}
          />

          {FORM_ITEMS.map((item, index) => (
            <FormControl key={index} id={item.id} isRequired>
              <FormLabel>{item.label}</FormLabel>
              <Input
                placeholder={item.placeholder}
                _placeholder={{ color: 'gray.500' }}
                type={item.type}
                onChange={handleInputChange}
                {...(item.maxLength && { maxLength: item.maxLength })}
                {...(item.max && { max: item.max })}
                {...(item.defaultValue && { defaultValue: item.defaultValue })}
              />
            </FormControl>
          ))}

          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              w="full"
              _hover={{
                bg: 'red.500',
                color: 'white',
              }}
              onClick={() => router.push('/')}
            >
              Cancel
            </Button>
            <Button
              bg={'pink.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'pink.300',
              }}
              type='submit'
            >
              Mint
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
}

<<<<<<< Updated upstream

=======

const pinningFileToIPFS = async (formValues) => {
  const JWT = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1NzE1YmE3OS1lNmY3LTRiZDgtOTUyZi02YTliMTI3ZDEzOTQiLCJlbWFpbCI6ImZyYW5jb3JvYi5nYXJjaWFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImVjZDJlYzNmYWM2MTcxNmU5OTEyIiwic2NvcGVkS2V5U2VjcmV0IjoiNjY0MGIzYzA3NzYwZTllMjMwOWEwZDVhZTAwMmRjMzYxYWFmZDM3NmM5Mjk0MDcyMWRkODA2ODBhNzFjOTNlYyIsImlhdCI6MTY4NTE1MzMxNn0.46qZ9W_SMH1D6rN084BG4LbhrfjCfosJK86He4p4fl8'

  const formData = new FormData();
  formData.append('file', formValues.file);
  const metadata = JSON.stringify({
    name: 'AutoPassport',
  });
  formData.append('pinataMetadata', metadata);
  const options = JSON.stringify({
    cidVersion: 0,
  })
  formData.append('pinataOptions', options);

  let ipfsHash;
  try {
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS/", formData, {
      maxBodyLength: "Infinity",
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        Authorization: JWT
      }
    });
    console.log('IPFS File load succesfully');
    const pinataUrl = 'https://gateway.pinata.cloud/ipfs/'
    ipfsHash = pinataUrl + res.data.IpfsHash;
  } catch (error) {
    console.log('Error fetching IPFS file: ', error);
  }
  return ipfsHash;
}

function getContract(contractAddress, contractABI) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  return contract;
}

async function createAutoPassport(contract, walletAddress, brand, model, vehicleIdentificationNumber, colorCode, dateOfManufacture, uriIpfsUrl) {
  const transaction = await contract.createAutoPassport(
    walletAddress, brand, model, vehicleIdentificationNumber, colorCode, dateOfManufacture, uriIpfsUrl
  );
  const receipt = await transaction.wait();
  const transactionHash = receipt.transactionHash;
  return transactionHash;
}

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


>>>>>>> Stashed changes
// TODO: - Export in another file and import here
//       - SELECT ITEMS must be fetched from a database.
const FORM_ITEMS = [
  // {
<<<<<<< Updated upstream
  //   id: 'Brand',
=======
  //   id: 'brand',
>>>>>>> Stashed changes
  //   label: 'Brand',
  //   placeholder: 'Brand',
  //   type: 'text',
  // },
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
  {
    id: 'model',
    label: 'Model',
    placeholder: 'Model',
    type: 'text',
  },
  {
    id: 'vehicleIdentificationNumber',
    label: 'VIN',
    placeholder: '0XXXX00XXXX000000',
    type: 'text',
    maxLength: 17,
  },
  // {
  //   id: 'typeOfFuel',
  //   label: 'Type of fuel',
  //   placeholder: 'Type of fuel',
  //   type: 'text',
  // },
  {
<<<<<<< Updated upstream
    id: 'carColorCode',
=======
    id: 'colorCode',
>>>>>>> Stashed changes
    label: 'Color code',
    placeholder: 'Color code',
    type: 'text',
    maxLength: 4,
  },
  {
    id: 'dateOfManufacture',
    label: 'Date of manufacture',
    placeholder: '',
    defaultValue: new Date().toISOString().split("T")[0],
    max: new Date().toISOString().split("T")[0],
    type: 'date',
  },
  {
    id: 'warrantyExpirationDate',
    label: 'Warranty expiration date',
    placeholder: '',
    type: 'date',
    max: new Date().toISOString().split("T")[0],
  },
];

const SELECT_FUEL_ITEMS = [
  { id: 1, value: 'diesel', name: 'Diesel' },
  { id: 2, value: 'petrol', name: 'Petrol' },
  { id: 3, value: 'electric', name: 'Electric' },
  { id: 4, value: 'biodiesel', name: 'Bio-Diesel'},
];

const SELECT_BRAND_ITEMS = [
  { key: 1, id: "audi", value: "Audi", name: "Audi" },
  { key: 2, id: "bmw", value: "BMW", name: "BMW"},
  { key: 3, id: "chevrolet", value: "Chevrolet", name: "Chevrolet" },
  { key: 4, id: "ford", value: "Ford", name: "Ford" },
  { key: 5, id: "honda", value: "Honda", name: "Honda" },
  { key: 6, id: "mercedes", value: "Mercedes-Benz", name: "Mercedes-Benz" },
  { key: 7, id: "nissan", value: "Nissan", name: "Nissan" },
  { key: 8, id: "toyota", value: "Toyota", name: "Toyota" },
  { key: 9, id: "volkswagen", value: "Volkswagen", name: "Volkswagen" },
];