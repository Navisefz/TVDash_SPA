import { Container, Box } from '@mui/system';
import React from 'react'
import SideNav from '../SideNav';
import ImageCarousel from './ImageCarousel';

function Dashboard() {
  return (
    
    <>
    
    <SideNav/>

    <Box sx={{objectFit:"cover",width:"100%"}}>
        <ImageCarousel/>
      </Box>
  

 
  </>
  
  )
}

export default Dashboard
