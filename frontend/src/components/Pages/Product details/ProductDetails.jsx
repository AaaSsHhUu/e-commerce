import React, { useEffect } from "react";
import { fetchProductDetails } from "../../../features/product/productDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SimpleSlider from "../../layouts/Carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Loader, ReviewCard } from "../../index";
import ReactStars from "react-rating-stars-component";

function ProductDetails() {
  const dispatch = useDispatch();
  const { loading, error, productDetails } = useSelector((state) => {
    // console.log("state : ", state);
    return state.productDetails;
  });
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  if (error) {
    return <h1>{error}</h1>;
  }

  if (loading) {
    return <Loader />;
  }

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value:  productDetails.product.numOfReviews,
    isHalf : true,
    size : window.innerWidth < 600 ? 20 : 25
  };

  return (
    <>
      <div className="w-full md:w-[80%] mx-auto p-2 flex flex-col items-center md:flex-row  md:justify-between">
        <div className="mx-4 w-1/2 sm:w-5/12 border-white border">
          {!loading && <SimpleSlider product={productDetails.product} />}
        </div>

        <div className="w-[70%] mx-4 border px-5 py-6 border-white">
            {/* Details block - 1 */}
                <div className="border-b-gray-400 border-b pb-3">
                    <h2 className="text-2xl font-bold">{productDetails.product.name }</h2>
                    <p className="text-sm opacity-75 font-light">Product # {productDetails.product._id}</p>
                </div>
            {/* Details block - 2 */}
                <div className="flex items-center gap-2 my-3 border-b border-b-gray-400 pb-3">
                  <ReactStars {...options} />
                  <span className="text-sm opacity-75">( {productDetails.product.numOfReviews} Reviews)</span>
                </div>
            {/* Details block - 3*/}
                <div className=" my-3 border-b border-b-gray-400 pb-3">
                    <h1 className="text-3xl font-bold my-4">{`₹${productDetails.product.price}`}</h1>
                    <div className="flex items-center gap-4 border-b border-b-gray-400 pb-3">
                        <div className="py-2">
                            <button className="text-lg font-bold bg-blue-600 hover:bg-green-600 text-white px-2 py-1">-</button>
                            <input type="number" value={1} className="px-4 py-2 text-center w-20 border-none outline-none"  />
                            <button className="text-lg font-bold bg-blue-600 hover:bg-green-600 text-white px-2 py-1">+</button>
                        </div>
                        <button className="bg-blue-600 rounded-3xl px-6 hover:bg-green-600 py-2 text-sm text-white font-semibold">Add to Cart</button>
                    </div>

                    <p className="mt-3">
                        Status : <b className={productDetails.product.stock < 1 ? "text-red-600" : "text-green-600"}>
                            {productDetails.product.stock < 1 ? "Out of Stock" : "Available"}
                          </b>
                    </p>
                </div>

            {/* Details block - 4 */}
                <div className="my-4">
                    <p className="text-gray-600"><span className="text-black text-xl">Description :</span> <br />{productDetails.product.description}</p>
                </div>

                <button className="bg-blue-600 rounded-3xl px-6 hover:bg-green-600 hover:scale-105 py-2 text-sm text-white font-semibold">Submit Review</button>
        </div>
      </div>

      <h3>Reviews</h3>
      {productDetails.product.numOfReviews ? 
        (
          <div className="reviews">
            { productDetails.product.reviews.map((review) => {
                return <ReviewCard review={review} />
            }) }
          </div>

        )
       :
        (
          <p>No Reviews yet!!!</p>
        )
       }
    </>
  );
}

export default ProductDetails;
