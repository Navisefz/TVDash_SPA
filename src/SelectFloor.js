// import * as React from 'react';
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';

// export  function SelectFloor() {
//   const [floor, setFloor] = React.useState('');
 
//   // const handleChange = (event) => {
//   //   setFloor(event.target.value);
//   //   console.log(event);
//   // };
//   function handleChange(event){
//     setFloor(event.target.value);
//     // other suggestion react-router-dom.

//   //  window.location.replace(`http://localhost:3002/tvdash/Image?floor=${event.target.value}`);
//   }

//   return (
//     <Box sx={{ minWidth: 120 }}>
//       <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">Floor</InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={''}
//           label="Floor"
//           onChange={(event)=>{
//             handleChange(event);
//           }}
//         >

//           <MenuItem value='7'>7</MenuItem>
//           <MenuItem value='8'>8</MenuItem>
//           <MenuItem value='9'>9</MenuItem>
//           <MenuItem value='10'>10</MenuItem>
//           <MenuItem value='11'>11</MenuItem>
//         </Select>
//       </FormControl>
//     </Box>
//   );
// }

