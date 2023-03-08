import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function ImageSlides() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://localhost:44323/api/Image/')
      .then(response => response.json())
      .then(data => setItems(data));
  }, []);

  const settings = {
    fade:true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    arrows: false,
    swipe:false,
    draggable:false,
  };
  return (
    <Slider {...settings}>
      {items.map(item => (
        <div key={item.imageID}>
          <img
            src={item.imageSrc}
            alt={item.title}
            style={{ width: "100%", height: "100vh", objectFit: "cover"}}
          />
        </div>
      ))}
    </Slider>
  );
}
export default ImageSlides