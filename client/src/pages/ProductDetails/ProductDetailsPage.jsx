import React, { useState, useEffect } from 'react';
import './styles.css';
import { useCreateReviewMutation } from '../../slices/apiProducts';
import { useAddToWishlistMutation, useGetWishlistProductsQuery } from '../../slices/wishlistApi';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Row, Col, ListGroup, Form } from 'react-bootstrap';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Message from '../../components/MessageComponent/Message';
import Rating from '../../components/RatingComponent/Rating';
import { useGetSingleProductQuery } from '../../slices/apiProducts';
import { addToCart } from '../../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: productId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);

  const { data: product, isLoading, isError, refetch } = useGetSingleProductQuery(productId);
  const { data: wishlist, isLoading: loadingWishlist, isError: errorWishlist, refetch: refetchWishlistProduct } =
    useGetWishlistProductsQuery();
  const [addToWishlist, { isLoading: loadingAdding, isError: errorAdding }] = useAddToWishlistMutation();


  const pro = wishlist?.products.find((item) => item._id === productId);

  const [selectedImage, setSelectedImage] = useState('');
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [createReview, { isLoading: loadingReview }] = useCreateReviewMutation();

  // Update selected image when product changes
  useEffect(() => {
    // Check if product and product.images are available
    if (product && product.images && product.images.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  const handleThumbnailClick = (thumbnail) => {
    setSelectedImage(thumbnail);
  };

  /** tooltip styles */
  const tooltipStyle = {
    backgroundColor: '#FFD814', // Change the background color
    color: '#111001',
    border: '1px solid #FCD200', // Change the text color
    fontSize: '14px', // Change the font size
    // Add more styles as needed
  };

  /** truncate text... function */
  const truncate = (string, n) => {
    return string.length > n ? string.substring(0, n) + '...' : string;
  };

  /* create a wishlist addition function */
  const handleAddToWishlist = async () => {
    if (errorAdding) {
      toast.error(errorAdding?.data?.message || errorAdding?.error);
      return;
    }
    if (userInfo) {
      try {
        await addToWishlist({
          userId: userInfo._id,
          productId,
        }).unwrap();
        refetchWishlistProduct();
        if (!pro) {
          toast.success('item Added To your Wishlist');
          navigate('/browse-wishlist-products');
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.data?.message || error?.error || error);
      }
    } else {
      navigate('/login');
    }
  };

  /* create a product review function */
  const handleCreateReview = async (e) => {
    e.preventDefault();
    try {
      const res = await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      if (res.error) {
        toast.error(res.error?.data?.message || res?.error?.error);
        return;
      } else {
        refetch();
        setComment('');
        setRating(0);
        toast.success('Review has been created');
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error?.error || error);
    }
  };

  /** add to cart function */
  const handleAddToCart = async () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  /* error handler */
  if (isError) {
    return <p>something bad has happened!</p>;
  }

  return (
    <div className='row-container'>
      <>
      <Helmet>
                  <title>Logitech for creatots | {product?.name || ""} </title>
                   <meta name='description' content={product?.description || ""} />
              </Helmet> 
        <Row className='justify-content-md-center m-3'>
          <Col className='mb-3' md={5}>
            <div className='image-gallery'>
              <div className='main-image'>
                {isLoading ? (
                  <Skeleton  style={{opacity:'0.7'}} height={350} width={350} />
                ) : (
                  <img src={selectedImage} alt='Main' />
                )}
              </div>
              <div className='thumbnail-gallery'>
                {isLoading ? (
                  <div style={{ display: 'flex', gap: '10px' }}>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton  style={{opacity:'0.7'}} key={index} borderRadius={'5px'} height={100} width={100} />
                  ))}
                </div>
                ) : (
                  product?.images.map((thumbnail, index) => (
                    <img
                      key={index}
                      src={thumbnail}
                      alt={`Thumbnail ${index}`}
                      className={thumbnail === selectedImage ? 'selected ' : ''}
                      onClick={() => handleThumbnailClick(thumbnail)}
                    />
                  ))
                )}
              </div>
            </div>
          </Col>
          <Col md={7}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                {isLoading ? (
                  <Skeleton  style={{opacity:'0.7'}} height={30} />
                ) : (
                  <h3 className='product-name'>{product.name}</h3>
                )}

              </ListGroup.Item>
             
              <ListGroup.Item>
                {isLoading ? (
                  <Skeleton  style={{opacity:'0.7'}} />
                ) : (
                  <Rating value={product?.rating} text={`(${product.numReviews})`} />
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Price</strong>: {isLoading ? <Skeleton  style={{opacity:'0.7'}} /> : `$${product.price}`}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Description</strong>:{' '}
                {isLoading ?  Array.from({ length: 3 }).map((_, index) => (
      <Skeleton
        key={index}
        height={15}
        style={{opacity:'0.7'}}
        width={index === 2 ? '50%' : '100%'}  
      />
    )
  ) : <p>{truncate(product.description, 250)}.</p> }
              </ListGroup.Item>
              <div className='btns-wrapper'>
                {/* heart icon for wishlist */}
                <div className='heart-icon'>
                  {isLoading ? (
                    <Skeleton height={40} width={40} />
                  ) : !pro ? (
                    <>
                      <FaRegHeart
                        onClick={handleAddToWishlist}
                        data-tooltip-id='my-tooltip'
                        data-tooltip-content='Add to wishlist'
                      />
                      <Tooltip style={tooltipStyle} id='my-tooltip' />
                    </>
                  ) : (
                    <>
                      <FaHeart
                        onClick={handleAddToWishlist}
                        data-tooltip-id='my-tooltip'
                        data-tooltip-content='remove from wishlist'
                      />
                      <Tooltip style={tooltipStyle} id='my-tooltip' />
                    </>
                  )}
                </div>
                {/* add to cart btn */}
                <div className='btn-qty'>
                  <Col>Qty:</Col>
                  <Col className='qty-container'>
                    <Form.Control
                      as='select'
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                    >
                      {isLoading
                        ? Array.from({ length: 5 }).map((_, index) => (
                            <option key={index} value={index + 1}>
                              {index + 1}
                            </option>
                          ))
                        : [...Array(product?.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                    </Form.Control>
                  </Col>
                </div>
                <button
                  disabled={isLoading || product.countInStock === 0}
                  onClick={handleAddToCart}
                  className='btn-addtocart'
                >
                  {isLoading ? 'loading...' : 'add to cart'}
                </button>
              </div>
            </ListGroup>
          </Col>
        </Row>
        {/* review section */}
        <Row className='review m-3'>
          <Col md={6} >
              <h2>Reviews</h2>
              {product?.reviews.length === 0 && <Message>No reviews</Message>}
              <ListGroup variant='flush'>
                  {product?.reviews.map(item => (
                     <ListGroup.Item key={item._id}>
                         <strong>{item.name} </strong>
                         <Rating value={item.rating} />
                         <p>{item.createdAt.substring(0,10)} </p>
                         <p>{item.comment} </p>
                     </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                     {userInfo ? (
                       <Form onSubmit={handleCreateReview}>
                          <Form.Group controlId='rating' className='my-2'>
                             <Form.Label>Rating</Form.Label>
                             <Form.Control required as='select' value={rating}
                              onChange={(e)=> setRating(Number(e.target.value))} >
                                <option value="">select...</option>
                                <option value={1}>1 - poor</option>
                                <option value={2}>2 - fair</option>
                                <option value={3}>3 - good</option>
                                <option value={4}>4 - very good</option>
                                <option value={5}>5 - excellent</option>
                             </Form.Control>
                          </Form.Group>
                          <Form.Group controlId='comment' className='my-2'>
                             <Form.Label>Comment</Form.Label>
                             <Form.Control required as='textarea' value={comment} rows="4" placeholder='Write a customer review on starshiner'
                              onChange={(e)=> setComment(e.target.value)} >
                               
                             </Form.Control>
                          </Form.Group>
                          <button disabled={loadingReview} type='submit' variant='primary'>
                              {loadingReview ? 'loading...' : 'submit'}
                          </button>
                       </Form>
                     ) : (
                            <Message>Please <Link to='/login'>sign in</Link> to write a review </Message>
                     )}
                  </ListGroup.Item>
              </ListGroup>
          </Col>
       </Row>
      </>
    </div>
  );
};

export default ProductDetailsPage;
