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
      
      {/* <div className='divide-y border'></div> */}
      <div className='z-10 relative'>
        <FooterLinks/>
        <Footer />
      </div>
    </div>
  );
}

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
      {/* <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={collections}>
        {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.collections.nodes.map((coll) => (
                    <Link to={`/collections/${coll.handle}`} key={coll.id}>
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
      </Suspense> */}
      <Link
        className={`bg-{} featured-collection w-64`}
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
      <h2 className='dark:text-white text-black text-center lg:pt-24 sm:pt-12 font-bold lg:text-5xl text-5xl lg:mb-4 sm:mb-2'>Recommended Products</h2>
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
                        sizes="(min-width: 45em) 20vw, 50vw"
                      />
                      <h4>{product.title}</h4>
                      <small>
                        <Money data={product.priceRange.minVariantPrice} />
                      </small>
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
