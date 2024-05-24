import React, { useEffect } from "react";
import "./Home.css";
import { LuMouse } from "react-icons/lu";
import Product from "../../Products/Product";
import Metadata from "../../layouts/Metadata";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../features/product/productSlice";

const Home = () => {
  const dispatch = useDispatch();
  const {loading, error, products, productCount} = useSelector((state) => {
    // console.log("state : ", state);
    return state.products
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <Metadata title={"ECOMMERCE"} />
      <div className="banner bg-red-500 flex flex-col items-center pt-[30%] sm:pt-[10%] text-white w-full">
        <p className="font-bold text-2xl sm:text-3xl md:text-4xl my-4 sm:my-6">
          Welcome to Ecommerce
        </p>
        <h1 className="font-bold text-3xl sm:text-4xl text-center md:text-5xl mt-8 sm:mt-12 mb-6">
          Find Amazing Products Below
        </h1>
        <a href="#" className="">
          <button className="flex items-center outline-none bg-white text-black gap-2 px-6 sm:text-lg font-semibold py-2 mt-4 sm:mt-6 md:mt-12 hover:bg-transparent hover:border-2 hover:border-white hover:text-white transition-all duration-500">
            Scroll <LuMouse size={24} />
          </button>
        </a>
      </div>

      <h1 className="text-xl sm:text-2xl md:text-3xl text-center w-[70%] sm:w-[50%] md:w-[30%] opacity-75 mx-auto my-6 md:my-12 border-b-2 border-b-slate-600 p-4">
        Featured Products
      </h1>

      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6">
        { products && products.map((product) => { 
          console.log(product);
            return <Product product={product} /> 
        })}
      </div>
    </>
  );
};

export default Home;
