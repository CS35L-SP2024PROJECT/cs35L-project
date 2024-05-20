import React, { useContext } from 'react'
import './CSS/Categories.css'
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import { Item } from '../Components/Item/Item';


export const Categories = (props) => {
    const {all_product} = useContext(ShopContext);
  return (
    <div className='Categories'>
        <img className='banner' src={props.banner} alt="" />
        <div className="categories-sort">
            Sort by <img src={dropdown_icon} alt="" />
        </div>
        <div className="categories-products">
            {all_product.map((item,i)=>{
                if (props.category===item.category) {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                }
                else{
                    return null;
                }
            })}
        </div>
    </div>
  )
}

