import Image from 'next/image'
import React from 'react'

const NavBar = () => {
  return (
    <>
        <div className='flex px-10 my-4 gap-10 items-center justify-between border-b border-gray-200 pb-4'>
            <Image src="/dfund.svg" alt="Logo" width={200} height={50} className='h-10 ml-0'/>
            <div className='flex gap-15 items-center'>
                <ul className='flex gap-10'>
                    <li><a href="/explore" className='hover:text-orange-400'>Explore</a></li>
                    <li><a href="/how-it-works" className='hover:text-orange-400'>How It Works</a></li>
                    <li><a href="/non-profits" className='hover:text-orange-400'>For NonProfits</a></li>
                </ul>
                <ul className='flex gap-10 items-center'>
                  <li><button className='hover:text-orange-400 cursor-pointer'>Sign In</button></li>
                  <li><button className='bg-white text-black p-2 rounded-lg cursor-pointer hover:bg-gray-200 hover:text-orange-800'>Start a Campaign</button></li>
                </ul>
            </div>
        </div>
    </>
  )
}

export default NavBar