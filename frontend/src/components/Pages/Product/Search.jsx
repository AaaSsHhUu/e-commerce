import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Search = () => {

    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const handleSubmitSearch = (e) => {
        e.preventDefault();
        if(search.trim()){
            navigate(`/products/${search}`)
        }
        else{
            navigate("/products")
        }
    }

  return (
    <div className='flex h-screen w-full justify-center items-center bg-gradient-to-b from-transparent to-blue-600'>
        <form onSubmit={handleSubmitSearch} className='flex flex-col w-full px-4 gap-3'>
            <input type="text" placeholder='Enter Product name' className='w-full px-6 py-4 text-xl outline-none border-none rounded-lg focus:outline-4 focus:outline-blue-500' />
            <button type='submit' className='bg-blue-600 hover:opacity-75 rounded-lg px-4 py-2 text-lg font-bold text-white w-1/2 mx-auto'>Search</button>
        </form>
    </div>
  )
}

export default Search

