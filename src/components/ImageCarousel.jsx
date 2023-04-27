import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function ImageCarousel() {
  const [items, setItems] = useState([]);
  const windowUrl = window.location.href;
  const params = new URL(windowUrl);

 
  const floor = params.search.split("=")[1]
  useEffect(() => {
    fetch('https://localhost:44313/api/Image/?floor='+ floor)
   // fetch('https://mbgsp-portal-int.apac.bg.corpintra.net/tvapi/api/Image/')
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
            src={item.ImageSrc}
            alt={item.title}
            style={{ width: "100%", minHeight: "100vh", height:'100%',maxWeight:'100wh', objectFit: "fill"}}
          />
        </div>
        
      ))}
      
    </Slider>
   
  );
}
export default ImageCarousel