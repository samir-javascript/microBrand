import React from 'react'
import { FaFacebook, FaTwitter, FaAmazon, FaInstagram, FaYoutube } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './styles.css'
const Footer = () => {
  return (
    <footer>
         <div className='footer-container'>
            <div className='footer-wrapper'>
               
                    <img className='logo-footer'  src="/images/logo1.png" alt="logiTech" />
               
               
                 <div className='footer-statement'>
                     <p>&copy; 2024 LogiTech for creators all rights are reserved.</p>
                 </div>
                 <div className="social-icons">
                      <Link to='https://www.facebook.com'>
                          <FaFacebook />
                      </Link>
                      <Link to='https://www.twitter.com'>
                          <FaTwitter />
                      </Link>
                      <Link to='https://www.amazon.com'>
                          <FaAmazon />
                      </Link>
                      <Link to='https://www.youtube.com'>
                          <FaYoutube />
                      </Link>
                      <Link to='https://www.instagram.com'>
                          <FaInstagram />
                      </Link>
                 </div>
            </div>
         </div>
    </footer>
  )
}

export default Footer