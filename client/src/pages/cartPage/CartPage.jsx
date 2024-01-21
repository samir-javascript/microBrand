import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Form, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';  // Import the Skeleton component
import './styles.css';
import Message from '../../components/MessageComponent/Message';
import { addToCart, removeFromCart } from '../../slices/cartSlice';
import EmptyCart from '../../components/EmptyCartComponent/EmptyCart';
import { toast } from 'react-toastify';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const { userInfo } = useSelector((state) => state.auth);

  const truncate = (string, n) => {
    return string.length > n ? string.substring(0, n) + '...' : string;
  };

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className='container'>
      <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>

      <Row>
        <Col md={8}>
          {cartItems && cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  {/* Use Skeleton components for loading state */}
                  <Row className='mb-3'>
                    <Col className='mb-3' xs={6} md={2}>
                      {item.images ? (
                        <img
                          className='cart-page-image'
                          src={item.images[0]}
                          alt={item.name}
                        />
                      ) : (
                        <Skeleton height={100} width={200} />
                      )}
                    </Col>
                    <Col className='mb-3' md={4}>
                      {item.name ? (
                        <Link
                          className='pro-cart-name'
                          style={{ marginBottom: '10px' }}
                          to={`/products/${item._id}`}
                        >
                          {truncate(item.name, 60)}
                        </Link>
                      ) : (
                        <Skeleton height={20} width={150} />
                      )}
                    </Col>
                    <Col className='mb-3' md={2}>
                      {item.price ? (
                        <h3 className='cart-page-price'>${item.price}</h3>
                      ) : (
                        <Skeleton height={20} width={50} />
                      )}
                    </Col>
                    <Col className='mb-3' md={2}>
                      {item.qty ? (
                        <Form.Control
                          as='select'
                          value={item.qty}
                          onChange={(e) =>
                            addToCartHandler(item, Number(e.target.value))
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      ) : (
                        <Skeleton height={30} width={50} />
                      )}
                    </Col>
                    <Col className='mb-3' md={2}>
                      <Button
                        className='btn-remove'
                        type='button'
                        variant='light'
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <FaTrash color='red' />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <div className='subtotal place-order-susbtotal-fixed'>
            <div className='subtotal-text-price'>
              {cartItems ? (
                <p>
                  Subtotal (
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                  )
                </p>
              ) : (
                <Skeleton height={20} width={200} />
              )}
            </div>

            <div className='check-text'>
              <input type='checkbox' />
              <small>This order contains a gift</small>
            </div>
            <button
              style={cartItems && cartItems.length === 0 ? { pointerEvents: 'none' } : {}}
              disabled={cartItems && cartItems.length === 0}
              onClick={checkoutHandler}
              className='checkout-btn'
            >
              Proceed to Checkout
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CartScreen;
