import React from 'react';
import { IoChevronDown } from 'react-icons/io5';
import { FaUser, FaFirstOrder, FaRegHeart } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { Button, NavDropdown } from 'react-bootstrap';
import './styles.css';
import { logoutUser } from '../../slices/usersSlice';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Input from '../Input';
import { useLogoutUserMutation } from '../../slices/usersApi';
import MobileHeader from './MobileHeader';
import { clearCart, resetCart } from '../../slices/cartSlice';
import { useSelector, useDispatch } from 'react-redux';


const Header = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [Logout, { isLoading }] = useLogoutUserMutation();
 
 
  
  const handleLogout = async () => {
    try {
      await Logout().unwrap();
      dispatch(logoutUser());
      dispatch(resetCart());
      navigate('/login');
    
    } catch (error) {
      console.log(error);
    }
  };
  if (pathname === '/login' || pathname === '/register' || pathname === '/shipping' || pathname === '/payment')
    return null;
  return (
    <header className='header'>
      <nav className='nav-container'>
        {/* logo */}
        <Link to='/' className='logo-container'>
          <img className='logo' src='/images/logo1.png' alt='micro brand' />
        </Link>
        {/* search input */}
        <Input />
        <div className='header-option-container'>
          {!userInfo ? (
            <Link style={{ textDecoration: 'none', color: '#000' }} to='/login'>
              <Button
                className='m-0 px-4 py-3'
                style={{
                  color: '#000',
                  fontWeight: '600',
                  marginTop: '0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                type='button'
              >
                Sign up
              </Button>
            </Link>
          ) : (
            <NavDropdown title={'My account'} id='username'>
              <LinkContainer to='/profile'>
                <NavDropdown.Item>
                  <div className='dropdown-flex'>
                    <FaUser className='dropdown-icon' /> <span>Profile</span>
                  </div>
                </NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item>
                <div onClick={(e) => navigate('/profile')} className='dropdown-flex'>
                  <FaFirstOrder className='dropdown-icon' /> <span>My orders</span>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <div onClick={(e) => navigate('/browse-wishlist-products')} className='dropdown-flex'>
                  <FaRegHeart className='dropdown-icon' /> <span>My favourites</span>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <div onClick={handleLogout} className='dropdown-flex'>
                  <Button
                    className='m-0 px-4 py-3'
                    style={{
                      color: '#000',
                      fontWeight: '600',
                      marginTop: '0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    type='button'
                  >
                    Log out
                  </Button>
                </div>
              </NavDropdown.Item>
            </NavDropdown>
          )}
          {userInfo && userInfo.isAdmin && (
            <NavDropdown title='Admin'>
              <LinkContainer to='/admin/ordersList'>
                <NavDropdown.Item>Orders List</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/usersList'>
                <NavDropdown.Item>Users List</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/productsList'>
                <NavDropdown.Item>Products List</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          )}
          {userInfo && (
            <Link to='/profile' className='header-option-col'>
              <span className='span1'>Returns</span>
              <span className='span2'>& Orders</span>
            </Link>
          )}
          <Link style={{ color: '#fff' }} to='/cart' className='cart-container'>
            <MdOutlineAddShoppingCart className='cart-icon' />
            {cartItems && cartItems.length !== 0 && (
              <span className='cart-qty'>
                {Number(cartItems.reduce((acc, item) => acc + item.qty, 0))}
              </span>
            )}
          </Link>
        </div>
        {/* important links */}
        {userInfo && <MobileHeader handleLogout={handleLogout} />}
        {!userInfo && (
          <div className='mobile-usernone-cart'>
            <Link to='/login' style={{ textDecoration: 'none', margin: '0' }}>
              <Button
                className='m-0 px-4 py-3'
                style={{
                  color: '#000',
                  fontWeight: '600',
                  marginTop: '0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                type='button'
              >
                Log in
              </Button>
            </Link>
            <Link style={{ color: '#fff' }} to='/cart' className='cart-container'>
              <MdOutlineAddShoppingCart className='cart-icon' />
              {cartItems && cartItems.length > 0 && (
                <span className='cart-qty'>
                  {Number(cartItems.reduce((acc, item) => acc + item.qty, 0))}
                </span>
              )}
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
