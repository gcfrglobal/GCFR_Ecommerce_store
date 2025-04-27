import React, { useState, useEffect } from 'react';
import { Link } from '@remix-run/react';
import { sliderContent } from './sliderContent';
import { Image } from '@shopify/hydrogen';

export default function Slider() {
  const [count, setCount] = useState(0);

  const classItem = ['slider1', 'slider2', 'slider3'];

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => (prev + 1) % classItem.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = (e) => {
    e.preventDefault();
    setCount((prev) => (prev - 1 + classItem.length) % classItem.length);
  };

  const handleNextSlide = (e) => {
    e.preventDefault();
    setCount((prev) => (prev + 1) % classItem.length);
  };

  const currentSlide = classItem[count];

  return (
    <div className=''>
      <div className='overflow-hidden w-full sm:h-[400px] h-[400px] lg:h-[550px]'>
        <div className={`${currentSlide} transition-all duration-1000 flex w-[4475px] gap-[5px]`}>
          {sliderContent.map((item, id) => (
            <div key={id} className="flex relative transition-all duration-1000">
              <img alt="itemImage" src={item.image} className="w-[2000px] h-[550px] object-cover lg:object-top sm:object-top bg-cover flex flex-row" />
              
              <div className="flex flex-col lg:justify-between items-start sm:justify-between text-left w-full absolute text-white top-1/3 ltr:left-10 rtl:right-10 px-0 lg:px-4 lg:-mt-20 sm:-mt-40">
                <div className='lg:ml-24 text-wrap lg:w-[60%]'>
                  <h1 className="lg:text-7xl text-5xl font-bold lg:mb-10 sm:mb-2">{item.title}</h1>
                </div>

                <div className='flex flex-row justify-between items-center w-full lg:px-0 px-0 absolute lg:mt-36 sm:mt-[100px]'>
                  <div className='prevSlide absolute left-0 bg-white px-2 py-3 rounded-full text-black flex items-center'>
                    <button onClick={handlePrevSlide}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="lg:w-8 lg:h-6 sm:w-6 sm:h-12 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                  </div>
                  <div className='nextSlide absolute right-28 bg-white px-2 py-3 rounded-full text-black flex items-center'>
                    <button onClick={handleNextSlide}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="lg:w-8 lg:h-6 sm:w-6 sm:h-12 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className='lg:w-1/2 sm:w-2/3 lg:ml-24'>
                  <p className="sm:mt-0 lg:text-xl text-sm sm:text-sm mt-1 text-left sm:block lg:block hidden font-regular">
                    {item.slug}
                  </p>
                </div>

                <div className='lg:ml-24 mt-8 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>
                  <Link to='/collections/all' className="flex flex-row lg:flex-row items-center justify-center font-semibold sm:text-sm cta-btn uppercase mt-4 bg-white hover:bg-black border border-white lg:px-4 lg:py-2 sm:py-1 sm:px-2 rounded-lg text-sm lg:gap-2 sm:gap-1 cursor-pointer cta-btn text-black hover:text-white fill-black hover:fill-white">
                    <span>Browse Our Catalog</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
