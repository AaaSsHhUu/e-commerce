import React, { useEffect } from "react";
import { fetchProductDetails } from "../../../features/product/productDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SimpleSlider from "../../layouts/Carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ProductDetails() {
  const dispatch = useDispatch();
  const { loading, error, productDetails } = useSelector((state) => {
    // console.log("state : ", state);
    return state.productDetails;
  });
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch,id]);


  return (
    <div className="h-[50vh] w-1/2 text-center text-2xl font-bold mx-auto text-black bg-gray-300">
      <SimpleSlider product={productDetails.product} />
    </div>
  );
}

export default ProductDetails;


