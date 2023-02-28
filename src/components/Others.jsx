import React from 'react'
import { Box, Container } from '@mui/material';
import SideNav from '../SideNav';

function Others() {
  return (
    <>
    <Box height={100}/>
    <SideNav/>
 <Container sx={{backgroundColor: "gray", height:"80vh",position: "relative" ,left: '50px',bottom:'20px'}}>This is Ohers Page</Container>
 
  </>
  )
}

export default Others
