import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType,
} from "@microsoft/signalr";
function ImageSlides() {
  const [items, setItems] = useState([]);
  const [connection, setConnection] = useState();

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
  useEffect(async () => {
    const socketConnection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Debug)
      .withUrl("https://localhost:44313/imageHub", {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .build();
    await socketConnection.start();
    setConnection(socketConnection);
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
   
      fetchImages();
    }, [count]);

  return (
    <Carousel
      fade
      interval={5000}
      pause={false}
      indicators={false}
      controls={false}
    >
      {items.map((item) => (
        <Carousel.Item key={item.imageID}>
          <img
            src={item.ImageSrc}
            alt={item.title}
            style={{
              width: "100%",
              minHeight: "100vh",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
export default ImageSlides;
