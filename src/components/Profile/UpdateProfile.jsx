import { Button, Container, Heading, Input, Text, VStack } from '@chakra-ui/react'
import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';

import { useNavigate } from 'react-router-dom';

const UpdateProfile = ({user}) => {
    const [name,setName]=useState(user.name);
    const [email,setEmail]=useState(user.email);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const submitHandler=async (e)=>{
        e.preventDefault();
        await dispatch(updateProfile(name,email));
        dispatch(loadUser());
        navigate("/profile");
    }
    const {loading}=useSelector(state=>state.profile)
  return <Container py={'12'} minH={'90vh'}>
  <form onSubmit={submitHandler}>
      <Heading children={'Update Profile'} my={'16'} 
          textAlign={['center']} textTransform={'uppercase'}/>
      <VStack  spacing={'4'}  >
        <VStack  alignItems={'flex-start'} w={'full'}>
            <Text children={'Name'} fontWeight={'bold'}/>
            <Input  value={name} onChange={e=>setName(e.target.value)} 
                placeholder='Abc Def' type='text' focusBorderColor='yellow.500'/>
        </VStack>
        <VStack   alignItems={'flex-start'} w={'full'}>
            <Text children={'Email'} fontWeight={'bold'}/>
            <Input  value={email} onChange={e=>setEmail(e.target.value)} 
                    placeholder='abc@gmail.com' type='email' focusBorderColor='yellow.500'/>
        </VStack>
        <Button isLoading={loading} w={'full'} colorScheme='yellow' type='submit'>
            Update 
        </Button>
      </VStack>
  </form>
</Container>
}

export default UpdateProfile