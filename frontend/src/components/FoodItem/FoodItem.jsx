import React from 'react'
import { useContext } from 'react'

import './FoodItem.css'
import { assets } from "../../assets/assets"
import { StoreContext } from '../../context/StoreContext'

export const FoodItem = ({id,name,price,description,image}) => {

  const {cartItems, setCartItems, addToCart, removeFromCart} = useContext(StoreContext)

  return (
    <div className='food-item'>
        <div className="food-item-img-continer">
        <img className="food-item-image" src={`http://localhost:4000/images/${image}`} alt={name} />

            {
              !cartItems[id] ? <img className='add'onClick={()=>addToCart(id)} src = {assets.add_icon_white}alt=""/>:<div className='food-item-counter'>
              <img onClick={()=>removeFromCart(id)} src= {assets.remove_icon_red} alt="" />
              <p>{cartItems[id]}</p>
              <img src= {assets.add_icon_green} alt="" onClick={()=>addToCart(id)}/>

              </div>
            }
        </div>
        <div className="food-item-info">
            <div className='food-item-name-rating'>
                <p>{name}</p>
                <img src={assets.rating_starts} alt="star" />
            </div>
                <p className='food-item-desc'>{description}</p>
                <p className="food-item-price">${price}</p>
        </div>
    </div>
  )
}
