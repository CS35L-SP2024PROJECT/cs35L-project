import React, { useContext } from 'react'
import './ProductDisplay.css'
import { ShopContext } from '../../Context/ShopContext';

export const ProductDisplay = (props) => {
    const {product} = props;
    const {addProducts} = useContext(ShopContext);
  return (
    <div className='productdisplay'>

        <div className="display-left">
            <img src={product.image} alt="" />
        </div>

        <div className="display-right">
            <h1>{product.name}</h1>
            <div className="display-right-prices">
                <div className="display-right-new-price">${product.new_price}</div>
                <div className="display-right-old-price">${product.old_price}</div>
            </div>
            <button onClick={()=>{addProducts(product.id)}}>Add To Cart</button>
            <p className='display-right-category'>Category: {product.category}</p>
        </div>

        </div>
  )
}
