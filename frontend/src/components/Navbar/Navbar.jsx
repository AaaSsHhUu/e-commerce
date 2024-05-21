import React from "react";
import { logo } from "../../assets";
import { FaCartArrowDown, FaSearch, FaUserCircle } from "react-icons/fa";
import Sidebar from "./Sidebar";

function Navbar() {
  return (
    <div className="bg-blue-900 w-full fixed top-0 flex justify-between items-center py-4 px-6">
      {/* Sidebar */}
        <Sidebar />
      {/* Navbar */}
        <div className="">
          <img src={logo} className="w-[20rem] cursor-pointer" alt="logo" />
        </div>

        <div className="flex text-white gap-6">
          <a href="#" className="hover:opacity-90">
            <FaSearch size={25} />
          </a>
          <a href="#" className="hover:opacity-90">
            <FaCartArrowDown size={25} />
          </a>
          <a href="#" className="hover:opacity-90">
            <FaUserCircle size={25} />
          </a>
        </div>
      </div>
  );
}

export default Navbar;
