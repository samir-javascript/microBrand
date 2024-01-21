import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'
const EmptyCart = () => {
  return (
    
        <div className='empty-cart-container'>
         <div className='empty-cart-info-container'>
         <img className='empty-cart-image' src="/images/empty-cart-image.svg" alt="empty cart" />
            <div className='empty-cart-info'>
               <p className='p1'>Your cart is empty</p>
               <p className='p2'>Thousands of products are waiting to seduce you!</p>
            </div>
         </div>
           <Link to='/' className='empty-cart-button'>
                <button>Continue shopping</button>
           </Link>
            
        </div>
     )
  
}

export default EmptyCart