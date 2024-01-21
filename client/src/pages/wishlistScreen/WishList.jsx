import React from 'react'
import './styles.css'
import { Container } from 'react-bootstrap'
import ProductCard from '../../components/ProductCardComponent/ProductCard'
import Message from '../../components/MessageComponent/Message'
import { Link } from 'react-router-dom'
import { useGetWishlistProductsQuery } from '../../slices/wishlistApi'

const Wishlist = () => {
  
    const {data: wishlistPro } = useGetWishlistProductsQuery()
   
  return (
    <Container className='my-5'>
        <h2 className='profile-title' style={{marginBottom:'45px'}}>My wishlist Products</h2>
        {wishlistPro?.products.length === 0  || wishlistPro === null ? (
            <>
            <Message variant='danger'> 
                There are no items in your wishlist
            </Message>
            <Link to='/'>
                <button style={{width:'200px', height:'40px',
                 borderRadius:'15px', 
                 fontWeight:'600'}} className='login-btn'>
                    Browse Products
                </button>
            </Link>
            </> 
          ): (
            <div className='card-grid-container'>
            
            {wishlistPro?.products.map(product =>(
              
                  <ProductCard  cancelWishlist product={product} key={product._id} />
            ))}
            </div>
           )}
        
    </Container>
  )
}

export default Wishlist