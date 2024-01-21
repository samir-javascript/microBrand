import React from 'react'
import './styles.css'
import { useGetOrdersQuery } from '../../../slices/ordersApi'
import { FaTimes, FaCheck } from 'react-icons/fa'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../../../components/MessageComponent/Message'
import Loading from '../../../components/LoadingComponent/Loading'
const OrdersList = () => {
    const {data:orders, isLoading, isError} = useGetOrdersQuery()
  
    if(isLoading) return <Loading />
    if(isError) return <Message variant='danger'>something went wrong while fetching orders</Message>
  return (
    <div className='orders'>
         <div className='orders-container'>
            <h2  className='profile-title'>
                 orders List</h2>
            <Table responsive striped hover bordered className='table-sm'>
                 <thead>
                     <tr>
                         <th className='text-center tb-header'>ID</th>
                         <th className='text-center tb-header'>USER</th>
                         <th className='text-center tb-header'>DATE</th>
                         <th className='text-center tb-header'>TOTAL</th>
                         <th className='text-center tb-header'>PAID</th>
                         <th className='text-center tb-header'>DELIVERED</th>
                         <th className='text-center tb-header'>ORDERS DETAILS</th>
                     </tr>
                 </thead>
                 <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td className='text-center tb-header'> 
                                {order._id}
                            </td>
                            <td className='text-center tb-header'>
                                 {order.user.name}
                            </td>
                            <td className='text-center tb-header'>
                                {order.createdAt.substring(0,10)}
                            </td>
                            <td className='text-center tb-header'>
                                $ {order.totalPrice}
                            </td>
                            <td className='text-center tb-header'>
                                {order.isPaid ? (
                                   <FaCheck color='green' />
                                ): (
                                    <FaTimes  color='red'/>
                                )}
                            </td>
                            <td className='text-center tb-header'>
                            {order.isDelivered ? (
                                   <FaCheck color='green' />
                                ): (
                                    <FaTimes  color='red'/>
                                )}
                            </td>
                            <td className='text-center tb-header'>
                               <Link to={`/orders/${order._id}`}>
                                 <Button variant='light'  className='btn-sm m-0'>
                                     View Order
                                 </Button>
                               </Link>
                            </td>
                        </tr>
                    ))}
                 </tbody>
            </Table>
         </div>
    </div>
  )
}

export default OrdersList