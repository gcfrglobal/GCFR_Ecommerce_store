import React from 'react'
import { Link } from '@remix-run/react'
import { sliderContent } from './sliderContent'
import { useState, useEffect } from 'react'
import { Image } from '@shopify/hydrogen'

export default function Slider() {
    const [count, setCount] = useState(0)
    const [ currentSlide, setCurrentSlide ] = useState('slider1')

    const classItem = ['slider1', 'slider2', 'slider3']

    useEffect(() => {
      const timer = setInterval(() => {
      setCurrentSlide(classItem[count])
      if(count === 2) {
        setCount(0)
      } else {
        setCount(count + 1)
      }
      }, 2000);
      return () => clearInterval(timer);
     })

    const handlePrevSlide = (e) => {
      e.preventDefault();
      setCurrentSlide(classItem[count - 1])
      if(count === 2) {
        setCount(0)
      } else {
        setCount(count - 1)
      }
      console.log(count)
    }

    const handleNextSlide = (e) => {
      e.preventDefault();
      setCurrentSlide(classItem[count + 1])
      if(count === 2) {
        setCount(0)
      } 
      else {
          setCount(count + 1)
        }
      console.log(count)
    }

  return (
  <div className=''>
    <div className='overflow-hidden w-full sm:h-[400px] h-[400px] lg:h-[550px]'>
      <div className={`${currentSlide} transition-all duration-1000 flex w-[4490px]`}>
        {sliderContent.map((item) => {
          return (
          <div key={item.name} className={`flex relative transition-all duration-1000`}>
            <img alt="itemImage" src={item.image} className="lg:bg-center bg-center sm:bg-bottom w-[2000px] h-[550px] object-cover lg:object-center object-center sm:object-bottom bg-cover flex flex-row" />

            <div className="flex flex-col lg:justify-between lg:items-start sm:justify-between sm:items-center text-left w-full absolute text-white top-1/3 ltr:left-24 rtl:right-24 px-0 lg:px-4 lg:-mt-20 sm:-mt-40">
                <div className='lg:ml-24 text-wrap lg:w-[60%]'>
                  <h1 className="lg:text-7xl text-5xl font-bold lg:mb-10 sm:mb-2">{item.title}</h1>
                </div>
                <div className='flex flex-row justify-between items-center text-white w-full lg:px-8 px-0 absolute lg:mt-32 sm:mt-[100px]'>
                    <div className='prevSlide'>
                        <button onClick={handlePrevSlide}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="lg:w-12 lg:h-12 sm:w-12 sm:h-12 cursor-pointer"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg></button>
                    </div>
                    <div className='nextSlide'>
                        <button onClick={handleNextSlide}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="lg:w-12 lg:h-12 sm:w-12 sm:h-12 cursor-pointer"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg></button>
                    </div>
                </div>
                <div className='lg:w-1/2 sm:w-2/3 lg:ml-24'>
                    <p className="sm:mt-0 lg:text-xl text-sm sm:text-sm mt-1 text-left sm:block lg:block hidden font-regular">
                        {item.slug}
                    </p>
                </div>
                <div className='lg:ml-24 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 '>
                  <Link to='/collections/' className="flex flex-row lg:flex-row items-center justify-center font-semibold sm:text-sm cta-btn uppercase mt-4 bg-white hover:bg-black border border-white lg:px-4 lg:py-2 sm:py-1 sm:px-2 rounded-lg text-sm lg:gap-2 sm:gap-1 cursor-pointer cta-btn text-black hover:text-white fill-black hover:fill-white">
                    <span>Browse Our Catalog</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" /></svg>
                  </Link>
                </div>
            </div>
          </div>
        ); 
        })}
      </div>
    </div>
    </div>
    
  )
}
