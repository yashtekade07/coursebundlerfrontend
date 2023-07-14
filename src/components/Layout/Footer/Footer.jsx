import { Box, HStack, Heading, Stack, VStack } from '@chakra-ui/react'
import React from 'react'
import {TiSocialYoutubeCircular,TiSocialInstagramCircular} from 'react-icons/ti'
import {DiGithub} from 'react-icons/di'
const Footer = () => {
  return <Box padding={'4'} bg={'blackAlpha.900'} minH={'10vh'}>
        <Stack direction={['column','row']}>
            <VStack alignItems={['center','flex-start']} width={'full'}>
                <Heading children={'All Rights Reserved'} color='white'/>
                <Heading fontFamily={'cursive'} size={'sm'} 
                        children={'@Deceit'} color='yellow.400'/>
            </VStack>
            <HStack spacing={['2','10']} justifyContent={'center'} color={'white'}>
                <a href='https://www.youtube.com/@deceit4944' target='_blank' rel="noreferrer">
                    <TiSocialYoutubeCircular fontSize={"3rem"}/>
                </a>
                <a href='https://www.instagram.com/yashtekade07/' target='_blank' rel="noreferrer">
                    <TiSocialInstagramCircular fontSize={"3rem"}/>
                </a>
                <a href='https://github.com/yashtekade07' target='_blank' rel="noreferrer">
                    <DiGithub fontSize={"3rem"}/>
                </a>

            </HStack>
        </Stack>
  </Box>
}

export default Footer