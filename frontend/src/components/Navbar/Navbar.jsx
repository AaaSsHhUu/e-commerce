import React from "react";
import { logo } from "../../assets";
import { FaCartArrowDown, FaSearch, FaUserCircle } from "react-icons/fa";
import Sidebar from "./Sidebar";

function Navbar() {
  return (
    <div className="bg-blue-900 w-full fixed top-0 flex justify-between items-center px-2 py-3 sm:py-4 sm:px-6">
      {/* Sidebar */}
        <Sidebar />
      {/* Navbar */}
        <div className="">
          <img src={logo} className="w-[20rem] cursor-pointer" alt="logo" />
        </div>

        <div className="hidden sm:flex text-white gap-6">
          <a href="#" className="opacity-100 hover:opacity-80">
            <FaSearch size={25} />
          </a>
          <a href="#" className="opacity-100 hover:opacity-80">
            <FaCartArrowDown size={25} />
          </a>
          <a href="#" className="opacity-100 hover:opacity-80">
            <FaUserCircle size={25} />
          </a>
        </div>
      </div>
  );
}

export default Navbar;
