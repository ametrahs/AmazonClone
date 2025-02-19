import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import css from "./product.module.css";
import {Link} from "react-router-dom"
import { DataContext } from "../DataProvider/DataProvider";
import {Type} from "../../Pages/Utility/action.type"

function ProductCard({ product,renderDesc, flex,renderAdd }) {
  const { image, title, id, rating , price,description } = product;

  const[state,dispatch]=useContext(DataContext)
// console.log(state)

  const addToCart =() =>{
dispatch({
  type: Type.ADD_TO_BASKET,
  item: {
    image,
    title,
    id,
    rating: rating
      ? { rate: rating.rate, count: rating.count }
      : { rate: 0, count: 0 },
    
    price,
    description,
  },
});
  }

  return (
    <div className={`${css.card_container} ${flex ? css.product_flexed : ""}`}>
      <Link to={`/products/${id}`}>
        <img src={image} className={css.img_container} alt={title} />
      </Link>
      <div className={css.mtop}>
        <h3>{title}</h3>
        {renderDesc && <div style={{ maxWidth: "750px" }}>{description}</div>}
        <div className={css.rating}>
          {/* rating */}
          <Rating value={rating?.rate || 0} precision={0.1} />
          {/* count */}
          <small>{rating?.count || 0}</small>
        </div>
        <div>
          {/* price */}
          <CurrencyFormat amount={price} />
        </div>

        {renderAdd && (
          <button className={css.btn} onClick={addToCart}>
            add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
