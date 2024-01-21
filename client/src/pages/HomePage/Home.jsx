/* eslint-disable no-undef */
import React from 'react'
import './styles.css'
import { useParams } from 'react-router-dom'
//import products from '../../data/products'
import ProductCard from '../../components/ProductCardComponent/ProductCard'
import { useGetProductsQuery } from '../../slices/apiProducts'
import Banner from '../../components/bannerComponent/Banner'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Paginate from '../../components/PaginateComponent/Paginate'
import Category from '../../components/categoriesComponent/Category'
import SkeletonComponent from '../../components/SkeletonComponent'
import { Helmet } from 'react-helmet-async'
const Home = () => {
  const { pageNumber, keyword } = useParams()
  const { data, isLoading, isError, isLoadingProducts} = useGetProductsQuery({pageNumber, keyword})
 
   if (isLoading) {
    // Display a loading skeleton using react-loading-skeleton
    return (
      <div>
        <Skeleton height={500} count={1} 
           style={{opacity:'0.7', borderRadius:'5px', maxWidth:'1500px', margin:"20px auto", marginInline:'20px'}}
            className="fade-in-out-animation" /> 
            <div style={{marginBottom:'30px'}} className='card-grid-container'>
               <SkeletonComponent  products={8} />
            </div>
            
      </div>
    );
  }

  if(isError) {
   return <p>something went wrong</p>
  }
  return (
    <>
    {!keyword && <Banner />} 
    <Helmet>
        <title> {keyword ? `search results for ${keyword}` : 'Logitech for Creators - Empowering Your Creative Journey'} </title>
        <meta name='description' content='Unleash your creativity with Logitech for Creators, a dedicated line of tools and accessories designed to redefine the way content is created. Dive into a world where every detail matters, from crystal-clear audio to stunning video quality. Elevate your content creation experience with Logitech s innovative technology, crafted to meet the unique needs of creators like you. Whether you are a streamer, designer, or collaborator, Logitech for Creators is here to amplify your creative journey' />
    </Helmet>
    <div className='pro-carousel'>
       {keyword ? (
        <h2 style={{marginInline:'20px'}} className="profile-title">
            Search results for <span style={{color:'red'}}>"{keyword}"</span>
        </h2>
       ): (
        <h2 style={{marginInline:'20px', fontSize:'40px'}} className='profile-title'>What 's <span style={{color: 'rgb(255, 166, 0)', }}>New </span>?</h2>
       )}  

          <div className='card-grid-container'>
            
            {isLoadingProducts && <SkeletonComponent products={data?.products.length} />} 
              {data?.products ?  data?.products.slice(0,12).map(item => (
                <ProductCard  product={item} key={item._id} />
             )): (
               <p>no products</p>
             )}
             
             
          </div>
    </div>
    <Paginate pages={data.pages} page={data.page} keyword={keyword} />
    {!keyword && <Category />} 
   
    </>
  )
}

export default Home