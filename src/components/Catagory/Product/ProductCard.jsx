import React from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../../CurrencyFormat/CurrencyFormat";
import css from "./product.module.css";
import {Link} from "react-router-dom"

function ProductCard({ product }) {
  const { image, title, id, rating = { rate: 0, count: 0 }, price } = product;
  return (
    <div className={css.card_container}>
      <Link to={`/products/${id}`}>
        <img src={image} className={css.img_container} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>
        <div className={css.rating}>
          {/* rating */}
          <Rating value={rating.rate} precision={0.1} />
          {/* count */}
          <small>{rating.count}</small>
        </div>
        <div>
          {/* price */}
          <CurrencyFormat amount={price} />
        </div>
      </div>
      <button className={css.btn}>add to cart</button>
    </div>
  );
}

export default ProductCard;
