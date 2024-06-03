import React from 'react'
import './Offer.css'
import exclusive_image from '../Assets/exclusive_image.png'

export const Offers = () => {
  return (
    <div className='offers'>
        <div className="offers-left">
            <h1>Limited-Time Offer</h1>
            <h2>Get Early Access to Exclusive Deals!</h2>
            <button>Check Now</button>
        </div>
        <div className="offers-right">
            <img src={exclusive_image} style={{height:350, width:350}} />
        </div>
    </div>
  )
}
