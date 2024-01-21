import { Link } from 'react-router-dom'
import './styles.css'

const NotFound = () => {
  return (
    <div className='notfound-container'>
        
        <div className='notfound-wrapper'>
            <div className='notfound'>

            
             <img className='notfound-img' style={{objectFit:'contain'}}  src={'/images/mmall-404_1-removebg-preview.png'} alt="not found img indicator" />
             <h2 className='notfound-heading'>Oops! The page you are looking for doesn't exist.</h2>
             <p>You may find what you like in the Links below:</p>
             <div className='btn-container'>
                <Link style={{textDecoration:'none'}} to='/'>
                 <button className='not-btn'>
                    Home Page
                 </button>
                 </Link>
                 <Link to='/browse-products/Electronics'>
                 <button className='not-btn'>
                     Browse categories
                 </button>
                 </Link>
             </div>
             </div>
        </div>
    </div>
  )
}

export default NotFound