import {useState, useEffect} from 'react';
// import {useShopQuery, gql} from '@shopify/hydrogen';
import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import { Footer } from '~/components/Footer';
import FooterLinks from '~/components/FooterLinks';
import { sliderContent } from '~/components/sliderContent';
import Slider from '~/components/Slider';
import Swiper from 'swiper';
import { SwiperSlide } from 'swiper/react';


/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'GCFR Stores | Home'}];
};

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({...deferredData, ...criticalData});
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {LoaderFunctionArgs}
 */
async function loadCriticalData({context}) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    // featuredCollection: collections,
    featuredCollection: collections.nodes[0],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {LoaderFunctionArgs}
 */
function loadDeferredData({context}) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();

  return (
    <div className=''>
      {/* Slider */}
      <div className='mt-32'>
        <Slider />
      </div>

      {/* Featured Products */}
      <div className='z-10 relative py-10 px-16'>
        <FeaturedCollection collections={data.featuredCollection} />
      </div>

      <div className='z-10 relative py-10 px-16'>
        <RecommendedProducts products={data.recommendedProducts} />
      </div>

      <div className='z-10 relative py-10 px-16'>
      <TabComponent products={data.recommendedProducts} />
      </div>
      
      <div className='z-10 relative'>
        <FooterLinks/>
        <Footer />
      </div>
    </div>
  );
}

function TabComponent({products}) {
  let index = 0
  const tabs = [
    'All Products',
    'Perfect Groom',
    'Gentleman',
    'Modern Man',
  ];

  const tabMessages = {
    'All Products': 'Browse our full range of exclusive fashion pieces.',
    'Perfect Groom': 'Find premium shirts for every occasion.',
    'Gentleman': 'Traditional elegance meets modern style in our Kaftans.',
    'Modern Man': 'Step out in regal style with our Agbada collections.',
  };
  
  const [activeTab, setActiveTab] = useState(tabs[index]);
  

  // Dummy logic for category matching — assumes product.title or tags contain category keywords
  const filteredProducts = products?.products?.nodes.filter((product) => {
    if (activeTab === tabs[index]) return true;
    return (
      product.title.toLowerCase().includes(activeTab.toLowerCase()) ||
      product.tags?.some(tag => tag.toLowerCase().includes(activeTab.toLowerCase()))
    );
  });
  console.log('Active tab:', activeTab);

  return (
    <div>
      <h2 className='text-black text-center lg:pt-24 sm:pt-12 font-semibold lg:text-5xl text-5xl lg:mb-8 sm:mb-2'>Smart Collections For You</h2>
      <p className='uppercase text-gray-400 text-md text-center'>Browse our full range of exclusive fashion pieces.</p>
      <div className="flex flex-wrap justify-center gap-4 mb-8 mt-12">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-6 py-2 rounded-full border transition-all duration-300 text-sm md:text-base font-medium ${
              activeTab === tab
                ? 'bg-black text-white border-black'
                : 'bg-white text-black border-gray-300 hover:border-black'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="text-center text-xl font-semibold mb-6">
        {tabMessages[activeTab]}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts?.map((product) => (
          <Link key={product.id} to={`/products/${product.handle}`} className="text-center">
            <Image
              data={product.images.nodes[0]}
              aspectRatio="1/1"
              sizes="50vw"
              className="rounded-lg border"
            />
            <h4 className="mt-2 font-medium">{product.title}</h4>
            <small className="text-gray-600">
              <Money data={product.priceRange.minVariantPrice} />
            </small>
          </Link>
        ))}
      </div>
    </div>
  );
}


// function TabComponent({products}) {
//   const tabs = [
//     'All Products',
//     'Shirts',
//     'Suits',
//     'Kaftan',
//     'Agbada',
//     'Pant Trousers',
//   ];

//   const tabMessages = {
//     'All Products': 'Browse our full range of exclusive fashion pieces.',
//     'Shirts': 'Find premium shirts for every occasion.',
//     'Suits': 'Explore our tailored suits for that sharp look.',
//     'Kaftan': 'Traditional elegance meets modern style in our Kaftans.',
//     'Agbada': 'Step out in regal style with our Agbada collections.',
//     'Pant Trousers': 'Comfort meets class in our pant trousers collection.',
//   };
  
//   const [activeTab, setActiveTab] = useState(tabs[1]);

//   return (
//     <div>
//       <div className="flex flex-wrap justify-center gap-4 mb-8">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             className={`px-6 py-2 rounded-full border transition-all duration-300 text-sm md:text-base font-medium ${
//               activeTab === tab
//                 ? 'bg-black text-white border-black'
//                 : 'bg-white text-black border-gray-300 hover:border-black'
//             }`}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       <div className="text-center text-xl font-semibold">
//         {tabMessages[activeTab]}
//       </div>


//     </div>
//   )
// }

/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */
function FeaturedCollection({collections}) {
  if (!collections) return null;
  const image = collections?.image;
  return (
    <div className='flex justify-between items-start gap-12'>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={collections}>
        {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.collections.nodes.map((coll) => (
                    <Link to={`/collections/${collection.handle}`} key={collection.id}>
                      {image && (
                        <div className="featured-collection-image">
                          <Image data={image} sizes='50vw' className='w-24 h-auto border border-amber-300' />
                        </div>
                      )}
                      <h1>{collection.title}</h1>
                    </Link>
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <Link
        className={`featured-collection w-64`}
        to={`/collections/${collections.handle}`}
      >
        {image && (
          <div className="featured-collection-image">
            <Image data={image} sizes='50vw' className='w-24 h-auto border border-amber-600' />
          </div>
        )}
        <h1>{collections.title}</h1>
      </Link>
    </div>
  );
}

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery | null>;
 * }}
 */
function RecommendedProducts({products}) {
  return (
    <div className="recommended-products lg:pb-32 sm:pb-24 z-0">
      <h2 className='text-black text-center lg:pt-24 sm:pt-12 font-semibold lg:text-5xl text-5xl lg:mb-4 sm:mb-2'>Recommended Products</h2>
      <p className='uppercase text-gray-400 text-lg text-center'>Carefully Chosen For You</p>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid mt-12">
              {response
                ? response.products.nodes.map((product) => (
                    <Link
                      key={product.id}
                      className="recommended-product"
                      to={`/products/${product.handle}`}
                    >
                      <Image
                        data={product.images.nodes[0]}
                        aspectRatio="1/1"
                        sizes="50vw"
                      />
                      <div className='flex flex-col gap-1 mt-4'>
                        <h4 className='font-normal text-md'>{product.title}</h4>
                        <h4 className='font-medium text-lg'>
                          <Money data={product.priceRange.minVariantPrice} />
                        </h4>
                      </div>
                    </Link>
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 3, sortKey: UPDATED_AT, reverse: false) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 10, sortKey: UPDATED_AT, reverse: false) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;



/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
