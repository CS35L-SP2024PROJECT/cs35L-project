import React from 'react'
import './PageBottom.css'
import Page_logo from '../Assets/Page_logo.png'
import instagram_icon from '../Assets/instagram_icon.png'
import facebook_icon from '../Assets/facebook_icon.jpg'
import x_icon from '../Assets/x_icon.png'

export const PageBottom = () => {
  return (
    <div className='PageBottom'>
        <br />
        <div className="Page-logo">
        <img src={Page_logo} style={{height:100, width:100}} />
        <p>Farmer MarketPlace</p>
        </div>
        <ul className='Page-link'>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="Page-icon">
            <div className="Page-container">
                <img src={instagram_icon} alt="" />
            </div>
            <div className="Page-container">
                <img src={facebook_icon} alt="" />
            </div>
            <div className="Page-container">
                <img src={x_icon} alt="" />
            </div>
        </div>
        <div className="Page-copyright">
            <hr />
            <p>
                Copyright @ 2024 - All Rights Reserved.
            </p>
        </div>
    </div>
  )
}
