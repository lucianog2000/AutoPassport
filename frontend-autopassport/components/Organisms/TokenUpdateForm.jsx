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
  
export default function TokenUpdateForm(){
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
          Update AutoPassport
        </Heading>
        <FormControl id="userName">
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
            <FormControl key={length} id={item.id} isRequired={item.isRequired}>
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
            Update
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
const FORM_ITEMS = [
  { 
    id: 'kilometersOrMiles',
    label: 'Kilometers or miles',
    placeholder: 'Kilometers or miles',
    isRequired: true,
    type: 'number'
  },
  { 
    id: 'typeOfFuel',
    label: 'Type of fuel',
    placeholder: 'Type of fuel',
    type: 'text'
  },
  { 
    id: 'carColorCode',
    label: 'Color code',
    placeholder: 'Color code',
    type: 'text'
  },
  { 
    id: 'repairHistory',
    label: 'Repair history',
    placeholder: 'Repair history',
    type: 'text'
  },
  { 
    id: 'maintenanceHistory',
    label: 'Maintenance history',
    placeholder: 'Maintenance history',
    type: 'text'
  }
];