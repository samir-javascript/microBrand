import React from 'react'
import { Button } from 'react-bootstrap'
import { FaChevronRight, FaHeart, FaMusic, FaUser } from 'react-icons/fa'
import { TbShoppingCartDollar } from 'react-icons/tb'
import { IoGameController } from "react-icons/io5";
import { FaPodcast } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import { CiShoppingTag} from 'react-icons/ci'
import { useSelector } from 'react-redux'
import { MdOutlineContentCut, MdProductionQuantityLimits} from 'react-icons/md'
const MegaMenu = ({handleShowSubLinks, handleLogout,activeSubMenu}) => {
    const {userInfo} = useSelector(state => state.auth)
  return (
    <div id='mobile-menu' className='mobile-main-menu'>
    <ul>
        { /* first items */}
        {userInfo &&(

       
      <li>
        <Link
          onClick={() => handleShowSubLinks('account1')}
          className='link-dropdown'
          to='#'
        >
          My account{' '}
          <FaChevronRight
            className={`chevron-icon ${
              activeSubMenu === 'account1' ? 'rotate-icon' : ''
            }`}
          />
        </Link>
        <ul
          className={`sublinks-wrapper ${
            activeSubMenu === 'account1' ? 'show-sublinks' : ''
          }`}
        >
          <li className='sublink-container'>
            <Link className='sub-link-dropdown' to='/profile'>
              <FaUser color='#000' size={22} /> Profile
            </Link>
          </li>
          <li className='sublink-container'>
            <Link className='sub-link-dropdown' to='/profile'>
              <TbShoppingCartDollar color='#000' size={22} /> My orders
            </Link>
          </li>
          <li className='sublink-container'>
            <Link
              className='sub-link-dropdown'
              to='/browse-wishlist-products'
            >
              <FaHeart color='#000' size={22} /> My Favourites
            </Link>
          </li>
        
          <li className='sublink-container'>
            <Link to='#' onClick={handleLogout} className='dropdown-flex'>
              <Button
                className='m-0 px-4 py-3'
                style={{
                  color: '#000',
                  fontWeight: '600',
                  marginTop: '0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration:'none'
                }}
                type='button'
              >
                Log out
              </Button>
            </Link>
          </li>
        </ul>
      </li>
 )}
      {/*   { /* second items  */}
      {userInfo && userInfo.isAdmin && (

      
      <li>
        <Link
          onClick={() => handleShowSubLinks('account2')}
          className='link-dropdown'
          to='#'
        >
          Admin{' '}
          <FaChevronRight
            className={`chevron-icon ${
              activeSubMenu === 'account2' ? 'rotate-icon' : ''
            }`}
          />
        </Link>
        <ul
          className={`sublinks-wrapper ${
            activeSubMenu === 'account2' ? 'show-sublinks' : ''
          }`}
        >
          {/* Sub-links for "Another item" */}
          <li className='sublink-container'>
            <Link className='sub-link-dropdown' to='/admin/productsList'>
              <MdProductionQuantityLimits color='#000' size={22} /> Products list
            </Link>
          </li>
          <li className='sublink-container'>
            <Link
              className='sub-link-dropdown'
              to='/admin/usersList'
            >
              <FaUser color='#000' size={22} /> Users list
            </Link>
          </li>
          <li className='sublink-container'>
            <Link
              className='sub-link-dropdown'
              to='/admin/ordersList'
            >
              <CiShoppingTag  color='#000' size={22} /> Orders list
            </Link>
          </li>
        </ul>
      </li>
      )}
      <li>
        <Link
          onClick={() => handleShowSubLinks('account3')}
          className='link-dropdown'
          to='#'
        >
          categories{' '}
          <FaChevronRight
            className={`chevron-icon ${
              activeSubMenu === 'account3' ? 'rotate-icon' : ''
            }`}
          />
        </Link>
        <ul
          className={`sublinks-wrapper ${
            activeSubMenu === 'account3' ? 'show-sublinks' : ''
          }`}
        >
          {/* Sub-links for "Another item" */}
          <li className='sublink-container'>
            <Link className='sub-link-dropdown' to='/category/music-makers'>
              <FaMusic color='#000' size={22} /> music makers
            </Link>
          </li>
          <li className='sublink-container'>
            <Link
              className='sub-link-dropdown'
              to='/category/content-creators'
            >
              <MdOutlineContentCut color='#000' size={22} /> content creators
            </Link>
          </li>
          <li className='sublink-container'>
            <Link
              className='sub-link-dropdown'
              to='/category/podcastors'
            >
              <FaPodcast color='#000' size={22} /> podcasters
            </Link>
          </li>
          <li className='sublink-container'>
            <Link
              className='sub-link-dropdown'
              to='/category/gaming-streams'
            >
              <IoGameController color='#000' size={22} /> gaming & straming
            </Link>
          </li>

        </ul>
          
          {userInfo && (
            <Link to='/cart'>
            <button style={{background:'#000' , color:'white', borderRadius:'10px', height:'40px', fontSize:'18px'}} >
                View cart
            </button>
            </Link>
          )}
      </li>
    </ul>

  </div>
  )
}

export default MegaMenu