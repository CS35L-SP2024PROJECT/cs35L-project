import React, { useContext } from 'react'
import './CartItems.css'
import remove_icon from '../Assets/cart_cross_icon.png'
import { ShopContext } from '../../Context/ShopContext';

export const CartItems = () => {
    const {getTotal, all_product, cartItems, removeProducts} = useContext(ShopContext);
  return (
    <div className='cartitem'>
        <div className="cartitem-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
        {all_product.map((e)=>{
            if(cartItems[e.id]>0){
                return <div>
                    <div className="cartitem-format cartitem-main">
                        <img src={e.image} alt="" className='cartitem-product-icon' />
                        <p>{e.name}</p>
                        <p>${e.new_price}</p>
                        <button className='cartitem-quantity'>{cartItems[e.id]}</button>
                        <p>${e.new_price*cartItems[e.id]}</p>
                        <img src={remove_icon} onClick={()=>{removeProducts(e.id)}} alt="" />
                    </div>
                    <hr />
                </div>
            }
            return null;
        })}
        <div className="cartitem-down">
            <div className="cartitem-total">
                <h1>Cart Totals</h1>
                <div>
                    <div className="cartitem-total-items">
                        <p>Subtotal</p>
                        <p>${getTotal()}</p>
                    </div>
                    <hr />
                    <div className="cartitem-total-items">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitem-total-items">
                        <h2>Total</h2>
                        <p>${getTotal()}</p>
                    </div>
                </div>
                <button>Proceed to Checkout</button>
            </div>
        </div>
    </div>
  )
}
