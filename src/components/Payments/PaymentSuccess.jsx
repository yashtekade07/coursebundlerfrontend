import { Box, Container, Heading, VStack,Text, Button } from '@chakra-ui/react'
import React from 'react'
import { RiCheckboxCircleFill } from 'react-icons/ri'
import { Link ,useSearchParams} from 'react-router-dom'

const PaymentSuccess = () => {
    const  search=useSearchParams()[0].get('reference');
    console.log(search)
  return <Container h={'90vh'} p={'10'}>
            <Heading  my={'6'} textAlign={'center'} children={'You have a Premium Pack'}/>
            <VStack boxShadow={'lg'} pb={'7'} alignItems={'center'}borderRadius={'lg'}>
                <Box w={'full'} bg={'yellow.400'} p={'2'} css={{borderRadius:"8px 8px 0 0"}}>
                    <Text> Payment Success</Text>
                </Box>
                <Box p={'2'}>
                    <VStack textAlign={'center'} px={'6'} mt={'2'} spacing={'6'}>
                        <Text fontSize={'0.75rem'}>
                            Congratulations on becoming a Premium Member! As a valued member, 
                            you now have unrestricted access to our premium content, 
                            allowing you to enjoy our exclusive features and benefits.
                        </Text>
                        <Heading size={'3xl'}>
                            <RiCheckboxCircleFill/>
                        </Heading>
                    </VStack>
                </Box>
                <Link to={'/profile'}>
                    <Button variant={'ghost'}> Go to Profile</Button>
                </Link>
                <Heading size={'xs'}>Reference : {search}</Heading>
            </VStack>
  </Container>
}

export default PaymentSuccess