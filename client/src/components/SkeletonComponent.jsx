import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
const SkeletonComponent = ({products}) => {
  return (
    Array(products).fill(0).map((_,i) => (
<div key={i} className='card'>
    <div className='card-image'>
       <Skeleton height={250}  style={{width:'250px', margin:'15px 0', opacity:'0.7'}} />
    </div>
    <div style={{marginTop:'10px'}} className='info-card'>
      <Skeleton style={{marginInline:'22px', opacity:'0.7'}} height={15}  width='80%' />
      <Skeleton height={15}  width='60%' style={{marginInline:'22px', opacity:'0.7'}} />
      <Skeleton height={20} width='40%' style={{marginInline:'22px', opacity:'0.7'}} />
    </div>
   
  </div>
    ))
    
  )
}

export default SkeletonComponent