import { PayPalButtons } from '@paypal/react-paypal-js';
import React from 'react';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';


const SubTotal = ({
  item,
  isLoading,
  handleCreateOrder,
  isOrder,
  paypalButtons,
  loadingUpdateToPaid,
  isPending,
  onError,
  loadingUpdateToDLV,
  createOrder,
  isPaid,
  user,
  isDelivered,
  updateToDeliver,
  onApprove,
}) => {
  const itemCount = isOrder ? item.orderItems.length : item.cartItems.length;
 


  return (
    <div className='place-order-susbtotal-fixed'>
      <Card style={{ height: 'auto' }}>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2 className='order-summary'>Order Summary</h2>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>
                Subtotal ({itemCount} {itemCount > 1 ? 'items' : 'item'}):
              </Col>
              <Col>
                ${isOrder
                  ? item.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
                  : item.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Shipping:</Col>
              <Col>${item.shippingPrice}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Tax:</Col>
              <Col>${item.taxPrice}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col style={{ fontSize: '18px', fontWeight: '700', color: '#c45500' }}>order Total:</Col>
              <Col style={{ fontSize: '18px', fontWeight: '700', color: '#c45500' }}>
                ${item.totalPrice}
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            {loadingUpdateToPaid && <p>loading...</p>}
            {isPending && <p>loading...</p>}

            {paypalButtons && !isPaid  && (
              <div>
                <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError}>

                </PayPalButtons>
              </div>
            )}
              {user && user.isAdmin && isPaid && !isDelivered && (
                 <button disabled={loadingUpdateToDLV} onClick={updateToDeliver} type='button'>
                   {loadingUpdateToDLV ? 'loading...': 'update to deliver'} 
                 </button>
              )}
            {!paypalButtons && (
              <button
                type='button'
                className='btn-block'
                disabled={item.cartItems === 0 || isLoading}
                onClick={handleCreateOrder}
              >
                {isLoading ? 'loading...' : 'Place Order'}
              </button>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};

export default SubTotal;
