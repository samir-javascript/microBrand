import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom'
import './styles.css'
import { BsBagCheckFill } from 'react-icons/bs';


import { runFireworks } from '../../utils/confetii';

const ThankYou = () => {
 
  
  useEffect(() => {
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Your order is being proccesed.</p>
        <p className="description">
          If you have any questions, please email
          <a className="email" href="mailto:order@example.com">
            order@example.com
          </a>
        </p>
        <div className='btn-tnk' href="/">
          <Link style={{textDecoration:'none'}} to='/'>
              <button className='btn-shipping' type="button">
                 Continue Shopping
             </button>
          </Link>
          <Link style={{textDecoration:'none'}}  to='/profile'>
          <button className='btn-shipping' type="button">
             view my orders
          </button>
          </Link>
          
        </div>
      </div>
    </div>
  )
}

export default ThankYou