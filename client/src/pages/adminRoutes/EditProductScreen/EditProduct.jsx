import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useGetSingleProductQuery, useUpdateProductsMutation } from '../../../slices/apiProducts'
import FormContainer from '../../../components/FormContainer'
import Message from '../../../components/MessageComponent/Message'
import {  Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Loading from '../../../components/LoadingComponent/Loading'

const EditProduct = () => {
  const {id: productId} = useParams()
  const navigate = useNavigate()
  const { data: product, isLoading , error} = useGetSingleProductQuery(productId)
  const [updateProduct, {isLoading:loadingUPD}] = useUpdateProductsMutation()
 
   const [name,setName] = useState('')
   const [description,setDescription] = useState('')
   const [price,setPrice] = useState(0)
   const [brand,setBrand] = useState('')
   const [category,setCategory] = useState('')
   const [productImages,setProductImages] = useState([])
   const [countInStock, setCountInStock] = useState(0)
   useEffect(() => {
     if(product) {
      setName(product.name)
      setBrand(product.brand)
      setCategory(product.category)
      setPrice(product.price)
      setDescription(product.description)
      setCountInStock(product.countInStock)
      setProductImages(product.images)
     }
   }, [product])
   
   const uploadFileHandler = (e) => {
    const files = e.target.files;
    transformFile(files);
  };
   const transformFile = (files) => {
    const promises = Array.from(files).map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    });
  
    Promise.all(promises).then((results) => {
      setProductImages(results);
     
    });
  };
 
   const handleSubmit = async(e)=> {
      e.preventDefault()
      try {
       const updatedProduct = {
         productId,
         name,
         brand,
         category,
         price,
         countInStock,
         images: productImages,
         description
      }
      await updateProduct(updatedProduct).unwrap()
      toast.success('product updated')
      navigate('/admin/productsList')
      } catch (error) {
         console.log(error)
         toast.error(error?.data?.message || error || error?.error)
      }
     
  }
  
   if(isLoading) return <Loading />
   if(error) return <Message variant='danger'>{error?.data?.message || error?.error} </Message>
  return (
    <div style={{margin: '30px'}}>
         <Link to='/admin/productsList' className='btn btn-light my-3'>
           Go Back
         </Link>
         

          
         <FormContainer>
            <h2 style={{marginBottom:'20px'}} className="profile-title">Edit Product</h2>

            <div className=" edit-product-form">
            <Form onSubmit={handleSubmit} className="form-login">
                <Form.Group className='mb-2' controlId='name'>
                   <Form.Label>Product Name</Form.Label>
                   <Form.Control className='login-input' type='text' placeholder='Enter Name' value={name} onChange={(e)=> setName(e.target.value)} ></Form.Control>
                   
                </Form.Group>
                <Form.Group className='mb-2' controlId='description'>
                   <Form.Label>Product description</Form.Label>
                   <Form.Control className='login-input' type='text' placeholder='Enter description' value={description} onChange={(e)=> setDescription(e.target.value)} ></Form.Control>
                   
                </Form.Group>
                <Form.Group className='mb-2' controlId='brand'>
                   <Form.Label>Product brand</Form.Label>
                   <Form.Control className='login-input' type='text' placeholder='Enter brand' value={brand}
                    onChange={(e)=> setBrand(e.target.value)} ></Form.Control>
                   
                </Form.Group>
               
                <Form.Group className='mb-2' controlId='category'>
                   <Form.Label>Product category</Form.Label>
                   <Form.Control className='login-input' type='text' placeholder='Enter category' value={category} onChange={(e)=> setCategory(e.target.value)} ></Form.Control>
                   
                </Form.Group>

                <Form.Group className='mb-2' controlId='price'>
                   <Form.Label>Product price</Form.Label>
                   <Form.Control className='login-input' type='number' placeholder='Enter price' value={price} onChange={(e)=> setPrice(e.target.value)} ></Form.Control>
                   
                </Form.Group>
                <Form.Group className='mb-2' controlId='countInStock'>
                   <Form.Label>Product countInStock</Form.Label>
                   <Form.Control type='number' className='login-input' placeholder='Enter countInStock' value={countInStock} onChange={(e)=> setCountInStock(e.target.value)} ></Form.Control>
                   
                </Form.Group>
                <Form.Group className='mb-2' controlId='image'>
            <Form.Label>Product images</Form.Label>
            <Form.Control type='file' label='Choose files' onChange={uploadFileHandler} multiple />

            {/* Display selected images */}
          
            
        </Form.Group>
                <button disabled={loadingUPD} type='submit'  className=' shipping-btn'>
                   {loadingUPD ? 'Editing...' :'Edit Product'}
                </button>
            </Form>
            </div>
         </FormContainer>
        
     </div>
  )
}

export default EditProduct