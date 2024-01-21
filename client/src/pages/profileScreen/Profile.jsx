/* eslint-disable no-whitespace-before-property */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import './styles.css'
import { useProfileQuery, useUpdateUserProfileMutation, useGetMyOrdersQuery, useReverifyEmailMutation } from '../../slices/usersApi'
import { Form, Table, Col, Row, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { FaTimes, FaCheck } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { setCredentials } from '../../slices/usersSlice' 
import Message from '../../components/MessageComponent/Message'
import { toast } from 'react-toastify'
import Loading from '../../components/LoadingComponent/Loading'

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data: user, isLoading, isError } = useProfileQuery()
  const { data: myorders, isLoading: loadingMyOrders, isError: errorMyOrders } = useGetMyOrdersQuery()
  const [update, { isLoading: loadingUpdateProfile }] = useUpdateUserProfileMutation()
  const [Reverify, { isLoading: verifyingUser }] = useReverifyEmailMutation()
 
  const { userInfo } = useSelector(state => state.auth)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name)
      setEmail(userInfo.email)
    }
  }, [userInfo])
 
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (password !== confirmPassword) {
        toast.error('passwords do not match')
        return;
      } else {
        const res = await update({
          _id: userInfo._id, name, email, password
        }).unwrap()
        dispatch(setCredentials({res}))
        setPassword('')
        setConfirmPassword('')
        toast.success('profile updated')
      }

    } catch (error) {
      console.log(error)
    }
  }
  const verifyUserToken =async ()=> {
      try {
        await Reverify().unwrap()
        toast.success('check your inbox')
      } catch (error) {
         console.log(error)
         toast.error(error?.data?.message || error?.error || error)
      }
  }
  return (
    <div className='profile'>
      {!userInfo.isVerified && (
         <div className='verify-user-statement'>
            <p >It looks like you haven't verified you email yet. <button type='button' disabled={verifyingUser} onClick={verifyUserToken}>
                   {verifyingUser ? 'generating...': 'Get Verification Link'}
              </button></p>
         </div>
      )}
      <Row className='mx-4 py-3'>
        
        <Col md={4} >
        <h2 className='profile-title'>update Profile</h2>
          <form onSubmit={handleSubmit} className='form-login'>
            <label htmlFor="email">Name</label>
            <input
              type="text"
              className='login-input'
              placeholder='Enter your name'
              value={name}
              onChange={(e) => setName(e.target.value)} />
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              className='login-input'
              placeholder='Enter your email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="password">Password</label>
            <input
              className='login-input'
              type="password"
              value={password}
              placeholder='Enter your password'
              onChange={(e) => setPassword(e.target.value)} />
            <label htmlFor="password">Confirm Password</label>
            <input
              className='login-input'
              type="password"
              value={confirmPassword}
              placeholder='confirm your password'
              onChange={(e) => setConfirmPassword(e.target.value)} />
            <button disabled={loadingUpdateProfile} className='checkout-btn login-btn' type='submit'>
              {loadingUpdateProfile ? 'loading...' : ' Update Profile'}
            </button>
          </form>
        </Col>
       
        <Col md={8} >
        <h2 style={{textAlign:'center'}} className='profile-title'>my orders</h2>
          {errorMyOrders ? (
            <Message variant='danger'>
              {errorMyOrders?.data?.message || errorMyOrders?.error}
            </Message>
          ) : loadingMyOrders ? (
            <Loading />
          ) : (
            myorders.length > 0 ? (

              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th className='text-center tb-header'>ID</th>
                    <th className='text-center tb-header'>DATE</th>
                    <th className='text-center tb-header'>TOTAL</th>
                    <th className='text-center tb-header'>PAID</th>
                    <th className='text-center tb-header'>DELIVERED</th>
                    <th className='text-center tb-header'>MY ORDERS</th>
                  </tr>
                </thead>
                <tbody>
                  {myorders.map(order => (
                    <tr key={order._id}>
                      <td className="text-center tb-header">
                        {order._id}
                      </td>
                      <td className="text-center tb-header">
                        {order.createdAt.substring(0, 10)}
                      </td>
                      <td className="text-center tb-header">
                        $ {order.totalPrice}
                      </td>
                      <td className="text-center tb-header">
                        {order.isPaid ? (
                          <FaCheck color='green' />
                        ) : (
                            <FaTimes color='red' />
                          )}
                      </td>
                      <td className="text-center tb-header">
                        {order.isDelivered ? (
                          <FaCheck color='green' />
                        ) : (
                            <FaTimes color='red' />
                          )}
                      </td>
                      <td className="text-center tb-header">
                        <Link to={`/orders/${order._id}`}>
                          <Button className='btn-sm m-0' variant='light'>
                            Order Details
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </Table>
            ) : (
                <div className='none-orders'>
                  <p>you haven't placed any orders yet.</p>
                  <Link style={{textDecoration:"none"}} to='/'>
                  <button className='btn-shipping'>continue shopping</button>
                  </Link>
                
                </div>
            ))}

        </Col>
      </Row>
    </div>
  )
}

export default Profile;
