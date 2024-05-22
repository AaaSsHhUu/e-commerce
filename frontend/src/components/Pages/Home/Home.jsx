import React from "react";
import "./Home.css";
import { LuMouse } from "react-icons/lu";

const Home = () => {
  return (
    <>
      <div className="banner bg-red-500 flex flex-col items-center pt-[10%] text-white w-full">
        <p className="font-bold text-2xl my-6">Welcome to Ecommerce</p>
        <h1 className="font-bold text-5xl mt-12 mb-4">Find Amazing Products Below</h1>
        <a href="#" className="">
          <button className="flex items-center outline-none bg-white text-black gap-2 px-6 text-lg font-semibold py-2 mt-12 hover:bg-transparent hover:border-2 hover:border-white hover:text-white transition-all duration-500">
            Scroll <LuMouse size={24} />
          </button>
        </a>
      </div>

      <h1 className="text-3xl text-center w-[30%] opacity-75 mx-auto my-12 border-b-2 border-b-slate-600 p-4">Featured Products</h1>

    </>
  );
};

export default Home;
