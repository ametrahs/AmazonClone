import React from 'react'
import  {Carousel} from "react-responsive-carousel"
import {img}  from "./imgs/Data"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import css from "./Carousel.module.css";
function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((imageItemLink, index) => (
          <div key={index}>
            <img src={imageItemLink} alt={`Slide ${index}`} />
          </div>
        ))}
      </Carousel>
      <div className={css.hero_img}></div>
    </div>
  );
}

export default CarouselEffect