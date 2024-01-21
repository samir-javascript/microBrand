import { useDispatch, useSelector } from 'react-redux';
import SubHeader from '../../components/SubHeaderComponent/SubHeader';
import './styles.css'
import Select from 'react-select';
import CheckoutSteps from '../../components/CheCkoutSteps/CheckoutSteps';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { saveShipping } from '../../slices/cartSlice';
import { toast } from 'react-toastify';

const Shipping = () => {
    const { userInfo} = useSelector(state  => state.auth)
   
     
     const navigate = useNavigate()
    const dispatch = useDispatch();
      
   
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('United States');
    const [postalCode, setPostalCode] = useState('');
    useEffect(() => {
      if(!userInfo) {
        navigate('/login')
      }
    }, [navigate,userInfo])
    
    const countryOptions = [
      { value: 'us', label: 'United States', },
      { value: 'ca', label: 'Canada' ,},
      { value: 'ma', label: 'Morocco' ,},
      { value: 'ar', label: 'Argentina' },
      { value: 'au', label: 'Australia' },
      { value: 'br', label: 'Brazil' },
      { value: 'cn', label: 'China' },
      { value: 'fr', label: 'France' },
      { value: 'de', label: 'Germany' },
      { value: 'in', label: 'India' },
      { value: 'id', label: 'Indonesia' },
      { value: 'it', label: 'Italy' },
      { value: 'jp', label: 'Japan' },
      { value: 'mx', label: 'Mexico' },
      { value: 'ng', label: 'Nigeria' },
      { value: 'pk', label: 'Pakistan' },
      { value: 'ph', label: 'Philippines' },
      { value: 'ru', label: 'Russia' },
      { value: 'sa', label: 'Saudi Arabia' },
      { value: 'za', label: 'South Africa' },
      { value: 'kr', label: 'South Korea' },
      { value: 'es', label: 'Spain' },
      { value: 'se', label: 'Sweden' },
      { value: 'ch', label: 'Switzerland' },
      { value: 'tr', label: 'Turkey' },
      { value: 'ae', label: 'United Arab Emirates' },
      { value: 'gb', label: 'United Kingdom' },
      { value: 'vn', label: 'Vietnam' },
      // Add more countries as needed
    ];
    
    const handleCountryChange = (selectedOption) => {
        setCountry(selectedOption.label);
      };
      const handleSubmit = async(e)=> {
         e.preventDefault()
         setLoading(true)
        try {
           if(!country || !postalCode || !city ||!address) {
              toast.error('All feilds are required')
              return;
           }else {
               dispatch(saveShipping({
                 country, postalCode, city, address
              }))
              navigate('/payment')
           }
        } catch (error) {
          console.log(error)
        }
      }
  return (
    <div className='shipping'>
        <SubHeader />
      <CheckoutSteps step1 step2 />
      <div className="form-wrapper-shipping">
        <div className="form-container-shipping">
          <h2 style={{color:'#c45500', marginBottom:'15px'}}>Enter your shipping address</h2>
          <form onSubmit={handleSubmit}>
            <h5>
              Address <span style={{ color: 'red' }}>*</span>
            </h5>
            <input placeholder='Street address or P.O.Box' required value={address} onChange={(e) => setAddress(e.target.value)} type="text" />
            <h5>
              City <span style={{ color: 'red' }}>*</span>
            </h5>
            <input required value={city} onChange={(e) => setCity(e.target.value)} type="text" />
            <h5>
              Postal code <span style={{ color: 'red' }}>*</span>
            </h5>
            <input required value={postalCode} onChange={(e) => setPostalCode(e.target.value)} type="text" />
            <h5>
              Country <span style={{ color: 'red' }}>*</span>
            </h5>
            <Select required options={countryOptions} onChange={handleCountryChange}
             placeholder="Select a country" />
            <button disabled={loading} type="submit" className="btn-shipping">
              {loading ? 'submitting' : 'use this address'}
            </button>
          </form>
        </div>
      </div>
    </div>
  
  )
};

export default Shipping