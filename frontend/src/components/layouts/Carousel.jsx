import React, { useEffect } from "react";
import Slider from "react-slick";
import { GrNext, GrPrevious } from "react-icons/gr";

export default function SimpleSlider({product}) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows : true,
    prevArrow : <GrPrevious color="black" />,
    nextArrow : <GrNext color="black" />
  };

  return (
    <Slider {...settings}>
      {product.image.map((img) => (
          <div className="h-full">
            <img src={img.url} alt="image" />
          </div>
      ))}
    </Slider>
  );
}