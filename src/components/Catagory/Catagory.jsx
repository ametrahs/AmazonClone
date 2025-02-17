import React from 'react'
import {cataFullInfo} from "./cataFullInfo"
import CatagoryCard from './CatagoryCard';
import css from "./catagory.module.css"
function Catagory() {
  return (
  <section className={css.category_container}>
    {cataFullInfo.map((infos) =>(
    <CatagoryCard data ={infos}/>
  ))}
  </section>
  )
}

export default Catagory