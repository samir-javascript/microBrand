import React, {useState, useEffect} from 'react'
import { savePaymentMethod } from '../../slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SubHeader from '../../components/SubHeaderComponent/SubHeader'
import CheckoutSteps from '../../components/CheCkoutSteps/CheckoutSteps'
import { Form, Col, Row, Button } from 'react-bootstrap'
import FormContainer from '../../components/FormContainer'
const Payment = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart  = useSelector(state => state.cart)
    const { shippingAddress } = cart;
    const [PaymentMethod,setPaymentMethod] = useState('PayPal')
    useEffect(() => {
       if(!shippingAddress) {
          navigate('/shipping')
       }
    }, [shippingAddress,navigate])
    
   const submitHandler = (e)=> {
       e.preventDefault()
       try {
          dispatch(savePaymentMethod({PaymentMethod}))
          navigate('/place-order')
       } catch (error) {
          console.log(error)
       }
   }
  return (
    <div>
    <SubHeader />
    <CheckoutSteps step1 step2 step3 />
   
   <FormContainer>
   <h1>Payment Method</h1>
       <Form onSubmit={submitHandler}>
           <Form.Group>
             <Form.Label as='legend' >
                 Select Method
             </Form.Label>
             <Col>
               <Form.Check type='radio' className='my-2' label='PayPal or credit card' 
                 id='PayPal' name='PaymentMethod' 
                 value={PaymentMethod} checked onChange={(e)=> setPaymentMethod(e.target.value)}
               ></Form.Check>
              </Col>
           </Form.Group>
           <button type='submit' className='mt-2'> 
              Continue
           </button>
          
          
       </Form>
   </FormContainer>
</div>
  )
}

export default Payment