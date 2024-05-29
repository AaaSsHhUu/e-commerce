import React, { useEffect } from "react";
import Slider from "react-slick";
import { GrNext, GrPrevious } from "react-icons/gr";

export default function SimpleSlider({product}) {
  const settings = {
    dots: true,
    infinite: product.image.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay : true,
    autoplaySpeed : 3000,
    arrows : true,
    prevArrow : <GrPrevious color="black" />,
    nextArrow : <GrNext color="black" />
  };

  return (
    <Slider {...settings}>
      {product.image.map((img) => (
          <div className="h-[70vh]">
            <img src={img.url} alt="image" className="w-full" />
          </div>
      ))} 
      
    </Slider>
  );
}