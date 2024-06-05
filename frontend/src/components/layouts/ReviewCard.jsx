import React from "react";
import ReactStars from "react-rating-stars-component";
import { profile1 } from "../../assets";

const ReviewCard = ({review}) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: review.rating,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };
  return (
    <div className="w-[30vmax] flex flex-none flex-col px-6 py-4 items-center justify-center rounded-lg hover:shadow-2xl border hover:border-gray-300 hover:scale-105">
        <img src={profile1} alt="profile image" className="w-[50px] h-[50px] rounded-full" />
        <p>{review.name}</p>
        <ReactStars {...options} /> 
        <span>{review.comment}</span>
    </div>
  )
};

export default ReviewCard;
