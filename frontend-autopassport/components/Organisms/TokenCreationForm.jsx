import React, { useState } from 'react';
import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import ImageUploader from '../Molecules/ImageUploader';
import getConfig from 'next/config'
import SelectInput from '../Molecules/SelectInput';
import { pinningImageToIPFS } from '../../services/IPFS/pinningImageToIPFS';
import { pinningMetadataToIPFS } from '../../services/IPFS/pinningMetadataToIPFS';
import { unpinningFileToIPFS } from '../../services/IPFS/unpinningFileToIPFS';
import { handleCreationToken } from '../../services/smart-contract/handleCreationToken';

export default function TokenCreationForm() {
  const [alert, setAlert ] = useState({show: false, message: '', status: '' });
  const router = useRouter();
  const [formValues, setFormValues] = useState({});
  const env = getConfig().publicRuntimeConfig;
  const contractAddress = env.SMART_CONTRACT_ADDRESS;
  const PINATA_JWT = env.PINATA_JWT;
  const contractABI = require("../../utils/AutoPassport.json").abi;
  let imageCID;
  let metadataCID;

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
      image: fileData,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      formValues.last_update = new Date().toISOString().split('T')[0];
      formValues.walletAddress = accounts[0]?.toString();
      imageCID = await pinningImageToIPFS(formValues.image, PINATA_JWT); 
      if (imageCID) {
        formValues['image'] = 'https://gateway.pinata.cloud/ipfs/' + imageCID;
      }
      const { brand, model, image, vehicleIdentificationNumber, colorCode, fuel_type, dateOfManufacture, warrantyExpirationDate, last_update } = formValues;
      const tokenMetadata = {
        "name": `${brand} ${model}`,
        "description": "Your AutoPassport NFT",
        "image": image,
        "attributes": {
          "brand": brand,
          "model": model,
          "vin": vehicleIdentificationNumber,
          "mileage": 0,
          "color_code": colorCode,
          "date_of_manufacture": dateOfManufacture,
          "warranty_expiration_date": warrantyExpirationDate,
          "fuel_type": fuel_type,
          "repair_history": [],
          "maintenance_history": [],
          "last_update": last_update
        }
      }
      metadataCID = await pinningMetadataToIPFS(tokenMetadata, PINATA_JWT)
      if (metadataCID) {
        formValues['uriIpfsUrl'] = 'https://gateway.pinata.cloud/ipfs/'+ metadataCID;
      }
      const transactionHash = await handleCreationToken(formValues, contractAddress, contractABI);
      console.log('trans', transactionHash)
      if (transactionHash) {
        setAlert({show: true, status: 'success', message: 'The token has been created successfully'});
        setTimeout(() => {
          setAlert({show: false, message: '', status: ''});
        }
        , 6000);
        router.push('/');
      }
    } catch (error) {
      const { message } = error;
      console.log(message);
      if (imageCID) {
        unpinningFileToIPFS(imageCID, PINATA_JWT);
      }
      if (metadataCID) {
        unpinningFileToIPFS(metadataCID, PINATA_JWT);
      }
      if (message.includes("execution reverted: Only Manufacturer")) {
        setAlert({show: true, message: "You don't have permission to create a token", status: 'error'});
        setTimeout(() => {
          setAlert({show: false, message: '', status: ''});
        }
        , 500);
      }
      else {
        setAlert({show: true, message: 'Something went wrong', status: 'error'});
        setTimeout(() => {
          setAlert({show: false, message: '', status: ''});
        }
        , 500);
      }
    }
  };

  return (
    <>
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
          {alert.show && (
          <Alert status={alert.status}>
            <AlertIcon />
            {alert.message}
          </Alert>
          )}
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            Create AutoPassport
          </Heading>
          <ImageUploader handleChange={handleFile} />

          <SelectInput
            id="fuel_type" 
            label="Type of fuel" 
            placeholder="Select type of fuel" 
            options={SELECT_FUEL_ITEMS} 
            onChange={handleInputChange} 
          />

          <SelectInput
            id="brand"
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
                {...(item.minLength && { minLength: item.minLength })}
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
    </>
  );
}

// TODO: - Export in another file and import here
//       - SELECT ITEMS must be fetched from a database.
const FORM_ITEMS = [
  // {
  //   id: 'brand',
  //   label: 'Brand',
  //   placeholder: 'Brand',
  //   type: 'text',
  // },
  {
    id: 'model',
    label: 'Model',
    placeholder: 'Model',
    type: 'text'
  },
  {
    id: 'vehicleIdentificationNumber',
    label: 'VIN',
    placeholder: 'VIN',
    type: 'text',
    minLength: '15'
  },
  // {
  //   id: 'typeOfFuel',
  //   label: 'Type of fuel',
  //   placeholder: 'Type of fuel',
  //   type: 'text',
  // },
  {
    id: 'colorCode',
    label: 'Color code',
    placeholder: 'Color code',
    type: 'text'
  },
  {
    id: 'dateOfManufacture',
    label: 'Date of manufacture',
    placeholder: '',
    max: new Date().toISOString().split("T")[0],
    type: 'date',
  },
  {
    id: 'warrantyExpirationDate',
    label: 'Warranty expiration date',
    placeholder: '',
    type: 'date'
  },
];

const SELECT_FUEL_ITEMS = [
  { id: 1, value: 'gasoline', name: 'Gasoline' },
  { id: 2, value: 'diesel', name: 'Diesel' },
  { id: 3, value: 'electric', name: 'Electric' },
  { id: 4, value: 'hybrid', name: 'Hybrid' },
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
  { key: 10, id: "tesla", value: "Tesla", name: "Tesla" },
];
