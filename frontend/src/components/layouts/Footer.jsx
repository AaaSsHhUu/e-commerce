import React from 'react'
import {playStore,appStore} from '../../assets/index'

function Footer() {
  return (
    <div className='flex flex-col md:flex-row md:items-center bg-gray-800 mt-[10vmax] text-white p-[2vmax]'>
        {/* Left footer */}
        <div className='flex flex-col mt-4 items-center gap-4 w-[20%]'> 
            <h4 className='font-bold text-sm'>DOWNLOAD OUR APP</h4>
            <p className='text-sm'>Download App for Andriod and IOS Devices</p>
            <img className='w-[10vmax] m-[1vmax] cursor-pointer' src={appStore} alt="appstore" />
            <img className='w-[10vmax] m-[1vmax] cursor-pointer' src={playStore} alt="playstore" />
        </div>

        {/* Mid footer */}
        <div className='w-[60%] flex flex-col items-center gap-4'>
            <h4 className='text-5xl font-bold text-red-600 my-4'>E-COMMERCE</h4>
            <p className='text-sm'>High Quality is out first Priority</p>
            <p className='text-sm'>Copyrights 2024 &copy; Ashu</p>
        </div>

        {/* Right footer */}
        <div className='flex flex-col items-center gap-3 w-[20%] '>
            <h4 className='my-4 text-2xl font-bold'>Follow Us</h4>
            <a className='hover:underline' target='_blank' href="https://instagram.com">Instagram</a>
            <a className='hover:underline' target='_blank' href="https://youtube.com">Youtube</a>
            <a className='hover:underline' target='_blank' href="https://facebook.com">Facebook</a>
        </div>
    </div>
  )
}

export default Footer
