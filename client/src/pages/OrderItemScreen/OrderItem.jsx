import './styles.css'
import { useEffect } from 'react'
import { useGetOrderByIdQuery } from '../../slices/ordersApi'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, ListGroup } from 'react-bootstrap'
import { usePayPalScriptReducer} from '@paypal/react-paypal-js'
import { useSelector } from 'react-redux'
import { useGetPayPalClientIDQuery, useUpdateOrderToDeliveredMutation, useUpdateOrderToPaidMutation } from '../../slices/ordersApi'
import Message from '../../components/MessageComponent/Message'
import SubTotal from '../../components/subtotalComponent/SubTotal'
import { toast} from 'react-toastify'
import Loading from '../../components/LoadingComponent/Loading'
import Skeleton from 'react-loading-skeleton'
const OrderItem = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [deliver, {isLoading: loadingUpdateToDLV}] = useUpdateOrderToDeliveredMutation()
  const [payOrder, {isLoading: loadingUpdateToPaid}] = useUpdateOrderToPaidMutation()
  const { data:order, isLoading, isError, refetch} = useGetOrderByIdQuery(id)

  const {userInfo} = useSelector(state => state.auth)
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { data:paypalCli, isLoading:loadingPayPalClIENTID, isError:errorPayPalCli} = useGetPayPalClientIDQuery()
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ id, details }).unwrap();
        refetch();
        toast.success('Order is paid');
        navigate('/success')
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  }
  function onError(err) {
    toast.error(err?.data?.message || err?.error);
  }
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }
  const handleUpdateToDeliver  = async()=> {
    try {
      await deliver(id)
      refetch()
      toast.success('order delivered')
    } catch (error) {
      console.log(error)
      toast.error(error?.data?.message || error?.error)
    }
    
  }
  useEffect(() => {
    if (!errorPayPalCli && !loadingPayPalClIENTID && paypalCli.clientId) {
       
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypalCli.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [errorPayPalCli, loadingPayPalClIENTID, order, paypalCli, paypalDispatch]);

  if(isLoading) return <Loading />
  if(loadingPayPalClIENTID) return (
    <div className="paypal-button-skeleton">
       <Skeleton style={{opacity:'0.7'}} count={2} height={50} width={200} />
  </div>
  )
  if(isError) return <Message variant='danger'>something went wrong while fetching order items.</Message>
  return (
    <div className='order-item'>
      <div className='order-wrapper'>

      
      <Row>
           <Col xs={{order: 2}} md={{span: 8 , order: 1}}>
               <ListGroup variant='flush'>
               <ListGroup.Item>
                           <div className='place-order-titles'>
                               <p>1</p>
                               <p>shipping</p>
                           </div>
                           <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
                           <p>
                             <strong>Address: </strong>
                             {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                             {order.shippingAddress.postalCode},{' '}
                             {order.shippingAddress.country}
                          </p>
                          
                          {order.isDelivered ? (
                            <Message variant='info'>
                                {order.deliveredAt}
                            </Message>
                          ): (
                             <Message variant='danger'>
                                Not Delivered
                             </Message>
                          )}
                      
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <div className='place-order-titles'>
                               <p>2</p>
                               <p>Payment Method</p>
                           </div>
                           <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                            <Message variant='info'>
                                {order.paidAt}
                            </Message>
                          ): (
                             <Message variant='danger'>
                                Not Paid
                             </Message>
                          )}
                      </ListGroup.Item>
                     
                      <ListGroup.Item>
                     <div className='place-order-titles'>
                               <p>3</p>
                               <p>Order items</p>
                           </div>
              {order.orderItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                      <Col className='mb-3' md={2}>
                         <img className='cart-page-image' src={item.images[0]} alt={item.name}  />
                     </Col>
                     <Col className='mb-3'  md={8}>
                       <Link className='pro-cart-name' style={{marginBottom:'10px'}} to={`/products/${item._id}`}>{(item.name)}</Link> 
                  </Col>
                        <Col className='mb-3' md={2}>
                            <h3 className='order-item-price'>$ {(item.qty * (item.price * 100).toFixed(2)) / 100}</h3>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
                     
               </ListGroup>
           </Col>
           {/** subtital component */}
           <Col xs={{order: 1}} md={{span: 4, order: 2}}>
                 <SubTotal isLoading={isLoading}
                  item={order}
                  onApprove={onApprove}
                  createOrder={createOrder}
                  onError={onError} 
                  isPending={isPending}
                  isOrder paypalButtons 
                  isPaid={order.isPaid}
                  user={userInfo}
                  isDelivered={order.isDelivered}
                  loadingUpdateToPaid={loadingUpdateToPaid}
                  updateToDeliver={handleUpdateToDeliver}
                  loadingUpdateToDLV={loadingUpdateToDLV}
                  />
            </Col>
      </Row>
      </div>
    </div>
  )
}

export default OrderItem