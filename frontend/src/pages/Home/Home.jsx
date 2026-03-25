import React, { useState } from 'react'
import './Home.css'
import { Header } from '../../components/Header/Header'
import { ExploreMenu } from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'

export const Home = ({ foodDisplayRef }) => {
  const [category, setCategory] = useState("All")

  return (
    <>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      
      {/* Add ref to this wrapper div */}
      <div ref={foodDisplayRef}>
        <FoodDisplay category={category} />
      </div>
    </>
  )
}

