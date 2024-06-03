import React from 'react'
import './NewProducts.css'
import new_products from '../Assets/new_products'
import { Item } from '../Item/Item'

export const NewProducts = () => {
  return (
    <div className='newProducts'>
        <h1>NEW PRODUCTS ON STOCK</h1>
        <hr />
        <div className="newProduct">
            {new_products.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}
