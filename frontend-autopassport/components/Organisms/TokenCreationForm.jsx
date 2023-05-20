import React, { useState } from 'react';
import {
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

  const handleSubmit = async () => {
    try {
      const jsonData = JSON.stringify(formValues);
      const response = await axios.post('URL_DE_LA_API', jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
        <ImageUploader />
        {FORM_ITEMS.map((item, index) => (
          <FormControl key={index} id={item.id} isRequired>
            <FormLabel>{item.label}</FormLabel>
            <Input
              placeholder={item.placeholder}
              _placeholder={{ color: 'gray.500' }}
              type={item.type}
              onChange={handleInputChange}
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
            onClick={handleSubmit}
          >
            Mint
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}

const FORM_ITEMS = [
  {
    id: 'Brand',
    label: 'Brand',
    placeholder: 'Brand',
    type: 'text',
  },
  {
    id: 'Model',
    label: 'Model',
    placeholder: 'Model',
    type: 'text',
  },
  {
    id: 'vehicleIdentificationNumber',
    label: 'VIN',
    placeholder: '0XXXX00XXXX000000',
    type: 'number',
  },
  {
    id: 'typeOfFuel',
    label: 'Type of fuel',
    placeholder: 'Type of fuel',
    type: 'text',
  },
  {
    id: 'carColorCode',
    label: 'Color code',
    placeholder: 'Color code',
    type: 'text',
  },
  {
    id: 'dateOfManufacture',
    label: 'Date of manufacture',
    placeholder: '',
    type: 'date',
  },
  {
    id: 'warrantyExpirationDate',
    label: 'Warranty expiration date',
    placeholder: '',
    type: 'date',
  },
];
