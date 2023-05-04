import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType,
} from "@microsoft/signalr";

function ImageCarousel() {
  const [items, setItems] = useState([]);
  const [connection, setConnection] = useState();
  const [floor, setFloor] = React.useState("10");
  const [loading, isLoading] = useState(false);
    const fApi = "https://localhost:44313/api/Image/?floor=";
    const imageAPI = (
      url = "https://localhost:44313/api/Image/?floor=" + floor
    ) => {
      return {
        fetchAll: (val) =>
          axios.get(val == undefined ? fApi + floor : fApi + val),
       
      };
    };
    function refreshImageList(Flores) {
        isLoading(false);
        imageAPI()
          .fetchAll(Flores)
          .then((res) => {
            setItems(res.data);
          })
          .catch((err) => console.log(err));
      }
      function handleChange(event) {
        // imageAPI().fetchAll();
        refreshImageList(event.target.value);
      }

 


  const fetchImages = async () => {
    const floor = new URLSearchParams(window.location.search).get("floor");
    await axios
      .get(`https://localhost:44313/api/Image/?floor=${floor}`)
      .then((res) => {
        console.log(res);
        setItems([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect( () => {

    const loadData= async() => 
    {
   
   const socketConnection = new HubConnectionBuilder()
     .configureLogging(LogLevel.Debug)
     .withUrl("https://localhost:44313/imageHub", {
       skipNegotiation: true,
       transport: HttpTransportType.WebSockets
     })
     .build();
   await socketConnection.start();
   setConnection(socketConnection);
    };
    loadData();
 }, []);

 
  useEffect(() => {
    fetchImages();
  }, []);

const [count,setcount] = useState([]);

  connection &&
    connection.on("message", (message) => {
      setcount(message);
      
    });

    useEffect(() => {
  fetchImages()
      
    }, [count]);
    
  
  return (
    <>
  
  <div className="floorname1">FLOOR - {floor} </div>
     <div className="selectFloor1">
       <Box sx={{ minWidth: 120 }} key={"123"}>
         <FormControl fullWidth>
           <InputLabel id="demo-simple-select-label">Floor</InputLabel>
           <Select
             labelId="demo-simple-select-label"
             id="demo-simple-select"
             value={floor}
             label="Floor"
             onChange={(event) => {
               setFloor(event.target.value);
               handleChange(event);
             }}
           >
             <MenuItem value="1">1</MenuItem>
             <MenuItem value="2">2</MenuItem>
             <MenuItem value="3">3</MenuItem>
             <MenuItem value="4">4</MenuItem>
             <MenuItem value="5">5</MenuItem>
             <MenuItem value="6">6</MenuItem>
             <MenuItem value="7">7</MenuItem>
             <MenuItem value="8">8</MenuItem>
             <MenuItem value="9">9</MenuItem>
             <MenuItem value="10">10</MenuItem>
             <MenuItem value="11">11</MenuItem>
           </Select>
         </FormControl>
       </Box>
       {/* <SelectFloor/> */}
     </div>
    <Carousel
      fade
      interval={5000}
      pause={false}
      indicators={false}
      controls={false}
    >
      {items.map((item) => (
        <Carousel.Item key={item.ImageID}>
          <img
            src={item.ImageSrc}
            alt={item.title}
            style={{
              width: "100%",
              minHeight: "100vh",
             height:'100%',
             minWidth:'100vh',
              objectFit: "fixed",
            }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
    </>
  );
}
export default ImageCarousel;
