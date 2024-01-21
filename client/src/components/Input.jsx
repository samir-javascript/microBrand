import React, {useState} from 'react'
import { FaSearch } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'

const Input = () => {
    const {keyword:keywordUrl} = useParams()
    const navigate = useNavigate()
    const [searchTerm,setSearchTerm] = useState(keywordUrl || '')
    const handleSearch = ()=> {
        if(searchTerm.trim()) {
          navigate(`/search/${searchTerm}`)
          setSearchTerm('')
        }else {
          navigate('/')
        }
    }
      return (
               <div className='search-navbar'>
                  <input 
                   onKeyPress={(e)=> {
                     if(e.key === 'Enter') {
                        handleSearch()
                     }
                   }}
                  value={searchTerm} 
                  onChange={(e)=> setSearchTerm(e.target.value)} type="text"
                   placeholder='search logiTech...' className='search-input' />
                  <FaSearch className='search-icon' />
              </div>
  )
}

export default Input