import React from 'react'
import { Box,Container } from '@mui/material';
import SideNav from '../SideNav';
function Roles() {
  return (
    <>
    <Box height={100}/>
    <SideNav/>
 <Container sx={{backgroundColor: "white", height:"80vh",position: "relative" ,left: '50px',bottom:'20px'}}>This is Roles Page</Container>
 
  </>
  )
}

export default Roles;
