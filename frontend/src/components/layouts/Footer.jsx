import React from 'react'
import {playStore,appStore} from '../../assets/index'
import { AiFillInstagram, AiFillYoutube, AiFillFacebook } from "react-icons/ai";

function Footer() {
  return (
    <div className='flex flex-col md:flex-row md:items-center bg-blue-950 mt-[20vh] text-white p-[2vmax]'>
        {/* Left footer */}
        <div className='sm:flex flex-col mt-4 items-center gap-4 w-full sm:w-[20%] text-center'> 
            <h4 className='font-bold text-sm'>DOWNLOAD OUR APP</h4>
            <p className='hidden sm:block text-sm mb-3'>Download App for Andriod and IOS Devices</p>
            <img className='w-[10vmax] mx-auto my-2 cursor-pointer' src={appStore} alt="appstore" />
            <img className='w-[10vmax] mx-auto my-2 cursor-pointer' src={playStore} alt="playstore" />
        </div>

        {/* Mid footer */}
        <div className='w-full sm:w-[60%] flex flex-col items-center gap-4 mx-auto'>
            <h4 className='text-3xl sm:text-5xl font-bold my-4'>ECOMMERCE.</h4>
            <p className='text-sm'>High Quality is out first Priority</p>
            <p className='text-sm'>Copyrights 2024 &copy; Ashu</p>
        </div>

        {/* Right footer */}
        <div className='flex flex-col items-center gap-3 w-full sm:w-[20%] mx-auto'>
            <h4 className='my-4 text-2xl font-bold'>Follow Us</h4>
            <a className='hover:underline flex items-center gap-2' target='_blank' href="https://instagram.com">
                <AiFillInstagram size={30} color='#e43358'/>
                Instagram
            </a>
            <a className='hover:underline flex items-center gap-2' target='_blank' href="https://youtube.com">
                <AiFillYoutube size={30} color='red'/>
                Youtube
            </a>
            <a className='hover:underline flex items-center gap-2' target='_blank' href="https://facebook.com">
                <AiFillFacebook size={30} color='blue'/>
                Facebook
            </a>
        </div>
    </div>
  )
}

export default Footer
