import React, {useState, useEffect} from 'react'
import FormContainer from '../../../components/FormContainer'
import { Link , useNavigate, useParams} from 'react-router-dom'
import { useGetUserByIdQuery, useUpdateUserByAdminMutation } from '../../../slices/usersApi'
import Message from '../../../components/MessageComponent/Message'

import { toast } from 'react-toastify'
import Loading from '../../../components/LoadingComponent/Loading'
const EditUser = () => {
    const {id:userId} = useParams()
    const navigate = useNavigate()
    const {data:user, isLoading, isError} = useGetUserByIdQuery(userId)
   
    const [updateUser, {isLoading:loadingUpdate}] = useUpdateUserByAdminMutation()
    const [name,setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    useEffect(() => {
       if(user) {
         setName(user.name)
         setEmail(user.email)
         setIsAdmin(user.isAdmin)
       }
    }, [user])
    
    if(isLoading) return <Loading />
    if(isError) return <Message variant='danger'>{isError?.data?.message || isError?.error } </Message>
   const handleSubmit = async (e)=> {
         e.preventDefault()
         try {
            await updateUser({
                userId, isAdmin, name, email
            }).unwrap()
            toast.success('user updated')
           navigate('/admin/usersList')
         } catch (error) {
            console.log(error)
            toast.error(error?.data?.message || error?.error)
         }
    }
  return (
    <div style={{marginTop:'30px'}}>
          <Link to='/admin/usersList' className='btn btn-light my-3'>
           Go Back
         </Link>
        <FormContainer>
            <h2  className='profile-title'>
               Edit user
           </h2>
           <div className="form-container">

          

             <form className='form-login' onSubmit={handleSubmit}>
                  <label  htmlFor="name">User's Name</label>
                  <input className='login-input' type="text"
                   placeholder='update user name' value={name} onChange={(e)=> setName(e.target.value)} />
                  <label htmlFor="email">User's Email</label>
                  <input className='login-input' type="email"
                   placeholder='update user email' value={email} onChange={(e)=> setEmail(e.target.value)} />
                   <div className='check-text'>
                      
                      <input type='checkbox' checked={isAdmin === true}
                    value={isAdmin} onChange={(e)=> setIsAdmin(e.target.checked)} />
                      <small style={{fontSize:'18px', fontWeight:'600'}}>is Admin</small>
                   </div>
                   <button disabled={isLoading} style={{marginTop:'15px'}} type='submit' className='login-btn'>
                       {loadingUpdate ? 'updating...' : 'update user'}  
                   </button>
             </form>
             </div>
        </FormContainer>
    </div>
    
  )
}

export default EditUser