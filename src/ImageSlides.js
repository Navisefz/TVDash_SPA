import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';

function ImageSlides() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://localhost:44323/api/Image/')
      .then(response => response.json())
      .then(data => setItems(data));
  }, []);

  return (
    
    <Carousel fade pause ={false} >
      {items.map(item => (
        <Carousel.Item interval={5000} key={item.imageID} >
          <img
            className="d-block w-100"
            src={item.imageSrc}
            alt={item.title}
            style={{ width: "100%", height: "100vh", objectFit: "cover"}}
          />
          <Carousel.Caption>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ImageSlides;
