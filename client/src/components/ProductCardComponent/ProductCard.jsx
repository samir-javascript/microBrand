import React, { useState } from 'react';
import Rating from '../RatingComponent/Rating';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addToCart } from '../../slices/cartSlice';
import { useGetWishlistProductsQuery, useRemoveFromWishlistMutation } from '../../slices/wishlistApi';
import { Tooltip } from 'react-bootstrap';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';

const ProductCard = ({ product, cancelWishlist}) => {
  const dispatch = useDispatch();
  const trancate = (string, n) => {
    return string.length > n ? string.substring(0, n) + '...' : string;
  };
  const { data: wishlist, refetch, isLoading: loadingWSL } = useGetWishlistProductsQuery();
  const pro = wishlist?.products.find(item => item._id === product._id);
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const { cartItems } = useSelector(state => state.cart);
  const { userInfo } = useSelector(state => state.auth);
  const existingQty = cartItems.find((item) => item._id === product._id)?.quantity || 0;
  const [qty, setQty] = useState(existingQty + 1);
  const tooltipStyle = {
    backgroundColor: '#2196F3', // Change the background color
    color: '#FFFFFF',           // Change the text color
    fontSize: '14px',           // Change the font size
    // Add more styles as needed
  };
  if (loadingWSL) {
    // Display a loading skeleton for the ProductCard
    return (
      <div className='card'>
        <div className='card-image'>
          <Skeleton height={250} />
        </div>
        <div className='info-card'>
          <Skeleton height={15} width='80%' />
          <Skeleton height={15} width='60%' />
          <Skeleton height={20} width='40%' />
        </div>
        <Skeleton height={20} width='50%' style={{ margin: '10px auto' }} />
      </div>
    );
  }

  const handleAddToCart = (e) => {
    e.stopPropagation();
    try {
      dispatch(addToCart({ ...product, qty: qty }));
      setQty((prevQty) => prevQty + 1);
      toast.success('Product added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add product to cart');
    }
  };

  /* remove from wishlist fn  */
  const removeFromWishlistHandler = async () => {
    try {
      await removeFromWishlist({
        userId: userInfo._id,
        productId: product._id
      }).unwrap();
      refetch();
      toast.success('product has been removed from wishlist');
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error?.error || error);
    }
  };

  return (
    <div className='card'>
      <Link to={`/products/${product._id}`} style={{ textDecoration: 'none' }}>
        <div className='card-image'>
          <img src={product.images[0]} alt={product.name} />
        </div>
      </Link>
      <div className='info-card'>
        <p className='product-info-name'>{trancate(product.name, 90)}</p>
       
          <Rating value={product.rating} text={product.numReviews} />
       
        <p className='price-info'>$ {product.price} </p>
      </div>
      {product.countInStock === 0 && (
        <p className='out-of-stack-text'>currently unavailable</p>
      )}
      {cancelWishlist && (
        <div onClick={removeFromWishlistHandler} className='rmv-wishlist'>
          {pro ? (
            <FaHeart
              cursor={'pointer'}
              data-tip="Remove from wishlist"
              data-for="my-tooltip"
            />
          ) : (
            <FaRegHeart
              cursor={'pointer'}
              data-tip="Remove from wishlist"
              data-for="my-tooltip"
            />
          )}
          <Tooltip id="my-tooltip" />
        </div>
      )}
      <button disabled={product.countInStock === 0} onClick={handleAddToCart}>
        add to cart
      </button>
    </div>
  );
};

export default ProductCard;



// <img alt="" class="EditorialTileImage__image__fCzoQ" src="https://m.media-amazon.com/images/S/stores-image-uploads-na-prod/6/AmazonStores/ATVPDKIKX0DER/1d83b8be80f5400c7c6812e62bcea89f.w3000.h800._CR0%2C0%2C3000%2C800_SX1500_.jpg" srcset="https://m.media-amazon.com/images/S/stores-image-uploads-na-prod/6/AmazonStores/ATVPDKIKX0DER/1d83b8be80f5400c7c6812e62bcea89f.w3000.h800._CR0%2C0%2C3000%2C800_SX840_.jpg 840w, https://m.media-amazon.com/images/S/stores-image-uploads-na-prod/6/AmazonStores/ATVPDKIKX0DER/1d83b8be80f5400c7c6812e62bcea89f.w3000.h800._CR0%2C0%2C3000%2C800_SX1280_.jpg 1280w, https://m.media-amazon.com/images/S/stores-image-uploads-na-prod/6/AmazonStores/ATVPDKIKX0DER/1d83b8be80f5400c7c6812e62bcea89f.w3000.h800._CR0%2C0%2C3000%2C800_SX1500_.jpg 1500w, https://m.media-amazon.com/images/S/stores-image-uploads-na-prod/6/AmazonStores/ATVPDKIKX0DER/1d83b8be80f5400c7c6812e62bcea89f.w3000.h800._CR0%2C0%2C3000%2C800_SX1920_.jpg 1920w, https://m.media-amazon.com/images/S/stores-image-uploads-na-prod/6/AmazonStores/ATVPDKIKX0DER/1d83b8be80f5400c7c6812e62bcea89f.w3000.h800._CR0%2C0%2C3000%2C800_SX3000_.jpg 3000w" sizes="(max-width: 840px) 100vw,(max-width: 1500px) 100vw,1500px" style="vertical-align:middle" data-feature="af" data-testid="image">