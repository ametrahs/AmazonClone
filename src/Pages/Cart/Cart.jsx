import React, { useContext } from "react";
import Layouts from '../../components/Layouts/Layouts'
import { DataContext } from '../../components/DataProvider/DataProvider'
import ProductCard from "../../components/Product/ProductCard"
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import {Link} from "react-router-dom"
import css from "./cart.module.css"

function Cart() {
    const[{basket, user},dispatch] = useContext(DataContext)
    const total = basket.reduce((amount,item) => {
      return item.price  * item.amount+ amount
    },0)
    console.log(basket)
  return (
    <Layouts>
      <section className={css.container}>
        <div className={css.cart_container}>
          <h2>Hello, {user ? user.displayName : "Dear customer"}</h2> 
          <h3>Your shopping basket</h3>
          <hr />
          {basket?.length == 0 ? (
            <p>Opps! no item in your cart</p>
          ) : (
            basket?.map((item, i) => {
              return (
                <ProductCard
                  key={i}
                  product={item}
                  renderDesc={true}
                  renderAdd={false}
                  flex={true}
                />
              );
            })
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={css.subtotal}>
            <div>
             
              <p>Subtotal ({basket?.length} items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" name="" id="" />
              <small> This order contains a gift </small>
            </span>
            <Link to="/payments"> Continue to checkout</Link>
          </div>
        )}
      </section>
    </Layouts>
  );
}

export default Cart