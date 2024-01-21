import React, {useState} from 'react'
import { Col, ListGroup, Row } from 'react-bootstrap'
import Rating from '../RatingComponent/Rating'
import { Form, Link } from 'react-router-dom'
import Message from '../MessageComponent/Message'
import { useSelector } from 'react-redux'

const Review = ({product, loadingCR, isLoading}) => {
    const {userInfo} = useSelector(state => state.auth)
    const [rating, setRating] = useState(0)
    const [comment,setComment] = useState('')
    if(isLoading) return <p>loading...</p>
    const handleCreateReview = async()=> {
     
    }
  return (
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
                 <Form>
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
                    <button disabled={loadingCR} type='submit' variant='primary'>
                        {loadingCR ? 'loading...' : 'submit'}
                    </button>
                 </Form>
               ) : (
                      <Message>Please <Link to='/login'>sign in</Link> to write a review </Message>
               )}
            </ListGroup.Item>
        </ListGroup>
    </Col>
 </Row>
  )
}

export default Review



