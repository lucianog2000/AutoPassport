import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Avatar,
    Center,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
  
export default function UserProfileEdit(){
  const router = useRouter();
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          Create AutoPassport
        </Heading>
        <FormControl id="userName">
          <FormLabel>Vehicle Image</FormLabel>
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" src="https://cdn-icons-png.flaticon.com/512/27/27003.png"/>
            </Center>
            <Center w="full">
              <Button w="full">Change Image</Button>
            </Center>
          </Stack>
        </FormControl>
        {FORM_ITEMS.map((item, length) => (
            <FormControl key={length} id={item.id} isRequired>
            <FormLabel>{item.label}</FormLabel>
            <Input
              placeholder={item.placeholder}
              _placeholder={{ color: 'gray.500' }}
              type={item.type}
            />
          </FormControl>
        ))}
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            w="full"
            _hover={{
              bg: 'red.500',
              color: 'white'
            }}
            onClick={() => router.push('/')}>
            Cancel
          </Button>
          <Button
            bg={'pink.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'pink.300',
            }}>
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
    type: 'text'
  },
  { 
    id: 'Model',
    label: 'Model',
    placeholder: 'Model',
    type: 'text'
  },
  { 
    id: 'vehicleIdentificationNumber',
    label: 'VIN',
    placeholder: '0XXXX00XXXX000000',
    type: 'number'
  },
  { 
    id: 'carColorCode',
    label: 'Color code',
    placeholder: 'Color code',
    type: 'text'
  },
  { 
    id: 'dateOfManufacture',
    label: 'Date of manufacture',
    placeholder: '',
    type: 'date'
  },
  { 
    id: 'warrantyExpirationDate',
    label: 'Warranty expiration date',
    placeholder: '',
    type: 'date'
  },
  { 
    id: 'warrantyExpirationDate',
    label: 'Warranty expiration date',
    placeholder: '',
    type: 'date'
  }
];