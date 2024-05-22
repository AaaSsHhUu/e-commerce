import React from "react";
import "./Home.css";
import { LuMouse } from "react-icons/lu";
import Product from "../../Products/Product";

const Home = () => {
  const products = {
    name : "Blue-tshirt",
    images : [{url : "https://i.ibb.co/DRST11n/1.webp"}],
    price : "3000",
    _id : "tshirt"
  }
  return (
    <>
      <div className="banner bg-red-500 flex flex-col items-center pt-[30%] sm:pt-[10%] text-white w-full">
        <p className="font-bold text-2xl sm:text-3xl md:text-4xl my-4 sm:my-6">Welcome to Ecommerce</p>
        <h1 className="font-bold text-3xl sm:text-4xl text-center md:text-5xl mt-8 sm:mt-12 mb-6">Find Amazing Products Below</h1>
        <a href="#" className="">
          <button className="flex items-center outline-none bg-white text-black gap-2 px-6 sm:text-lg font-semibold py-2 mt-4 sm:mt-6 md:mt-12 hover:bg-transparent hover:border-2 hover:border-white hover:text-white transition-all duration-500">
            Scroll <LuMouse size={24} />
          </button>
        </a>
      </div>

      <h1 className="text-xl sm:text-2xl md:text-3xl text-center w-[70%] sm:w-[50%] md:w-[30%] opacity-75 mx-auto my-6 md:my-12 border-b-2 border-b-slate-600 p-4">Featured Products</h1>

      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6">
          <Product product={products} />
          <Product product={products} />
          <Product product={products} />
          <Product product={products} />
          <Product product={products} />
          <Product product={products} />
          <Product product={products} />
          <Product product={products} />
      </div>
    </>
  );
};

export default Home;
