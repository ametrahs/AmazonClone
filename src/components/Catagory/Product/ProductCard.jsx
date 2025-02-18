import React from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../../CurrencyFormat/CurrencyFormat";
import css from "./product.module.css";
function ProductCard({ product }) {
  const { image, title, rating, price } = product;
  return (
    <div className={css.card_container}>
      <a href="">
        <img src={image} alt="" />
      </a>
      <div>
        <h3>{title}</h3>
        <div className={css.rating}>
          {/* rating */}
          <Rating value={rating.rate} precision={0.1} />
          {/* count */}
          <small>{rating.count}</small>
        </div>
        <div>{/* price */}</div>
        <CurrencyFormat amount={price} />
      </div>
      <button className={css.btn}>add to cart</button>
    </div>
  );
}

export default ProductCard;
