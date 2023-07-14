import { Button, Container, Grid, Heading, Image, Input, Select, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Sidebar from '../../Sidebar'
import cursor from "../../../../assets/images/mouse-cursor.png"
import { fileUploadCss } from '../../../Auth/Register'
import { useDispatch, useSelector } from 'react-redux'
import { createCourse } from '../../../../redux/actions/admin'
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom'

const CreateCourse = () => {
  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('');
  const [createdBy,setCreatedBy]=useState('');
  const [category,setCategory]=useState('');
  const [image,setImage]=useState('');
  const [imagePrev,setImagePrev]=useState('');
  const navigate=useNavigate();
  const categories=["Web Development","App Development","Data Structures And Algorithms"];
  const dispatch=useDispatch();
  const changeImageHandler=(e)=>{
    const file=e.target.files[0];
    const reader=new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend=()=>{
        setImagePrev(reader.result);
        setImage (file);
    }
}
const submitHandler = async (e)=>{
  e.preventDefault();
  const myFrom= new FormData();
  myFrom.append('title',title)
  myFrom.append('description',description)
  myFrom.append('category',category)
  myFrom.append('createdBy',createdBy)
  myFrom.append('file',image)

  await dispatch(createCourse(myFrom));
  navigate("/admin/courses");

}
const {loading,error,message}=useSelector(state=>state.admin)
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
    <Container py={'12'} >
      <form onSubmit={submitHandler}>
        <Heading textTransform={'uppercase'} textAlign={['center','left']} 
                    my={'16'} children={'Create  Course'}/>
        <VStack m={'auto'} spacing={'8'}> 
        <Input  value={title} onChange={e=>setTitle(e.target.value)} 
                    placeholder='Title' type='text' focusBorderColor='purple.300'/>
        <Input  value={description} onChange={e=>setDescription(e.target.value)} 
                    placeholder='Description' type='text' focusBorderColor='purple.300'/>
        <Input  value={createdBy} onChange={e=>setCreatedBy(e.target.value)} 
                    placeholder='Admin Name' type='text' focusBorderColor='purple.300'/>
        <Select focusBorderColor='purple.300' value={category} 
                    onChange={e=>setCategory(e.target.value)}>
            <option value={''}>Category</option>
            {categories.map((item)=>(
              <option key={item} value={item}>{item}</option>
            ))}
        </Select>
        <Input accept='image/*' required type='file' 
                    focusBorderColor='purple.300' css={{
                      "&::file-selector-button":{
                        ...fileUploadCss,color:'purple'
                      },
                    }} onChange={changeImageHandler}/>
        {
          imagePrev &&(
            <Image src={imagePrev} boxSize={'56'} objectFit={'contain'}/>
          )
        }
        <Button isLoading={loading} w={'full'} colorScheme='purple' type='submit'>Create</Button>
        </VStack>
      </form>
    </Container>
    <Sidebar/>
</Grid>
}

export default CreateCourse