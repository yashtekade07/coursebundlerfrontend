import { Box, Grid, HStack, Heading, Progress, Stack, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import cursor from "../../../assets/images/mouse-cursor.png"
import Sidebar from '../Sidebar'
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri'
import { DoughnutChart, LineChart } from './Chart'
import {useDispatch, useSelector} from "react-redux"
import { getDashboardStats } from '../../../redux/actions/admin'
import Loader from "../../../components/Layout/Loader/Loader"
const Bar=({title,value,profit})=>(
    <Box py={'4'} px={['0','20']}>
        <Heading size={'sm'} children={title} mb={'2'}/>
        <HStack w={'full'} alignItems={'center'}>
            <Text children={profit?"0%":`-${value}%`}/>
            <Progress w={'full'} hasStripe value={profit===true?value:0} colorScheme='purple' />
            <Text children={`${value>100?value:100}%`}/>
        </HStack>
    </Box>
)
const Databox=({title,qty,qtyPercentage,profit})=>(
    <Box w={['full','20%']} boxShadow={'-1px 0px 10px rgba(107,70,193,0.5)'} 
           minW={'30%'} p={'8'} borderRadius={'lg'}>
        <Text children={title}/>
        <HStack spacing={'6'} >
            <Text fontSize={'2xl'} fontWeight={'bold'} children={qty}/>
            <HStack>
                <Text children={`${qtyPercentage}%`}/>
                {profit?(<RiArrowUpLine color='green'/>):(<RiArrowDownLine color='red'/>)}
            </HStack>
        </HStack>
        <Text children={'Since last month'} opacity={'0.6'}/>
    </Box>
)


const Dashboard = () => {
    const dispatch=useDispatch();
    const {loading,stats,
        viewsCount,
        subscriptionsCount,
        userCount,
        subscriptionsPercentage,
        viewsPercentage,
        usersPercentage,
        subscriptionsProfit,
        viewsProfit,
        usersProfit,}=useSelector(state=>state.admin);
    useEffect(()=>{
        dispatch(getDashboardStats());
    },[dispatch])

  return <Grid css={{
            cursor:`url(${cursor}),default`
  }} minH={'100vh'} templateColumns={['1fr','5fr 1fr']}>
            {
                loading || !stats?<><Loader color='purple.500'/></>:<>
                <Box boxSizing='border-box' py={'12'}mt={'10'} px={['4','0']}>
                <Text textAlign={'center'} opacity={'0.5'} 
                        children={`Last Changed on ${String(new Date(stats[11].createdAt)).split('G')[0]}`}/>
                <Heading children={'Dashboard'} ml={['0','20']} mb={'12'} 
                        textAlign={['center','left']}/>
                <Stack direction={['column','row']} minH={'24'} justifyContent={'space-evenly'}>
                    <Databox title={'Views'} qty={viewsCount} qtyPercentage={viewsPercentage} profit={viewsProfit}/>
                    <Databox title={'Users'} qty={userCount} qtyPercentage={usersPercentage} profit={usersProfit}/>
                    <Databox title={'Subscription'} qty={subscriptionsCount} qtyPercentage={subscriptionsPercentage} profit={subscriptionsProfit}/>    
                </Stack>
                <Box m={['0','12']} borderRadius={'lg'} p={['0','16']}
                        mt={['4','16']} boxShadow={'-1px 0px 10px rgba(107,70,193,0.5)'}>
                    <Heading textAlign={['center','left']} size={'md'} children={'Views Graph'} pt={['8','0']} ml={['0','16']}/>
                    <LineChart dataArray={stats.map(item=>item.views)}/>
                </Box>
                <Grid templateColumns={['1fr','2fr 1fr']}>
                    <Box p={'4'}>
                        <Heading textAlign={['center','left']} size={'md'} children={'Progress Bar'} my={'8'} ml={['0','16']}/>
                        <Box>
                            <Bar title={'Views'} value={viewsPercentage} profit={viewsProfit}/>
                            <Bar title={'Users'} value={usersPercentage} profit={usersProfit}/>
                            <Bar title={'Subscription'} value={subscriptionsPercentage} profit={subscriptionsProfit}/>
                        </Box>
                    </Box>
                    <Box p={['0','16']} boxSizing='border-box' py={'4'} >
                            <Heading textAlign={'center'} size={'md'} mb={'4'} children={'Users'}/>
                            <DoughnutChart users={[subscriptionsCount,userCount-subscriptionsCount]}/>
                    </Box>
                </Grid>
            </Box> </>
            }
            <Sidebar/>
  </Grid>
}

export default Dashboard