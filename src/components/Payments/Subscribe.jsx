import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { buySubscription } from '../../redux/actions/user';
import {server} from "../../redux/store"
import toast from "react-hot-toast"
import logo from "../../assets/images/logo.png"
const Subscribe = ({user}) => {
    const dispatch=useDispatch();
    const [key,setKey]=useState('');
    const {loading,error,subscriptionId}=useSelector(state=>state.subscription);
    const {error:courseError}=useSelector(state=>state.course);

    const subscribeHandler=async()=>{
        const {data} = await axios.get(`${server}/razorpaykey`);
        setKey(data.key);
        dispatch(buySubscription())
    }

    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch({type:"clearError"});
        }
        if(courseError){
            toast.error(courseError);
            dispatch({type:"clearError"});
        }
        if(subscriptionId){
            const openPopUp=()=>{
                const options={
                    key,
                    name:"CourseBundler",
                    description:"Get Access to all Premium content",
                    image:logo,
                    subscription_id:subscriptionId,
                    callback_url:`${server}/paymentverification`,
                    prefill:{
                        name:user.name,
                        email:user.email,
                        contact:""
                    },
                    notes:{
                        address:"",
                    },
                    theme:{
                        color:"#FFC*800",
                    }
                };

                const razor=new window.Razorpay(options);
                razor.open();
            }   
            openPopUp();
        }
    },[dispatch,error,user.name,user.email,key,subscriptionId,courseError])
  return <Container h={'90vh'} p={'10'}>
            <Heading children={"Welcome"} my='8' textAlign={'center'}/>
            <VStack boxShadow={'lg'} alignItems={'stretch'} borderRadius={'lg'} spacing={'0'}>
                <Box bg={'yellow.400'} p={'2'} css={{borderRadius:"8px 8px 0px 0px"}}>
                    <Text color={'black'}children={`Premium Pack - ₹299.00`}/>
                </Box>
                <Box p={'2'}>
                    <VStack textAlign={'center'} px={'4'} mt={'2'} spacing={'6'}>
                    <Text children={`By joining the Premium Pack, you 
                                        gain exclusive access to all of our premium content.`}/>
                    <Heading size={'md'} children={"₹299 only"}/>
                    </VStack>
                    <Button isLoading={loading} onClick={subscribeHandler}my={'6'} width={'full'} colorScheme='yellow'>
                        Buy Now
                    </Button>
                </Box>
                <Box bg={'blackAlpha.600'} p={'2'}css={{borderRadius:"0px 0px 8px 8px"}}>
                    <Heading size={'sm'} color={'white'} textTransform={'uppercase'} 
                        children={"100% refund at cancellation"}/>
                    <Text fontSize={'xs'} color={'white'} children={'**Terms & Conditions Apply'}/>
                </Box>
            </VStack>
  </Container>
}

export default Subscribe