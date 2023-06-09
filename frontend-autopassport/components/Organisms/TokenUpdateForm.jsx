import React,{ useState, useRef } from 'react';
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
import getConfig from 'next/config'
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';  
import { handleViewToken } from '../../services/smart-contract/handleViewToken';
import { pinningMetadataToIPFS } from '@components/services/IPFS/pinningMetadataToIPFS';
import { unpinningFileToIPFS } from '../../services/IPFS/unpinningFileToIPFS';
import { handleUpdateToken } from '@components/services/smart-contract/handleUpdateToken';

export default function TokenUpdateForm(){
  const [alert, setAlert ] = useState({show: false, message: '', status: ''});
  const router = useRouter();
  const env = getConfig().publicRuntimeConfig;
  const contractAddress = env.SMART_CONTRACT_ADDRESS;
  const PINATA_JWT = env.PINATA_JWT;
  const contractABI = require("../../utils/AutoPassport.json").abi;
  const { handleSubmit, register, errors } = useForm();

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

    const fetchIpfs = async (uri) => {
      try {
        const ipfs = await fetch(uri);
        return ipfs.json();
      } catch (error) {
        console.log(error);
      }
    }
    try {
      await window.ethereum.request({
        method: "eth_requestAccounts"
      });

      const tokenData = await handleViewToken(formData.vin, contractAddress, contractABI);
      const oldMetadataCID = tokenData.uri.split("ipfs/")[1];
      const ipfs = await fetchIpfs(tokenData.uri);
      const newMetadata = ipfs;

      newMetadata.attributes.last_update = new Date().toISOString().split("T")[0];
      newMetadata.attributes.mileage = formData.mileage;

      setRepairData(newMetadata);
      setMaintenanceData(newMetadata);

      const newMetadataCID = await pinningMetadataToIPFS(newMetadata, PINATA_JWT);
      if (newMetadataCID) {
        newMetadata.attributes.newURI = 'https://gateway.pinata.cloud/ipfs/'+ newMetadataCID;
        newMetadata.attributes.newRepair = newRepair;
        newMetadata.attributes.newMaintenance = newMaintenance;
      }
     
      const transactionHash = await handleUpdateToken(newMetadata.attributes, contractAddress, contractABI);
      if (oldMetadataCID) {
        unpinningFileToIPFS(oldMetadataCID, PINATA_JWT);
      }
      if (transactionHash) {
        setAlert({show: true, message: 'The token has been updated successfully', status: 'success'});
        setTimeout(() => {
          setAlert({show: false, message: '', status: ''});
        }
        , 5000);
      }
    } catch (error) {
      const { message } = error;
      if (message.includes("execution reverted: Only Workshop")) {
        setAlert({show: true, message: "You don't have permission to update a token", status: 'error'});
        setTimeout(() => {
          setAlert({show: false, message: '', status: ''});
        }
        , 5000);
      }
      else {
        setAlert({show: true, message: 'Something went wrong', status: 'error'});
        setTimeout(() => {
          setAlert({show: false, message: '', status: ''});
        }
        , 5000);
      }
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
          {alert.show && (
          <Alert status={alert.status}>
            <AlertIcon />
            {alert.message}
          </Alert>
         )}
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            Update AutoPassport
          </Heading>
          
          {FORM_ITEMS.map((item, length) => (
              <FormControl key={length} id={item.id} isRequired={item.isRequired}>
              <FormLabel>{item.label}</FormLabel>
              <Input
                placeholder={item.placeholder}
                _placeholder={{ color: 'gray.500' }}
                type={item.type}
                minLength={item.minLength}
                {...register(item.id, { required: true, valueAsNumber: item.type === 'number' })}
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
    type: 'string',
    minLength: '15'
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
  const [isHidden, setIsHidden] = useState(false)

  const handleAddRepair = () => {

    if (repairs.length > 0) {
      alert("At the moment we can only process one repair per update")
      setIsHidden(true)
      return;
    }
    const newRepair = {
      description: '',
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
        <Button size="sm" onClick={handleAddRepair} hidden={isHidden}>
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
  const [isHidden, setIsHidden] = useState(false)

  const handleAddMaintenance = () => {
    if (maintenance.length > 0) {
      setIsHidden(true)
      alert("At the moment we can only process one maintenance per update")
      return;
    }
    const newMaintenance = {
      description: '',
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
        <Button size="sm" onClick={handleAddMaintenance} hidden={isHidden}>
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