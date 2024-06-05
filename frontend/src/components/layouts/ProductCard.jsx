import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const ProductCard = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: product.avgRating,
    isHalf : true,
    size : window.innerWidth < 600 ? 20 : 25
  };
  return (
    <>
      <Link className="mx-4 mb-4 w-[60vw] sm:w-[40vw] md:w-[20vw] flex flex-col border border-slate-300 text-start hover:shadow-2xl hover:-translate-y-2 transition-all duration-500" to={`/product/${product._id}`}>
        <img className="mb-2" src={product.image[0].url} alt="product" />
        <p className="text-xl my-1 mx-2">{product.name}</p>
        <div className="my-1 flex gap-2 mx-1 items-center">
          <ReactStars {...options} />
          <span className="hidden sm:block text-sm">({product.numOfReviews} reviews)</span>
        </div>
        <p className="text-red-500 font-bold mx-2 my-1">₹{product.price}</p>
      </Link>
    </>
  );
};

export default ProductCard;
