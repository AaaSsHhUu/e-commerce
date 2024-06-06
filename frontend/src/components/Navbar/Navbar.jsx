import React,{useState} from "react";
import { FaCartArrowDown, FaSearch, FaUserCircle } from "react-icons/fa";
import Sidebar from "./Sidebar";
import { logo } from "../../assets";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Navbar() {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const searchSubmitHandler = () => {
        if(keyword.trim()){
            navigate(`/products/${keyword}`)
        }
        else{
            navigate(`/products`)
            toast.info("No such Product Found");
        }
    }
  return (
    <div className="w-full h-[80px] bg-blue-600 sticky top-0 z-20 flex justify-center sm:justify-between items-center px-2 py-2 sm:py-4 sm:px-6">
          <div className="sm:flex sm:items-center text-white gap-8">
              {/* Sidebar */}
              <Sidebar />
              {/* logo */}
              <div className="cursor-pointer">
                  <Link to="/"><img width={300} src={logo} alt="logo" /></Link>
              </div>
              {/* nav-links */}
          </div>
          <div className="hidden sm:flex items-center gap-5 text-white">
              <div className="hidden md:flex w-[300px] items-center pr-3 bg-blue-500 rounded-xl ">
                  <input type="text" placeholder="Search Products" className="border-none rounded-l-xl focus:outline-blue-500 flex-1 focus:outline-2 mr-3  px-4 py-2 text-black bg-white"
                    onChange={(e) => setKeyword(e.target.value)}
                    value={keyword}
                  />
                  <FaSearch color="white" size={20} cursor={"pointer"} onClick={searchSubmitHandler} />
              </div>
              <div className="md:hidden">
                  <FaSearch size={30} cursor={"pointer"} />
              </div>
              <div>
                  <FaUserCircle size={30} cursor={"pointer"} />
              </div>
              <div>
                  <FaCartArrowDown size={30} cursor={"pointer"}/>
              </div>
          </div>
    </div>
  );
}

export default Navbar;
