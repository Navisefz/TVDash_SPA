import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function ImageSlides() {

  const [items, setItems] = useState([]);
  const fetchImages = () => {
    const floor = new URLSearchParams(window.location.search).get('floor');
    axios
      .get(`https://localhost:44313/api/Image/?floor=${floor}`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
   
    fetchImages();
   
   
  }, []);

  return (
    <Carousel fade interval={5000} pause={false} indicators={false} controls={false}>
      {items.map((item) => (
        <Carousel.Item key={item.imageID}>
          <img
            src={item.ImageSrc}
            alt={item.title}
            style={{ width: '100%', minHeight: "100vh", height:'100%', objectFit: 'cover' }}
          />
          
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
export default ImageSlides;
