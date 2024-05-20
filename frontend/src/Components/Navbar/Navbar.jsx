import React, { useContext, useEffect, useState } from "react";
import {Link} from "react-router-dom";
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { ShopContext } from "../../Context/ShopContext";


export const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const {getTotalCartItem} = useContext(ShopContext);

  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} style={{height:90, width:90}} />
            <p>Farmer MarketPlace</p>
            </div>
            <ul className="nav-menu">
            <li onClick={()=>{setMenu("Home")}}><Link style={{textDecoration: 'none' }}to='/'>Home</Link>{menu==="Home"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Meats")}}><Link style={{textDecoration: 'none' }}to='/Meats'>Meats</Link>{menu==="Meats"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Vegetables")}}><Link style={{textDecoration: 'none' }}to='/Vegetables'>Vegetables</Link>{menu==="Vegetables"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Dairy & Egg")}}><Link style={{textDecoration: 'none' }}to='/Dairy & Egg'>Dairy & Egg</Link>{menu==="Dairy & Egg"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("About")}}><Link style={{textDecoration: 'none' }}to='/About'>About</Link>{menu==="About"?<hr/>:<></>}</li>
            </ul>
            <div className="nav-login-cart">
                <Link to='/loginsignup'><button>Login</button></Link>
                <Link to='/cart'><img src={cart_icon} style={{height:50, width:50}} /></Link>
               
                <div className="nav-cart-count">{getTotalCartItem()}</div>
            </div>
    </div>
  )
}
