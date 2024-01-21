import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
export default function Rating({value, text}){
  return (
    <div  className='rating d-flex items-center'>
      <span>
          {value >= 1 ? <FaStar color='#FFD814' /> : value >= 0.5 ? <FaStarHalfAlt color='#FFD814' /> : <FaRegStar color='#FFD814' />}
      </span>
      <span>
          {value >= 2 ? <FaStar color='#FFD814' /> : value >= 1.5 ? <FaStarHalfAlt color='#FFD814' /> : <FaRegStar color='#FFD814' />}
      </span>
      <span>
          {value >= 3 ? <FaStar color='#FFD814' /> : value >= 2.5 ? <FaStarHalfAlt color='#FFD814' /> : <FaRegStar color='#FFD814' />}
      </span>
      <span>
          {value >= 4 ? <FaStar color='#FFD814' /> : value >= 3.5 ? <FaStarHalfAlt color='#FFD814' /> : <FaRegStar  color='#FFD814'/>}
      </span>
      <span>
          {value >= 5 ? <FaStar color='#FFD814' /> : value >= 4.5 ? <FaStarHalfAlt color='#FFD814'  /> : <FaRegStar color='#FFD814' />}
      </span>
        <span  style={{marginLeft: '5px', marginTop:'3px', fontSize:'14px'}}>{text ? (text) : null}</span>
    </div>
  )
}