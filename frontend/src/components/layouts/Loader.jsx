import React from 'react'

function Loader() {
  return (
    <div className='w-[100vw] h-[100vh] bg-white grid place-items-center max-w-full'>
        <div className='w-[10vw] h-[10vw] animate-spin border-b-2 sm:border-b-4 border-gray-800 rounded-full '></div>
    </div>
  )
}

export default Loader
