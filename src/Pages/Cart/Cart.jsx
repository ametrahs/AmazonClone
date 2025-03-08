import React, { useContext } from "react";
import Layouts from '../../components/Layouts/Layouts'
import { DataContext } from '../../components/DataProvider/DataProvider'
import ProductCard from "../../components/Product/ProductCard"
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import {Link} from "react-router-dom"
import css from "./cart.module.css"
import {Type} from "../../Pages/Utility/action.type"
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

function Cart() {
    const[{basket, user},dispatch] = useContext(DataContext)
    const total = basket.reduce((amount,item) => {
      return item.price  * item.amount+ amount
    },0)
    // console.log(basket)

    const increment =(item) => {
      dispatch({
        type:Type.ADD_TO_BASKET,
        item,
      })
    }
    const decrement =(id) => {
      dispatch({
        type:Type.REMOVE_FROM_BASKET,
        id
      })
    }
  return (
    <Layouts>
      <section className={css.container}>
        <div className={css.cart_container}>
          <div className="center">
            <h2>Hello, {user ? user.displayName : "Dear customer"}</h2>
            <h3>Your shopping basket</h3>
            <hr  style={{borderColor :'gold'}}/>
          </div>

          {basket?.length == 0 ? (
            <p>Opps! no item in your cart</p>
          ) : (
            basket?.map((item, i) => {
              return (
                <section className={css.cart_product}>
                  <ProductCard
                    key={i}
                    product={item}
                    renderDesc={true}
                    renderAdd={false}
                    flex={true}
                  />
                  <div className={css.btn_container}>
                    <button className={css.btn} onClick={() => increment(item)}>
                      <IoIosArrowUp size={30} />
                    </button>
                    <span>{item.amount}</span>
                    <button
                      className={css.btn}
                      onClick={() => decrement(item.id)}
                    >
                      <IoIosArrowDown size={30} />
                    </button>
                  </div>
                </section>
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