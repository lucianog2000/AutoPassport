import React,{useState} from "react"
import { useForm } from "react-hook-form";
import firebase from "../../config/firebase"
import {
    Input,
    Button,
    Flex,
    Stack,
    Heading,
    useColorModeValue,    
} from "@chakra-ui/react"


// TODO: 
// * Crear un estado global para guardar el ID del documento del usuario con su información
// * Utilizar SelectInput para seleccionar la marca de vehiculo o determinar que marcas se pueden seleccionar

export default function SignUpForm () {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading,setLoading] = useState(false)
    
    const onSubmit = async (data)=>{
        setLoading(true)
        console.log("data",data)
        try{
            const responseUser = await firebase.auth.createUserWithEmailAndPassword(data.email,data.password)
            console.log(responseUser.user.uid)
            if(responseUser.user.uid){
                const document = await firebase.db.collection("users")
                .add({
                    username: data.username,
                    phone_number: data.phone_number,
                    location: data.location,
                    officialBrand:data.officialBrand,
                    userId:responseUser?.user?.uid
                })
                setLoading(false)
                // Guardar en un estado global el usuario para utilizarlo en la creacion/actualizacion de los tokens 
                // ID del documento del usuario con su información
                const DB_USER_DOC_ID = document.id
            }
        }catch(e){
            console.log(e)
            setLoading(false)
        }
    }

    return(
      <form onSubmit={handleSubmit(onSubmit)}>
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
            Create your account
          </Heading>

        <Input
          placeholder='Username'
          _placeholder={{ color: 'gray.500' }}
          {...register("username", { required: true, minLength:3 })}
        />
        <Input
          placeholder='Phone number'
          _placeholder={{ color: 'gray.500' }}
          type='number'
          {...register("phone_number", { required: true, minLength:8 })}
        />
        <Input
          placeholder='Location'
          _placeholder={{ color: 'gray.500' }}
          {...register("location", { required: true })}
        />
        <Input
          placeholder='Official brand'
          _placeholder={{ color: 'gray.500' }}
          {...register("officialBrand", { required: true, minLength:3 })}
        />
        <Input
          placeholder='Email'
          _placeholder={{ color: 'gray.500' }}
          type='email'
          {...register("email", { required: true})}
        />
        <Input
          placeholder='Password'
          _placeholder={{ color: 'gray.500' }}
          type='password'
          {...register("password", { required: true})}
        />
        <Button 
            type='submit' 
            isLoading={loading} 
            colorScheme='pink' variant='solid'
        > 
          Confirm account
        </Button>
        </Stack>
      </Flex>
      </form>
    )
}
