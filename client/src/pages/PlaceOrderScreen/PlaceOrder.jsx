import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CheckoutSteps from '../../components/CheCkoutSteps/CheckoutSteps'
import './styles.css'
import { Col, Row, ListGroup, Card, } from 'react-bootstrap'
import { toast} from 'react-toastify'
import { clearCart } from '../../slices/cartSlice'
import { useCreateOrderMutation } from '../../slices/ordersApi'
import Message from '../../components/MessageComponent/Message'
import { useDispatch, useSelector } from 'react-redux'
import SubTotal from '../../components/subtotalComponent/SubTotal'

const PlaceOrder = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const [createOrder, {isLoading}] = useCreateOrderMutation()
   
    useEffect(() => {
       if(!cart.shippingAddress) {
         navigate('/shipping')
       }else if(!cart.paymentMethod.PaymentMethod) {
          navigate('/payment')
       }
    }, [navigate,cart])
  
    const handleCreateOrder =async ()=> {
      
       try {
         const res = await createOrder({
            orderItems:  cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod.PaymentMethod,
            itemsPrice: Number(cart.itemsPrice),
            shippingPrice: Number(cart.shippingPrice),
            taxPrice: Number(cart.taxPrice),
            totalPrice: Number(cart.totalPrice),
          }).unwrap()
              dispatch(clearCart())
              navigate(`/orders/${res._id}`)
       } catch (error) {
          console.log(error)
          toast.error(error)
       }
    }

   
  return (
    <div className='place-order'>
      <div className='place-order-wrapper'>

      
         <CheckoutSteps step1 step2 step3 step4 />
         <Row>
             <Col md={{span: 8 , order: 1}}  xs={{order: 2}}>
                 <ListGroup variant='flush'>
                       <ListGroup.Item>
                           <div className='place-order-titles'>
                               <p>1</p>
                               <p>shipping address</p>
                           </div>
                           <p>
                             <strong>Address: </strong>
                             {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                             {cart.shippingAddress.postalCode},{' '}
                             {cart.shippingAddress.country}
                          </p>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <div className='place-order-titles'>
                               <p>2</p>
                               <p>Payment Method</p>
                           </div>
                          <strong>Method: </strong>
                          {cart.paymentMethod.PaymentMethod}
                            
                      </ListGroup.Item>
                     
                      

            <ListGroup.Item>
                     <div className='place-order-titles'>
                               <p>3</p>
                               <p>Order items</p>
                           </div>
              { cart.cartItems.length === 0  ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                      <Col className='mb-3' md={2}>
                         <img className='cart-page-image' src={item.images[0]} alt={item.name}  />
                     </Col>
                     <Col className='mb-3'  md={8}>
                       <Link className='pro-cart-name' style={{marginBottom:'10px'}} to={`/products/${item._id}`}>{(item.name)}</Link> 
                  </Col>
                  <Col className='mb-3' md={2}>
              <h3 className='order-item-price'>
                $ {item.qty * item.price}
              </h3>
            </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
               
                
             </Col>
             <Col md={{span: 4, order: 2}} xs={{order: 1}} >
                <SubTotal isLoading={isLoading} item={cart} 
             
                handleCreateOrder={handleCreateOrder} />
               
             </Col>
         </Row>
         </div>
    </div>
  )
}

export default PlaceOrder