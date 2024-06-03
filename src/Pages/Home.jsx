import React from 'react'
import { Homepage } from '../Components/Homepage/Homepage'
import { Popular } from '../Components/Popular/Popular'
import { Offers } from '../Components/Offer/Offer'
import { NewProducts } from '../Components/NewProducts/NewProducts'

export const Home = () => {
  return (
    <div>
        <Homepage/>
        <Popular/>
        <Offers/>
        <NewProducts/>
    </div>
  )
}
