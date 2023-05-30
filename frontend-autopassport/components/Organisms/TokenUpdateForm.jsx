import React,{useEffect, useState, useRef } from 'react';
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
import { useForm } from 'react-hook-form';  
import SelectInput from '../Molecules/SelectInput';
import { getAllFuels } from '../../services/firebase/fuelService';
import { updatingMetadataToIPFS } from '../../services/IPFS/updatingMetadataToIPFS';

export default function TokenUpdateForm(){
  const router = useRouter();

  const [fuelTypes, setFuelTypes] = useState([]);
  const { handleSubmit, register, errors } = useForm();

  useEffect(() => {
    const fetchFuelTypes = async () => {
      getAllFuels()
      .then((fuelTypes) => {
        setFuelTypes(fuelTypes.map((doc) => ({ ...doc.data(), id: doc.id })))
      })
      .catch((error) => {
        console.log(error)
      })
    }
    fetchFuelTypes();
  }, []);

  const onSubmit = async (formData) => {
    console.log('data submitted: ', formData)
    try {
      const metadataCID = 'QmYho9sTYU7kyFiQRwboG5LjQGxudhwwb9gAqAMY373XVB'
      const dataToUpdate = formData
      const PINATA_JWT = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1NzE1YmE3OS1lNmY3LTRiZDgtOTUyZi02YTliMTI3ZDEzOTQiLCJlbWFpbCI6ImZyYW5jb3JvYi5nYXJjaWFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImVjZDJlYzNmYWM2MTcxNmU5OTEyIiwic2NvcGVkS2V5U2VjcmV0IjoiNjY0MGIzYzA3NzYwZTllMjMwOWEwZDVhZTAwMmRjMzYxYWFmZDM3NmM5Mjk0MDcyMWRkODA2ODBhNzFjOTNlYyIsImlhdCI6MTY4NTE1MzMxNn0.46qZ9W_SMH1D6rN084BG4LbhrfjCfosJK86He4p4fl8'
      // TODO: Fix bugs with updating metadata to IPFS
      // response is 200 but metadata is not updated
      const response = await updatingMetadataToIPFS(metadataCID, dataToUpdate, PINATA_JWT)
    }
    catch(error) {
      console.log('error: ', error)
    }
  }
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <SelectInput 
            id="typeOfFuel"
            label="Type of fuel"
            placeholder="Type of fuel"
            options={fuelTypes}
            register={register("typeOfFuel", { required: true })}
          />
  
          {FORM_ITEMS.map((item, length) => (
              <FormControl key={length} id={item.id} isRequired={item.isRequired}>
              <FormLabel>{item.label}</FormLabel>
              <Input
                placeholder={item.placeholder}
                _placeholder={{ color: 'gray.500' }}
                type={item.type}
                {...register(item.label, { required: true })}
              />
            </FormControl>
          ))}
  
          <RepairSection register={register}/>
          {/* <MantenanceSection register={register} /> */}
  
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
              type='submit'
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
      </form>
    );
  }

  const FORM_ITEMS = [
  { 
    id: 'mileage',
    label: 'Mileage',
    placeholder: 'Mileage',
    isRequired: true,
    type: 'number'
  },
  // { 
  //   id: 'typeOfFuel',
  //   label: 'Type of fuel',
  //   placeholder: 'Type of fuel',
  //   type: 'text'
  // },
  // { 
  //   id: 'carColorCode',
  //   label: 'Color code',
  //   placeholder: 'Color code',
  //   type: 'text'
  // },
  // { 
  //   id: 'repairHistory',
  //   label: 'Repair history',
  //   placeholder: 'Repair history',
  //   type: 'text'
  // },
  // { 
  //   id: 'maintenanceHistory',
  //   label: 'Maintenance history',
  //   placeholder: 'Maintenance history',
  //   type: 'text'
  // }
];


// TODO: Extract to another file and import it
const RepairSection = ({register}) => {
  const [repairs, setRepairs] = useState([]);
  const ref = useRef(null)

  const handleAddRepair = () => {
    const newRepair = {
      repairType: '',
      parts: '',
      comment: '',
    };
    setRepairs([...repairs, newRepair]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRepairs = [...repairs];
    updatedRepairs[index][field] = value;
    setRepairs(updatedRepairs);
  };

  return (
    <div>
      <Flex>
        <FormLabel>Add repair:</FormLabel>
        <Button size="sm" onClick={handleAddRepair}>
          +
        </Button>
      </Flex>

      {repairs.length > 0 && (
        <Stack direction="row">
          <Flex flex={1}>
            <FormLabel direction="column" mr={2}>Repair type:</FormLabel>
          </Flex>
          <Flex flex={1}>
            <FormLabel direction="column" mr={2}>Parts:</FormLabel>
          </Flex>
        </Stack>
      )}

      {repairs.map((repair, index) => (
        <Flex key={index} mb={2}>
          <Flex direction='column' m={1}>
            <Input
              placeholder="repair type"
              name={`repairs[${index}].repairType`}
              onChange={(e) => handleInputChange(index, 'repairType', e.target.value)}
              {...register(`repairs[${index}].repairType`)}
            />
          </Flex>
          <Flex direction='column' m={1}>
            <Input
              placeholder="parts"
              name={`repairs[${index}].parts`}
              onChange={(e) => handleInputChange(index, 'parts', e.target.value)}
              {...register(`repairs[${index}].parts`)}
            />
          </Flex>
        </Flex>
      ))}
    </div>
  );
};

const MantenanceSection = ({register}) => {
  const [mantenances, setMantenances] = useState([]);

  const handleAddRepair = () => {
    const newMantenance = {
      mantenanceType: '',
      parts: '',
      comment: '',
    };
    setMantenances([...mantenances, newMantenance]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedMantenances = [...mantenances];
    updatedMantenances[index][field] = value;
    setRepairs(updatedMantenances);
  };

  return (
    <div>
      <Flex>
        <FormLabel>Add Mantenance:</FormLabel>
        <Button size="sm" onClick={handleAddRepair}>
          add
        </Button>
      </Flex>

      
      {mantenances.length > 0 && (
        <Stack direction="row">
          <Flex flex={1}>
            <FormLabel direction="column" mr={2}>Mantenance type:</FormLabel>
          </Flex>
          <Flex flex={1}>
            <FormLabel direction="column" mr={2}>Parts:</FormLabel>
          </Flex>
        </Stack>
      )}

      {mantenances.map((mantenance, index) => (
        <Flex key={index} mb={2}>
          <Flex direction='column' m={1}>
            <Input
              placeholder="Mantenance type"
              name={`mantenance[${index}].mantenanceType`}
              value={mantenance.repairType}
              onChange={(e) => handleInputChange(index, 'mantenanceType', e.target.value)}
              ref={register(`mantenance[${index}].mantenanceType`)}
            />
          </Flex>

          <Flex direction='column' m={1}>
            <Input
              placeholder="parts"
              value={mantenance.parts}
              name={`mantenance[${index}].parts`}
              onChange={(e) => handleInputChange(index, 'parts', e.target.value)}
              ref={register(`mantenance[${index}].parts`)}
            />
          </Flex>
        </Flex>
      ))}
    </div>
  );
};