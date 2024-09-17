import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-pink-300 text-black py-2">
        <div className="logo">
            <span className='font-bold text-xl mx-9'>iTask</span>
        </div>
        <ul className="flex gap-5 mx-9">
            <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
            <li className='cursor-pointer hover:font-bold transition-all' >Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>About Us</li>
        </ul>
    </nav>
  )
}

export default Navbar
