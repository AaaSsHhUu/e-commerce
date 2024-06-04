import React, { useEffect } from "react";
import Slider from "react-slick";
import { GrNext, GrPrevious } from "react-icons/gr";

export default function SimpleSlider({product}) {
  const settings = {
    dots: false,
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
    <Slider {...settings} className="mt-4 w-3/4">
      {product.image.map((img) => (
          <div>
            <img src={img.url} alt="image" className="w-full" />
          </div>
      ))} 
      
    </Slider>
  );
}