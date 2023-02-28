import React from 'react'
import { Box } from '@mui/material';
import SideNav from '../SideNav';
import Imagelist from '../Imagelist';

function Image() {
  return (
    <>
   
    <SideNav/>
 
    <Box sx={{ flexGrow: 1, p: 3 , backgroundColor:"white", height : "350px",bottom:"100px",position:"relative",left:"250px",top:"100px", width:"340px" }}>
       <Imagelist/>
    </Box>
  </>
  );
}

export default Image
