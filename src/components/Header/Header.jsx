import React from 'react'
import Timer from '../Timer/Timer'

const Header = () => {
  return (
    <div className=' flex flex-col justify-start sm:flex-row items-start sm:items-center gap-5 py-2 w-[100%] sm:justify-between '>
        <img src='/logo.png' alt='logo' className='ml-[-15px]'/>

        <div>
            <Timer durationInSeconds={60}/>
        </div>
    </div>
  )
}

export default Header