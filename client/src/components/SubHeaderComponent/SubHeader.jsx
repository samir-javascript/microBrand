import { Link } from 'react-router-dom'
import './styles.css'
import { useSelector } from 'react-redux'
import { FaArrowLeft } from 'react-icons/fa'

const SubHeader = () => {
  
   const { cartItems} = useSelector(state => state.cart)
  return (
    <header className='header-process'>
    <div className='header-process-container'>

      <Link className='header-process-icon' to='/'>
          <img className='logo-image' alt='starshines ' src="/images/logo1.png" />
      </Link>
        <div className='checkout-text-qty'>
            <p>Checkout <span><Link style={{textDecoration:'none', color:'inherit'}} to='/cart'>
            ({Number(cartItems.reduce((acc, item) => acc + item.qty, 0))})</Link></span>
            </p>
        </div>
        
    </div>
    
</header>
  )
}

export default SubHeader