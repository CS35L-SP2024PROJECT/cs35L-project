import React from 'react'
import './Homepage.css'
import arrow_icon from '../Assets/arrow.png'

export const Homepage = () => {
  return (
    <div className='homepage'>

        <div className="home-slogan">
            
            <div>
                <p>Farm-to-Home</p>
            </div>
            <p2>Experience the Freshness</p2>
            <h2>
                 Harvest the Best: Fresh, Local, and Organic
            </h2>
        </div>

        <div className="home-latest-btn">
            <div>Latest Collection</div>
            <img src={arrow_icon} alt="" />
        </div>
    </div>
  )
}
