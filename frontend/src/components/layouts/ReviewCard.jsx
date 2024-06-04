import React from "react";
import ReactStars from "react-rating-stars-component";

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
    <div>
        <img src="" alt="profile image" />
        <p>{review.name}</p>
        <ReactStars {...options} /> 
    </div>
  )
};

export default ReviewCard;
