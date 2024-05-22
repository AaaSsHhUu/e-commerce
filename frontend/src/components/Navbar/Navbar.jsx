import React from "react";
import { logo } from "../../assets";
import { FaCartArrowDown, FaSearch, FaUserCircle } from "react-icons/fa";
import Sidebar from "./Sidebar";

function Navbar() {
  return (
    <div className="w-full h-[100px] fixed top-0 z-20 flex justify-between items-center px-2 py-3 sm:py-4 sm:px-6">
      {/* Sidebar */}
      <Sidebar />
      <div className="hidden sm:flex sm:items-center text-white gap-8">
        {/* Searchbar */}
        <a href="#" className="hover:opacity-80">
          <FaSearch size={30} />
        </a>
        <a href="#" className="hover:opacity-80">
          <FaCartArrowDown size={30} />
        </a>
        <a href="#" className="hover:opacity-80">
          <FaUserCircle size={30} />
        </a>
      </div>
    </div>
  );
}

export default Navbar;
