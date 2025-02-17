import React from 'react'
import css from "./catagory.module.css";
function CatagoryCard({data}) {
  return (
    <div className ={css.catagory}>
      <a href="" className={css.inner_content}>
        <span>
          <h2>{data.title}</h2>
        </span>
        <img src={data.imageLink} alt={data.title} />
        <p>shop now</p>
      </a>
    </div>
  );
}

export default CatagoryCard