import React from "react";
import Carousel from "react-bootstrap/Carousel";


const Slider = ({ images = [] }) => {
  if (!images.length) return null;

  return (
    <Carousel>
      {images.map((item, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100 rounded"
            src={item.image}
            alt={item.title || `slide-${index}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Slider;
