import React from 'react'
import './styles.css'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { categoryNames } from '../../constants'
const Category = () => {
  return (
    <div className='category-wrapper'>
    <div className='category-container'>
        <div className='category-statement-title'>
           <h3 className='category-title'>What setup <span style={{color: 'rgb(255, 166, 0)'}}>for your needs ?</span> </h3>
        </div>  
        <div className='category-images'>
           {categoryNames.map(item => (
              <Link key={item.id} to={`/category/${item.name}`}>
                   <Image fluid alt=""
            className="EditorialTileImage__image__fCzoQ Image__cover__CuIOR"
             src={item.imgSrc} srcSet={item.imgSrcSet} 
              sizes="(max-width: 840px) 100vw,(max-width: 1500px) 50vw,750px" style={{verticalAlign:"middle"}} data-feature="af" data-testid="image" />
              </Link>
           ))}
           
               
        </div>
    </div>
    </div>
  )
}
// <img alt="" class="EditorialTileImage__image__fCzoQ Image__cover__CuIOR" src="https://m.media-amazon.com/images/S/stores-image-uploads-na-prod/7/AmazonStores/ATVPDKIKX0DER/9cf23209d2a2deb77c4d082b7bbae5f9.w1494.h750._CR0%2C0%2C1494%2C750_SX750_SY375_.jpg" srcset="https://m.media-amazon.com/images/S/stores-image-uploads-na-prod/7/AmazonStores/ATVPDKIKX0DER/9cf23209d2a2deb77c4d082b7bbae5f9.w1494.h750._CR0%2C0%2C1494%2C750_SX420_SY210_.jpg 420w, https://m.media-amazon.com/images/S/stores-image-uploads-na-prod/7/AmazonStores/ATVPDKIKX0DER/9cf23209d2a2deb77c4d082b7bbae5f9.w1494.h750._CR0%2C0%2C1494%2C750_SX640_SY320_.jpg 640w, https://m.media-amazon.com/images/S/stores-image-uploads-na-prod/7/AmazonStores/ATVPDKIKX0DER/9cf23209d2a2deb77c4d082b7bbae5f9.w1494.h750._CR0%2C0%2C1494%2C750_SX750_SY375_.jpg 750w, https://m.media-amazon.com/images/S/stores-image-uploads-na-prod/7/AmazonStores/ATVPDKIKX0DER/9cf23209d2a2deb77c4d082b7bbae5f9.w1494.h750._CR0%2C0%2C1494%2C750_SX960_SY480_.jpg 960w, https://m.media-amazon.com/images/S/stores-image-uploads-na-prod/7/AmazonStores/ATVPDKIKX0DER/9cf23209d2a2deb77c4d082b7bbae5f9.w1494.h750._CR0%2C0%2C1494%2C750_SX1494_SY747_.jpg 1494w" sizes="(max-width: 840px) 100vw,(max-width: 1500px) 50vw,750px" style="vertical-align:middle" data-feature="af" data-testid="image">
export default Category