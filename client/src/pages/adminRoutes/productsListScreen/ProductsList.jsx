import React from 'react'
import './styles.css'
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../../slices/apiProducts'
import { Spinner, Row, Col, Table, Button } from 'react-bootstrap'
import { Link, useParams} from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaTrash,  FaEdit} from 'react-icons/fa'
import Paginate from '../../../components/PaginateComponent/Paginate'
import Loading from '../../../components/LoadingComponent/Loading'
import Message from '../../../components/MessageComponent/Message'
const ProductsList = () => {
   const { keyword, pageNumber} = useParams()
  const { data, isLoading, isError, refetch} = useGetProductsQuery({keyword, pageNumber})
  const [ createProduct, {isLoading:loadingCPR}] = useCreateProductMutation()
  const [ deleteProduct, {isLoading:loadingDeletePR}] = useDeleteProductMutation()
  if(isLoading) return <Loading />
   if(isError) {
      return <Message variant='danger'>something went wrong fetching products list</Message>
   }
    /** truncate text... function */
    const truncate = (string, n) => {
      return string.length > n ? string.substring(0, n) + '...' : string;
    };

    const handleCreateProduct = async()=> {
       try {
          await createProduct()
          refetch()
          toast.success('product created')
       } catch (error) {
         console.log(error)
         toast.error(error?.data?.message || error?.error)
       }
    }
    const handleDelete = async(productId)=> {
      try {
          await deleteProduct(productId)
          refetch()
          toast.success('product deleted')
      } catch (error) {
        console.log(error)
        toast.error(error?.data?.message || error?.error)
      }
   }
  return (
    <div className='products-list'>
       <Row className='align-items-center m-4'>
          <Col>
          <h2  className='profile-title '>
               Products List
           </h2>
          </Col>
          <Col className='text-end'>
             <button disabled={loadingCPR} type='button' onClick={handleCreateProduct} style={{width:'150px', height:'35px'}}>
               {loadingCPR ? 'creating...': 'Create product'} 
             </button>
          </Col>
           <div className="products-list">
               <div className="products-table">
                    <Table responsive bordered striped hover className='table-sm'>
                        <thead>
                            <tr>
                                <th className='text-center tb-header' >PRODUCT ID</th>
                                <th className='text-center tb-header'>NAME</th>
                                <th className='text-center tb-header'>PRICE</th>
                                <th className='text-center tb-header'>BRAND</th>
                                <th className='text-center tb-header'>CATEGORY</th>
                                <th className='text-center tb-header'>QTY</th>
                                <th className='text-center tb-header'>EDIT</th>
                                <th className='text-center tb-header'>DELETE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.products.map(product => (
                               <tr key={product._id}>
                                    <td className='text-center tb-header'>
                                       {product._id}
                                    </td>
                                    <td className='text-center tb-header'>
                                       {truncate( product.name,60)}
                                    </td>
                                    <td className='text-center tb-header'>
                                       {product.price}
                                    </td>
                                    <td className='text-center tb-header'>
                                       {product.brand}
                                    </td>
                                    <td className='text-center tb-header'>
                                       {product.category}
                                    </td>
                                    <td className='text-center tb-header'>
                                       {product.countInStock}
                                    </td>
                                    <td className='text-center tb-header'>
                                    <Link to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm m-0'>
                                           <FaEdit color='green' />
                                        </Button>
                                    </Link>
                                   
                                    </td>
                                    <td className='text-center tb-header'>
                                      <Button disabled={loadingDeletePR} onClick={()=> handleDelete(product._id)} type='button' variant='light' className='btn-sm m-0'>
                                        <FaTrash color='red' />
                                      </Button>
                                     
                                    </td>
                               </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate pages={data.pages} page={data.page} isAdmin={true} />
               </div>
           </div>
       </Row>
      
    </div>
  )
}

export default ProductsList