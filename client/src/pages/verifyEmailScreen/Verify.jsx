import React,  {useEffect} from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useVerifyEmailMutation } from '../../slices/usersApi';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const Verify = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userId = urlParams.get('userId');
    const [Verify, {isLoading}] = useVerifyEmailMutation()
   useEffect(() => {
       const verifyUser = async()=> {
        try {
          await Verify({
            userId, token
         })
         toast.success('your email has been verified');
        
         navigate('/' || 'shipping', {replace:true});
        } catch (error) {
          console.log('VERIFY ERROR', error?.data?.message || error?.error || error)
        }
       }
       verifyUser()
   }, [navigate, token, userId,Verify])
   
  return (
    <div>
        wait while we are verifying your email...
    </div>
  )
}

export default Verify