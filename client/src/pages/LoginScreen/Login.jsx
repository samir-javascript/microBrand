import React, {useState, useEffect} from 'react'
import './styles.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useLoginUserMutation } from '../../slices/usersApi'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../../slices/usersSlice'
import MobileHeader from '../../components/HeaderComponent/MobileHeader'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async'
const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { search } = useLocation()
  const searchParams = new URLSearchParams(search)
  const redirect = searchParams.get('redirect') || '/'
  const {userInfo} = useSelector(state => state.auth)
  const [email, setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [LoginUser, {isLoading}] = useLoginUserMutation()

  useEffect(()=>{
     if(userInfo) {
        navigate(redirect)
     }
  },[redirect,navigate,userInfo])
  const handleSubmit = async (e)=> {
      e.preventDefault();
      try {
       const res = await LoginUser({
          email, password
        }).unwrap()
         dispatch(setCredentials({...res}));
         navigate('/')
      } catch (error) {
        console.log(error)
        toast.error(error?.data?.message || error?.error || error)
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
                <label htmlFor="email">Email Address</label>
                <input 
                type="email"
                className='login-input'
                placeholder='Enter your email address'
                required value={email} 
                onChange={(e)=>setEmail(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input 
                className='login-input'
                type="password"
                required value={password} 
                placeholder='Enter your password'
                onChange={(e)=> setPassword(e.target.value)} />
                <button disabled={isLoading} className='checkout-btn login-btn' type='submit'>
                  {isLoading ? 'loading...' : ' continue'}
                </button>
            </form>
            <p>Dont't have an account? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register now</Link></p>

        </div>
        </div>
    </div>
  )
}

export default Login