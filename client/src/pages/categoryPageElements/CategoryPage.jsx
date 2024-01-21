import React from 'react'
import './styles.css'
import { useParams } from 'react-router-dom'
import { useGetProductsByCatgoriesQuery } from '../../slices/apiProducts'
import Message from '../../components/MessageComponent/Message'
import Loading from '../../components/LoadingComponent/Loading'
import { Image } from 'react-bootstrap'
import { categoryNames } from '../../constants'
import ProductCard from '../../components/ProductCardComponent/ProductCard'
const CategoryPage = () => {
    const { categoryName } = useParams()
    const imageBanner = categoryNames.find(item => item.name === categoryName)
    const {data:products, isLoading, isError} = useGetProductsByCatgoriesQuery(categoryName)
   
    if(isLoading) return <Loading />
    if(isError) return <Message variant='danger'>something went wrong</Message>
  return (
    <div className='category-page'>

       <div className='img-category-wrapper'>
         <Image  fluid  src={imageBanner.imageBanner} alt={categoryName} />
       </div>
        
         <div className='category-banner-statement'>
            <p>Selection of products adapted to</p>
            <h3> your specific needs</h3>
         </div>
         <div className='card-grid-container'>
              {products ?  products.map(item => (
                 <ProductCard product={item} key={item._id} />
              )): (
                <p>no products</p>
              )}
          </div>
    </div>
  )
}

export default CategoryPage