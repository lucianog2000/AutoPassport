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
import { handleViewToken } from '../../services/smart-contract/handleViewToken';
import axios from 'axios';
import { pinningMetadataToIPFS } from '@components/services/IPFS/pinningMetadataToIPFS';
import { unpinningFileToIPFS } from '../../services/IPFS/unpinningFileToIPFS';
import { handleUpdateToken } from '@components/services/smart-contract/handleUpdateToken';
import SelectInput from '../Molecules/SelectInput';
import { getAllFuels } from '../../services/firebase/fuelService';

export default function TokenUpdateForm(){
  const router = useRouter();
  const env = getConfig().publicRuntimeConfig;
  const contractAddress = env.SMART_CONTRACT_ADDRESS;
  const PINATA_JWT = env.PINATA_JWT;
  const contractABI = require("../../utils/AutoPassport.json").abi;
  const { handleSubmit, register, errors } = useForm();
  // const [fuelTypes, setFuelTypes] = useState([]);

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
    let newRepair;
    let newMaintenance;
    const getJsonFormatted = (repairOrMaintenance, mileage) => {
      const { description, replacementParts } = repairOrMaintenance;
      return {
        date: new Date().toISOString().split("T")[0],
        description: description,
        replacementParts: replacementParts,
        mileageAtTheMoment: mileage
      };
    };
    try {
      // obtenemos los metadatos del auto
      const tokenData = await handleViewToken(formData.vin, contractAddress, contractABI);
      const oldMetadataCID = tokenData.uri.split("ipfs/")[1];
      const ipfsResponse = await axios.get(tokenData.uri)
      const newMetadata = ipfsResponse.data;
      // actualizamos los metadatos del auto
      newMetadata.attributes.last_update = new Date().toISOString().split("T")[0];
      //parseInt temporal ya se el form esta levantando el dato como string
      newMetadata.attributes.mileage = parseInt(formData.mileage);
      setRepairData(newMetadata);
      setMaintenanceData(newMetadata);
      // subirla a pinata y obtener nuevo CID
      const newMetadataCID = await pinningMetadataToIPFS(newMetadata, PINATA_JWT);
      if (newMetadataCID) {
        newMetadata.attributes.newURI = 'https://gateway.pinata.cloud/ipfs/'+ newMetadataCID;
        newMetadata.attributes.newRepair = newRepair;
        newMetadata.attributes.newMaintenance = newMaintenance;
      }
      // actualizar el token
      await handleUpdateToken(newMetadata.attributes, contractAddress, contractABI);
      // eliminar la metadata vieja de pinata
      if (oldMetadataCID) {
        unpinningFileToIPFS(oldMetadataCID, PINATA_JWT);
      }
    } catch (error) {
      const { message } = error;
      console.log(message);
    }

    function setMaintenanceData(newMetadata) {
      if (formData.maintenance) {
        const maintenance = formData.maintenance[0];
        newMaintenance = getJsonFormatted(maintenance, newMetadata.attributes.mileage);
        newMetadata.attributes.maintenance_history.push(newMaintenance);
      }
    }

    function setRepairData(newMetadata) {
      if (formData.repairs) {
        const repair = formData.repairs[0];
        newRepair = getJsonFormatted(repair, newMetadata.attributes.mileage);
        newMetadata.attributes.repair_history.push(newRepair);
      }
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
      description: '',
      replacementParts: '',
    };
    setRepairs([...repairs, newRepair]);
    alert("Por el momento solo podemos procesar una sola reparación por update")
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
              name={`repairs[${index}].description`}
              onChange={(e) => handleInputChange(index, 'description', e.target.value)}
              {...register(`repairs[${index}].description`)}
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
      description: '',
      replacementParts: ''
    };
    setMaintenance([...maintenance, newMaintenance]);
    alert("Por el momento solo podemos procesar un solo mantenimiento por update")
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
              name={`maintenance[${index}].description`}
              onChange={(e) => handleInputChange(index, 'description', e.target.value)}
              {...register(`maintenance[${index}].description`)}
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