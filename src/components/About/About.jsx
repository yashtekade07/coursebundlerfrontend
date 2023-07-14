import { Avatar, Box, Button, Container, HStack, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { RiSecurePaymentFill } from 'react-icons/ri';
import termsAndCondition from '../../assets/docs/termsAndCondition'
const Founder=()=>(
    <Stack direction={['column','row']} spacing={['4','12']} padding={'8'}>
            <VStack>
                <Avatar  src={'https://avatars.githubusercontent.com/u/76683544?s=400&u=c335f7432dfbdbf420c290ba54a1ba72d29558dd&v=4'}boxSize={['32','40']}/>
                <Text children={"Co-Founder"} opacity={'0.7'}/>
            </VStack>
            <VStack justifyContent={'center'} alignItems={['center','flex-start']}>
                <Heading children={"Yash Tekade"} size={['md','xl']}/>
                <Text children={`Hi, I am a full-stack deveiloper. 
                We provide a quality content at affordable price`}/>
            </VStack>
    </Stack>
)
const Videoplayer=()=>(
    <Box>
         <video
        autoPlay={true} muted loop
        controls controlsList='nodownload nofullscreen'
        disablePictureInPicture disableRemotePlayback >
        </video>
    </Box>
)
const TandC=({termsandCondition})=>(
    <Box>
        <Heading size={'md'} children={'Terms & Conditions'} textAlign={['center','left']} my={'2'}/>
        <Box h={'sm'} p={'2'} overflowY={'scroll'} css={{'&::-webkit-scrollbar':{display:"none"}}}>
            <Text letterSpacing={'widest'} fontFamily={'heading'} textAlign={['center','left']} >
                    {termsandCondition}
            </Text>
            <Heading m={'2'} size={'xs'} 
                    children={`Refunds are only applicable for cancellations made within a 
                    period of 7 days from the date of purchase.`}/>
        </Box>
    </Box>
)
const About = () => {
  return <Container maxW={"container.lg"} padding={'10'} boxShadow={'lg'}>
            <Heading children={"About US"} textAlign={['center','left']}/>
            <Founder/>
            <Stack m={'8'} direction={['column','row']} alignItems={'center'}>
                <Text fontFamily={'cursive'} m={'4'} textAlign={['center','left']}>
                Coursebundler is an exclusive video streaming platform that offers a curated selection of 
                high-quality, premium courses tailored to meet the needs and expectations of 
                discerning users seeking top-tier educational content.
                </Text>
                <Link to={'/subscribe'}>
                    <Button variant={'ghost'} colorScheme='yellow'> Checkout our Plan</Button>
                </Link>
            </Stack>
            <Videoplayer/>
            <TandC termsandCondition={termsAndCondition}/>
            <HStack my={'2'} padding={'2'}>
                <RiSecurePaymentFill />
                <Heading  size={'xs'} fontFamily={'sans-serif'} 
                    children={'Payment is secured by Razorpay'}/>
            </HStack>
  </Container>
}

export default About
