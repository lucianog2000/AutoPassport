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
import getConfig from 'next/config'
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';  
import SelectInput from '../Molecules/SelectInput';
import { getAllFuels } from '../../services/firebase/fuelService';
import { handleViewToken } from '../../services/smart-contract/handleViewToken';
import axios from 'axios';
import { pinningMetadataToIPFS } from '@components/services/IPFS/pinningMetadataToIPFS';
import { unpinningFileToIPFS } from '../../services/IPFS/unpinningFileToIPFS';
import { handleUpdateToken } from '@components/services/smart-contract/handleUpdateToken';

export default function TokenUpdateForm(){
  const router = useRouter();
  const env = getConfig().publicRuntimeConfig;
  const contractAddress = env.SMART_CONTRACT_ADDRESS;
  const PINATA_JWT = env.PINATA_JWT;
  const contractABI = require("../../utils/AutoPassport.json").abi;
  // const [fuelTypes, setFuelTypes] = useState([]);
  const { handleSubmit, register, errors } = useForm();

  // useEffect(() => {
  //   const fetchFuelTypes = async () => {
  //     getAllFuels()
  //     .then((fuelTypes) => {
  //       setFuelTypes(fuelTypes.map((doc) => ({ ...doc.data(), id: doc.id })))
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  //   }
  //   fetchFuelTypes();
  // }, []);

  const onSubmit = async (formData) => {
    try {
      // obtenemos los metadatos del auto
      const tokenData = await handleViewToken(vin, contractAddress, contractABI);
      const oldCID = tokenData.uri.split("ipfs/")[1];
      const metadata = await axios.get(tokenData.uri)
      // actualizamos los metadatos del auto
      metadata.data.attributes.last_update = new Date().toISOString().split("T")[0];
      metadata.data.attributes.mileage = parseInt(formData.mileage);
      if (formData.maintenance) {
        metadata.data.attributes.maintenance_history = [{
          "date": new Date().toISOString().split("T")[0],
          "description": formData.maintenance[0].maintenanceDescription,
          "replacementParts": formData.maintenance[0].replacementParts
        }]
      }
      if (formData.repairs) {
        metadata.data.attributes.repair_history = [{
          "date": new Date().toISOString().split("T")[0],
          "description": formData.repairs[0].repairDescription,
          "replacementParts": formData.repairs[0].replacementParts
        }]
      }
      // subirla a pinata y obtener nuevo CID
      const metadataCID = await pinningMetadataToIPFS(metadata.data, PINATA_JWT);
      if (metadataCID) {
        metadata.data.attributes['newURI'] = 'https://gateway.pinata.cloud/ipfs/'+ metadataCID;
      }
      // actualizar el token
      await handleUpdateToken(metadata.data.attributes, contractAddress, contractABI)
      // eliminar la metadata vieja de pinata
      if (oldCID) {
        unpinningFileToIPFS(oldCID, PINATA_JWT);
      }
    } catch (error) {
      const { message } = error;
      console.log(message);
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
          {/* <SelectInput 
            id="typeOfFuel"
            label="Type of fuel"
            placeholder="Type of fuel"
            options={fuelTypes}
            register={register("typeOfFuel", { required: true })}
          /> */}
  
          {FORM_ITEMS.map((item, length) => (
              <FormControl key={length} id={item.id} isRequired={item.isRequired}>
              <FormLabel>{item.label}</FormLabel>
              <Input
                placeholder={item.placeholder}
                _placeholder={{ color: 'gray.500' }}
                type={item.type}
                {...register(item.id, { required: true })}
              />
            </FormControl>
          ))}
  
          <RepairSection register={register}/>
          <MaintenanceSection register={register} />
  
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
    id: 'vin',
    label: 'VIN',
    placeholder: 'VIN',
    isRequired: true,
    type: 'string'
  },
  { 
    id: 'mileage',
    label: 'Mileage',
    placeholder: 'Mileage',
    isRequired: true,
    type: 'number'
  }
];


// TODO: Extract to another file and import it
const RepairSection = ({register}) => {
  const [repairs, setRepairs] = useState([]);
  const ref = useRef(null)

  const handleAddRepair = () => {
    const newRepair = {
      repairDescription: '',
      replacementParts: '',
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
            <FormLabel direction="column" mr={2}>Repair description:</FormLabel>
          </Flex>
          <Flex flex={1}>
            <FormLabel direction="column" mr={2}>Replacement parts:</FormLabel>
          </Flex>
        </Stack>
      )}

      {repairs.map((repair, index) => (
        <Flex key={index} mb={2}>
          <Flex direction='column' m={1}>
            <Input
              placeholder="Repair description"
              name={`repairs[${index}].repairDescription`}
              onChange={(e) => handleInputChange(index, 'repairDescription', e.target.value)}
              {...register(`repairs[${index}].repairDescription`)}
            />
          </Flex>
          <Flex direction='column' m={1}>
            <Input
              placeholder="replacementParts"
              name={`repairs[${index}].replacementParts`}
              onChange={(e) => handleInputChange(index, 'replacementParts', e.target.value)}
              {...register(`repairs[${index}].replacementParts`)}
            />
          </Flex>
        </Flex>
      ))}
    </div>
  );
};

const MaintenanceSection = ({register}) => {
  const [maintenance, setMaintenance] = useState([]);

  const handleAddMaintenance = () => {
    const newMaintenance = {
      maintenanceDescription: '',
      replacementParts: ''
    };
    setMaintenance([...maintenance, newMaintenance]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedMaintenance = [...maintenance];
    updatedMaintenance[index][field] = value;
    setMaintenance(updatedMaintenance);
  };

  return (
    <div>
      <Flex>
        <FormLabel>Add maintenance:</FormLabel>
        <Button size="sm" onClick={handleAddMaintenance}>
          +
        </Button>
      </Flex>

      
      {maintenance.length > 0 && (
        <Stack direction="row">
          <Flex flex={1}>
            <FormLabel direction="column" mr={2}>Maintenance description:</FormLabel>
          </Flex>
          <Flex flex={1}>
            <FormLabel direction="column" mr={2}>Replacement parts:</FormLabel>
          </Flex>
        </Stack>
      )}

      {maintenance.map((maintenance, index) => (
        <Flex key={index} mb={2}>
          <Flex direction='column' m={1}>
            <Input
              placeholder="Maintenance description"
              name={`maintenance[${index}].maintenanceDescription`}
              onChange={(e) => handleInputChange(index, 'maintenanceDescription', e.target.value)}
              {...register(`maintenance[${index}].maintenanceDescription`)}
            />
          </Flex>
          <Flex direction='column' m={1}>
            <Input
              placeholder="replacementParts"
              name={`maintenance[${index}].replacementParts`}
              onChange={(e) => handleInputChange(index, 'replacementParts', e.target.value)}
              {...register(`maintenance[${index}].replacementParts`)}
            />
          </Flex>
        </Flex>
      ))}
    </div>
  );
};