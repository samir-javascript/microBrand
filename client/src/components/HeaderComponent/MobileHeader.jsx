import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MegaMenu from './MegaMenu';

const MobileHeader = ({ handleLogout }) => {
  const { pathname } = useLocation();
  const [activeSubMenu, setActiveSubMenu] = useState(null);
 

  const navtoggle = () => {
    const btn = document.getElementById('menu-btn');
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('overlay');
    
    btn.classList.toggle('open');
    overlay.classList.toggle('overlay-show');
    document.body.classList.toggle('stop-scrolling');
  
    menu.classList.toggle('show-menu');

    // Add click event listener to the body
    document.body.addEventListener('click', closeMenuOnClick);
  };

  const closeMenuOnClick = (event) => {
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('overlay');

    const btn = document.getElementById('menu-btn');

    if ( !menu.contains(event.target) && event.target.id !== 'menu-btn' ) {
      // Close the menu
      btn.classList.remove('open');
      overlay.classList.remove('overlay-show');
      document.body.classList.remove('stop-scrolling');
      menu.classList.remove('show-menu');

      // Remove the click event listener from the body
      document.body.removeEventListener('click', closeMenuOnClick);
    }
  };
 


  useEffect(() => {
    const btn = document.getElementById('menu-btn');
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('overlay');

    btn.classList.remove('open');
    
    document.body.classList.remove('stop-scrolling');
    overlay.classList.remove('overlay-show');
    menu.classList.remove('show-menu');
      
    // Add click event listener to the body
  }, [pathname]);

  const handleShowSubLinks = (subLinkId) => {
    setActiveSubMenu((prev) => (prev === subLinkId ? null : subLinkId));
  };

  return (
    <div className='mobile-header'>
      <MegaMenu 
         handleLogout={handleLogout} 
         handleShowSubLinks={handleShowSubLinks} 
         activeSubMenu={activeSubMenu}/>
      <button onClick={navtoggle} type='button' id='menu-btn' className='hamburger'>
        <span className="hamburger-top"></span>
        <span className="hamburger-middle"></span>
        <span className="hamburger-bottom"></span>
      </button>
    </div>
  );
};

export default MobileHeader;
