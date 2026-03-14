"use client"
import React from 'react'
import R3fSky from './components/R3fSky/page'
import { useRouter } from 'next/navigation'
// import { useNavigation } from "react-router-dom";
export const dynamic = "force-dynamic";
const HomePage = () => {
  const router = useRouter()
  // const navigate = useNavigation();
  return (
    <div className='flex justify-center items-center w-full'>
    <R3fSky />
    <div className=' flex flex-col justify-center items-center absolute m-auto'>
      <h1 className='text-3xl md:text-4xl font-bold text-center text-[#8b7933c9]  px-3 py-3 rounded-lg'>WelCome To Weather App</h1>
      <span className=' mt-5 px-4 py-4 bg-[#e0d0bc] select-none text-[#3f3409c9] font-semibold rounded-md cursor-pointer hover:bg-[#e7ccac]'
      onClick={()=>router.push("/weather")}
      onTouchStart={()=>router.push("/weather")}
    >Check Weather</span>
    </div>
    </div>
  )
}

export default HomePage

