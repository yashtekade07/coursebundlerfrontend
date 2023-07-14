import { Box, Grid, Heading ,Stack,Text, VStack} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Navigate, useParams} from "react-router-dom"
import { getCourseLectures } from '../../redux/actions/course';
import Loader from "../Layout/Loader/Loader"
const CoursePage = ({user}) => {
    const [lectureNumber,setLectureNumber]=useState(0)
    const dispatch=useDispatch();
    const params=useParams();
    useEffect(()=>{
        dispatch(getCourseLectures(params.id));
    },[dispatch,params.id]);

    const {lectures,loading}=useSelector(state=>state.course);
    if(user.role!=='admin'&& (user.subscription===undefined || user.subscription.status!=='active'))
    {
        return <Navigate to={"/subscribe"}/>;
    }

  return (
    loading?(
        <Loader/>
):(
    <Grid minH={"90vh"} templateColumns={['1fr','3fr 1fr']}>
    { lectures.length>0? (<>
     <Box overflowX={'auto'}> 
             <video
                 width={'100%'}    
                 controls controlsList='nodownload'
                 disablePictureInPicture disableRemotePlayback src={lectures[lectureNumber].video.url}>
             </video>
             <Heading m={'3'} children={`#${lectureNumber + 1} ${lectures[lectureNumber].title}`}/>
             <Heading m={'3'} children={'Description'}/>
             <Text  m={'4'} children={lectures[lectureNumber].description}/>
         </Box>
         <VStack>
         { lectures.map((item,index)=>(
              <button key={item._id} style={{
                                              width:"100%",
                                              padding:"1rem", 
                                              textAlign:"center",
                                              margin:"0",
                                              borderBottom:"1px solid rgba(0,0,0,0.2)",
              }} onClick={()=>setLectureNumber(index)}>
                  <Text noOfLines={1}>
                      #{index+1} {item.title}
                  </Text>
              </button>
          ))}
      </VStack>
    </>):(
        <Stack  height='100%' alignItems='center' justifyContent={'center'}>
                    <VStack  width={"full"}  alignItems='center' spacing={'8'}>
                        <Heading  m={'30'} paddingLeft={'30'}children={"Lectures not Found"}/>
                    </VStack>        
        </Stack>        
    )
 }
         
</Grid>
)
  )
}

export default CoursePage