import React from 'react';

export default function FooterLinks() {
  return (
    <div>
      <div className="divide-y border"></div>
      <div className="lg:pt-16 lg:px-16 sm:px-12 px-20 lg:py-8 sm:py-12 py-8 bg-white bg-cover bg-no-repeat bg-center">
        <div className="lg:grid lg:grid-cols-6 sm:flex sm:flex-row sm:flex-wrap lg:gap-6 sm:gap-12">
          <div className="col-span-3 text-left text-black flex flex-col items-start justify-start pr-24">
            <h1 className="font-bold text-2xl mb-3 mt-0">Golden Choice Fashion Resort</h1>
            <p className="text-sm mb-3">
              Enter your email to receive updates on launches and promotions. NO spam, we promise.
            </p>
            <div className="flex flex-row justify-between outline-0 bg-white border border-black rounded-lg w-full">
              <input
                type="email"
                placeholder="email address"
                className="minor w-full text-gray-800 outline-none placeholder-none border-none contrast-more:border-none contrast-more:placeholder-none py-1"
              />
              <button className="bg-black px-6 border-black rounded-r-md">
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

          {/* SUPPORT */}
          <div className="flex flex-col lg:items-center sm:items-start justify-start mt-0">
            <div className="text-left text-black border-black border-l mt-0">
              <div className="ml-4">
                <h1 className="font-bold text-xl mb-3 mt-0">Support</h1>
                <ul className="flex flex-col text-sm">
                  <li>
                    <p className="text-sm hover:font-bold">Corporate Gifting</p>
                  </li>
                  <li>
                    <p className="text-sm hover:font-bold">Manage Order</p>
                  </li>
                  <li>
                    <p className="text-sm hover:font-bold">Refer a Friend</p>
                  </li>
                  <li>
                    <p className="text-sm hover:font-bold">Support</p>
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
