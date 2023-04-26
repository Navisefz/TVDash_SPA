import React, { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Modal, Button } from "react-bootstrap";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// import {SelectFloor} from './SelectFloor';
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import {HubConnectionBuilder, LogLevel,HttpTransportType} from "@microsoft/signalr";

export default function Imagelist() {
  const [imageList, setImageList] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [loading, isLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connection, setConnection] = useState();
  const [userName, setUserName] = useState("");

  const msg = {
    id: Math.random() * 10,
    message,
    userName: userName
  };

  //const handleModalShow = () => setShowModal(true);
  const [deleteId, setDeleteId] = useState(null);
  const windowUrl = window.location.href;
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [open, setOpen] = React.useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={2} ref={ref} variant="filled" {...props} />;
  });
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleModalClose = () => setShowModal(false);

  useEffect(() => {
    refreshImageList();
  }, []);


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

 

 connection &&
 connection.on("message", message => {
   setMessages(message); 
 });
  //connection to int API
  /*const imageAPI = (url = 'https://mbgsp-portal-int.apac.bg.corpintra.net/tvapi/api/Image/') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }*/
  const params = new URL(windowUrl);
  const floors = params.search.split("=")[1];
  const [floor, setFloor] = React.useState("10");
  const fApi = "https://localhost:44313/api/Image/?floor=";
  const imageAPI = (
    url = "https://localhost:44313/api/Image/?floor=" + floor
  ) => {
    return {
      fetchAll: (val) =>
        axios.get(val == undefined ? fApi + floor : fApi + val),
      create: (newRecord) => axios.post(url, newRecord),
      update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
    };
  };
  const imageAPI2 = (url2 = "https://localhost:44313/api/Image/") => {
    return {
      fetchAll2: () => axios.get(url2),
      delete: (id) => axios.delete(url2 + id),
    };
  };
  //function to refresh all the imagelist
  function refreshImageList(Flores) {
    isLoading(false);
    imageAPI()
      .fetchAll(Flores)
      .then((res) => {
        setImageList(res.data);
      })
      .catch((err) => console.log(err));
  }
  const addOrEdit = (formData, onSuccess) => {
    isLoading(true);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    if (formData.get("imageID") === "0") {
      imageAPI()
        .create(formData, config)

        .then((_res) => {
          onSuccess();
          refreshImageList();
          connection && connection.invoke("message", msg);
        })
        .catch((err) => console.log(err));
    }
  };
  const showRecordDetails = (data) => {
    setRecordForEdit(data);
  };
  //delete an image
  const onDelete = (e, id) => {
    e.stopPropagation();
    setDeleteId(id);
    setShowModal(true);
  };
  const handleDelete = (id) => {
    imageAPI2()
      .delete(id)
      .then((_res) => {
        refreshImageList();
        setShowModal(false);
        setDeleteId(null);
        setShowSnackbar(true);
        connection && connection.invoke("message", msg);
        setSnackbarMessage("Image deleted successfully");
      })
      .catch((err) => {
        console.log(err);
        setShowSnackbar(true);
        setSnackbarMessage("Failed to delete image");
      });
  };

  const imageCard = (data) => (
    <div
      className="card"
      onClick={() => {
        showRecordDetails(data);
      }}
    >
      <img src={data.ImageSrc} alt="" className="cardimage" />
      <div className="card-body">
        <button
          className="btn btn-light delete-button"
          onClick={(e) => onDelete(e, parseInt(data.ImageID))}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );

  function handleChange(event) {
    // imageAPI().fetchAll();
    refreshImageList(event.target.value);
  }

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="modalTitle">DELETE IMAGE</Modal.Title>
        </Modal.Header>
        <Modal.Body className="deleteImageModal">
          Are you sure you want to delete this image?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleDelete(deleteId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        message={snackbarMessage}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Image deleted successfully!
        </Alert>
      </Snackbar>
      <div className="floorname">FLOOR - {floor} </div>
      <div className="selectFloor">
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
      <div className="imageUploadCard">
        <ImageUpload addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
      </div>
      <Grid
        container
        spacing={0.5}
        sx={{
          backgroundColor: "whitesmoke",
          objectFit: "cover",
          width: "100%",
        }}
        
      >
        {imageList.map((image) => (
          <Grid
            className="gridimages"
            item
            xs={1.5}
            sm={1.5}
            md={1.5}
            key={image.ImageID}
          >
            {imageCard(image)}
          </Grid>
        ))}
      </Grid>
    </>
  );
}
