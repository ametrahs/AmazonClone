import React from 'react'
import {Link}  from "react-router-dom"
import css from "./catagory.module.css";
function CatagoryCard({data}) {
    console.log(data)
  return (
    <div className={css.catagory}>
      <Link to={`/category/${data.name}`} className={css.inner_content}>
        <span>
          <h2>{data.title}</h2>
        </span>
        <img src={data.imageLink} alt={data.title} />
        <p>shop now</p>
      </Link>
    </div>
  );
}

export default CatagoryCard