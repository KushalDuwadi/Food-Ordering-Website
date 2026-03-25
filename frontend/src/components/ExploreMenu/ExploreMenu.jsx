import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

export const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
    <h1>Explore our menu</h1>
    <p className='explore-menu-text'>Choose Form Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae, fugit! Lorem ipsum dolor sit amet.</p>
    <div className='explore-menu-list'>
        {menu_list.map((item, index) => {
            return(
            <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} className='explore-menu-list-item' key={index}>
            <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
            <h3>{item.menu_name}</h3>
            </div>
        )})}
    </div>
    <hr />


    </div>
  )
}

