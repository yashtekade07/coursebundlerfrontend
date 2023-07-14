import { Box, Button, Grid, HStack, Heading, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr,Image, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState }  from 'react'
import Sidebar from '../../Sidebar'
import cursor from "../../../../assets/images/mouse-cursor.png"
import { RiDeleteBin7Fill } from 'react-icons/ri'
import CourseModal from './CourseModal'
import {useSelector } from 'react-redux'
import {getAllCourses, getCourseLectures} from "../../../../redux/actions/course"
import { useDispatch } from 'react-redux'
import {deleteCourse, deleteLecture}from "../../../../redux/actions/admin"
import toast from "react-hot-toast"
const AdminCourses = () => {
  const dispatch=useDispatch();
  const keyword="";
useEffect(()=>{
  
  dispatch(getAllCourses({keyword}));
},[dispatch])

  const {courses,lectures} =useSelector(state=>state.course);
  const {loading,error,message} =useSelector(state=>state.admin);
  
  const {isOpen,onOpen,onClose}=useDisclosure();
  const [courseId,setCourseId]=useState('');
  const [courseTitle,setCourseTitle]=useState('');
  const courseDetailsHandler=(courseId,title)=>{
    dispatch(getCourseLectures(courseId));
    onOpen();
    setCourseId(courseId);
    setCourseTitle(title)
  }
  const deleteButtonHandler=(courseId)=>{
    dispatch(deleteCourse(courseId));
    dispatch(getAllCourses({keyword}));
  }
  const deleteLectureButtonHandler=async (courseId,lectureId)=>{
    await dispatch(deleteLecture(courseId,lectureId));
    dispatch(getCourseLectures(courseId));
  }
  const addLectureHandler=(e,courseId,title,description,video)=>{
    e.preventDefault();
  }
  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch({type:"clearError"});
    }
    if(message){
      toast.success(message);
      dispatch({type:"clearMessage"});
    }
  },[dispatch,error,message]);

  return <Grid css={{
    cursor:`url(${cursor}),default`
}} minH={'100vh'} templateColumns={['1fr','5fr 1fr']}>
    <Box p={['0','6']} overflowX={'auto'}>
    <Heading textTransform={'uppercase'} textAlign={['center','left']} 
                    my={'16'} children={'All Courses'}/>
    <TableContainer w={['100vw','full']} >
      <Table variant={'simple'} size={'lg'}>
          <TableCaption> Total Courses in Database</TableCaption>
          <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Poster</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Creator</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
                <Th isNumeric>Action</Th>
              </Tr>
          </Thead>
          <Tbody>
              {
                 courses.map((item)=>(
                    <Row courseDetailsHandler={courseDetailsHandler} deleteButtonHandler={deleteButtonHandler} key={item} item={item} loading={loading}/>
                ))
              }
          </Tbody>
      </Table>
    </TableContainer>
    <CourseModal isOpen={isOpen} onClose={onClose} id={courseId} courseTitle={courseTitle}
        deleteLectureButtonHandler={deleteLectureButtonHandler} addLectureHandler={addLectureHandler} lectures={lectures} loading={loading}/>
    </Box>
    <Sidebar/>
</Grid>
}


function Row({item,courseDetailsHandler,deleteButtonHandler,loading}){
    return (
      <Tr>
          <Td>#{item._id}</Td>
          <Td><Image src={item.poster.url}/></Td>
          <Td>{item.title}</Td>
          <Td textTransform={'uppercase'}>{item.category}</Td>
          <Td>{item.createdBy}</Td>
          <Td isNumeric>{item.views}</Td>
          <Td isNumeric>{item.numOfVideos}</Td>
          <Td isNumeric>
          <HStack justifyContent={'flex-end'}>
                <Button isLoading={loading} variant={'outline'} color={'purple.500'} onClick={()=>courseDetailsHandler(item._id,item.title)}>View Lectures</Button>
                <Button isLoading={loading} color={'purple.600'} onClick={()=>deleteButtonHandler(item._id)}>
                  <RiDeleteBin7Fill/>
                </Button>
            </HStack>
          </Td>
            
      </Tr>
    )
}
export default AdminCourses