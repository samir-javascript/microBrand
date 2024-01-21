import React from 'react'
import './styles.css'
import BannerMission from '../bannerMissionComponent/BannerMission'
const Banner = () => {
  return (
    <div>
    <div  className='video-banner'>
        <video src="/images/micro_vedio.mp4" autoPlay loop muted />
    </div>
    <div className='amazon-poster'>
        <img alt="" className="EditorialTileImage__image__fCzoQ" 
        src="https://m.media-amazon.com/images/S/stores-image-uploads-na-prod/f/AmazonStores/ATVPDKIKX0DER/f74d90fc726aee0fcb695185dbbd928a.w3000.h1500._CR0%2C0%2C3000%2C1500_SX1500_.jpg" srcSet="https://m.media-amazon.com/images/S/stores-image-uploads-na-prod/f/AmazonStores/ATVPDKIKX0DER/f74d90fc726aee0fcb695185dbbd928a.w3000.h1500._CR0%2C0%2C3000%2C1500_SX840_.jpg 840w, https://m.media-amazon.com/images/S/stores-image-uploads-na-prod/f/AmazonStores/ATVPDKIKX0DER/f74d90fc726aee0fcb695185dbbd928a.w3000.h1500._CR0%2C0%2C3000%2C1500_SX1280_.jpg 1280w, https://m.media-amazon.com/images/S/stores-image-uploads-na-prod/f/AmazonStores/ATVPDKIKX0DER/f74d90fc726aee0fcb695185dbbd928a.w3000.h1500._CR0%2C0%2C3000%2C1500_SX1500_.jpg 1500w, https://m.media-amazon.com/images/S/stores-image-uploads-na-prod/f/AmazonStores/ATVPDKIKX0DER/f74d90fc726aee0fcb695185dbbd928a.w3000.h1500._CR0%2C0%2C3000%2C1500_SX1920_.jpg 1920w, https://m.media-amazon.com/images/S/stores-image-uploads-na-prod/f/AmazonStores/ATVPDKIKX0DER/f74d90fc726aee0fcb695185dbbd928a.w3000.h1500._CR0%2C0%2C3000%2C1500_SX3000_.jpg 3000w" sizes="(max-width: 840px) 100vw,(max-width: 1500px) 100vw,1500px" style={{verticalAlign:'middle'}} data-feature="af" data-testid="image" />
    </div>
    <BannerMission />
    </div>
  )
}

export default Banner

// 	

