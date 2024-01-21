import React, {useState, useEffect} from 'react'
import { useRegisterUserMutation } from '../../slices/usersApi'
import { setCredentials } from '../../slices/usersSlice'
import { useDispatch , useSelector} from 'react-redux'

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import MobileHeader from '../../components/HeaderComponent/MobileHeader'
import { Helmet } from 'react-helmet-async'
const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {search} = useLocation()
  const searchParams = new URLSearchParams(search)
  const redirect = searchParams.get('redirect') || '/'
  const {userInfo} = useSelector(state => state.auth)
  const [email, setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [name,setName] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [RegisterUser, {isLoading}] = useRegisterUserMutation()

  useEffect(() => {
      if(userInfo && userInfo?.isVerified) {
         navigate(redirect)
      }
  }, [redirect, userInfo, navigate])
  
  const handleSubmit = async(e)=> {
      e.preventDefault();
       
      try {
        if(password !== confirmPassword) {
           toast.error('passwords do not match')
           return;
        }else {
          const res = await RegisterUser({
            name , email, password
         }).unwrap()
          dispatch(setCredentials({...res}));
          toast.success('Please check your inbox to verify your email')
         
        }
       
      } catch (error) {
         console.log(error?.data?.error || error?.error || error)
         toast.error(error?.data?.message || error?.error)
      }
  }
  return (
    <div className='login'>
       <Helmet>
        <title> Authentication</title>
       
    </Helmet>
      <div style={{opacity:'0' , visibility:"hidden", display:"none"}}>
        <MobileHeader  />
      </div>  
        <Link to='/' className='login-logo'> 
            <img src="/images/logo1.png" alt="logo" />
        </Link>
        <div className='form-wrapper'>

       
        <div className='form-container'>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit} className='form-login'>
               {/* user name */}
            <label htmlFor="email">Full Name</label>
                <input 
                type="text"
                className='login-input'
                placeholder='Enter your Full Name'
                required value={name} 
                onChange={(e)=>setName(e.target.value)} />
                <label htmlFor="email">Email Address</label>

                  {/* user email */}
                <input 
                type="email"
                className='login-input'
                placeholder='Enter your email address'
                required value={email} 
                onChange={(e)=>setEmail(e.target.value)} />

                  {/* user password */}
                <label htmlFor="password">Password</label>
                <input 
                type="password"
                className='login-input'
                required value={password} 
                placeholder='Enter your password'
                onChange={(e)=> setPassword(e.target.value)} />


                  {/* user password confirmation */}
                  <label htmlFor="confirm-password">Confirm Password</label>
                 <input 
                type="password"
                className='login-input'
                required value={confirmPassword} 
                placeholder='Re-enter your password'
                onChange={(e)=> setConfirmPassword(e.target.value)} />
                <button disabled={isLoading} className='checkout-btn login-btn' type='submit'>
                  {isLoading ? 'loading...': 'continue'}
                </button>
            </form>
            <p>Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign up now</Link></p>

        </div>
        </div>
    </div>
  )
}

export default Register