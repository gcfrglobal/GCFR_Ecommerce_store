import React from 'react';

export default function FooterLinks() {
  return (
    <div>
      <div className="divide-y border border-gray-100"></div>
      <div className="lg:pt-16 lg:px-16 sm:px-12 px-12 lg:py-8 sm:py-12 py-8 flex flex-col items-center">
        <div className='flex flex-col justify-center items-center mb-20 w-[50%]'>
          <div className="mb-10 text-center">
            <h1 className='text-3xl mb-0'>Newsletter</h1>
            <p className="text-sm">
              Get timely updates on launches and promotions.
            </p>
          </div>
          <div className="flex flex-row gap-6 justify-between items-stretch w-full m-0">
            <input
              type="email"
              placeholder="email address"
              className="minor w-full outline-none outline-0 bg-white border-b-2 border-black rounded-lg py-3 pl-4 mb-0 mt-0"
            />
            <button className="bg-black px-12 border-black rounded-md cursor-pointer text-white flex gap-2 items-center justify-center">Send
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-6 sm:flex sm:flex-row sm:flex-wrap lg:gap-6 sm:gap-12">
          <div className="col-span-3 text-left text-black flex flex-col items-start justify-start pr-24">
            {/* <h1 className="font-bold text-2xl mb-3 mt-0">Golden Choice Fashion Resort</h1> */}
            
          </div>

          {/* LINKS */}
          <div className="flex flex-col items-start justify-start mt-0">
            <div className="text-left text-black border-black lg:mb-8 sm:mb-0 mt-0 border-l">
              <div className="ml-4">
                <h1 className="font-bold text-xl mb-3 mt-0">Links</h1>
                <ul key="index" className="flex flex-col text-sm gap-0">
                  <li>
                    <a href="/">
                      <p className="text-sm hover:font-bold">Home</p>
                    </a>
                  </li>
                  <li>
                    <a href="/collections/all">
                      <p className="text-sm hover:font-bold">Catalog</p>
                    </a>
                  </li>
                  <li>
                    <a href="/collections">
                      <p className="text-sm hover:font-bold">Collections</p>
                    </a>
                  </li>
                  <li>
                    <a href="/policies/privacy-policy">
                      <p className="text-sm hover:font-bold">Pricvacy Policy</p>
                    </a>
                  </li>
                  <li>
                    <a href="/policies/terms-of-service">
                      <p className="text-sm hover:font-bold">
                        Terms of Service
                      </p>
                    </a>
                  </li>
                  {/* <li><a href='/shipping-policy'><p className='text-sm'>Shipping Policy</p></a></li> */}
                  <li>
                    <a href="/pages/contact">
                      <p className="text-sm hover:font-bold">Contact</p>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CONTACT */}
          <div className="flex flex-col items-start justify-start mt-0">
            <div className="text-left text-black border-black border-l mt-0">
              <div className="ml-4">
                <h1 className="font-bold text-xl mb-3 mt-0">Contact</h1>
                <ul className="flex flex-col text-sm">
                  <li>
                    <p className="text-sm">goldenchoicefr@gmail.com</p>
                  </li>
                  <li>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </li>
                  <li>
                    <p className="text-sm">Phone: +234 703 917 7508</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
