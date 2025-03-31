/* eslint-disable prettier/prettier */
import { useState, useEffect } from "react";
import { defer } from "@shopify/remix-oxygen";


export async function loader({context}) {
    const {storefront} = context;
    // const {collections} = await storefront.query(FEATURED_COLLECTION_QUERY);
    // const featuredCollection = collections.nodes[0];
    const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);

  return defer({recommendedProducts});
}

export default function FeaturedProducts({products}) {
    const [featuredItems, setFeaturedItems] = useState('ProductItems')
    const [featuredImages, setFeaturedImages] = useState('shopList')
    
    useEffect(() => {
        setFeaturedItems(featuredItems)
        setFeaturedImages(featuredImages)
    }, [featuredItems, featuredImages])
    
  return (
    <section className='featured dark:bg-black bg-white lg:pt-32 pt-24'>
        <div>
            <h1 className='dark:text-white text-black text-center lg:pt-24 sm:pt-16 font-bold lg:text-6xl text-5xl lg:mb-4 sm:mb-2'>Featured Products</h1>
            <p className='uppercase text-gray-400 lg:text-sm text-sm text-center lg:mb-16 mb-12'>Bespoke Dresses </p>
        </div>
    </section>
  )
}



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
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

