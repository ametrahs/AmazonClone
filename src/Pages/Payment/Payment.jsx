import React, { useContext, useState } from "react";
import css from "./payment.module.css";
import Layouts from "../../components/Layouts/Layouts";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";


function Payment() {
  const [{ user, basket }] = useContext(DataContext);
  console.log(user);

 

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);


 const total = basket.reduce((amount, item) => {
   return item.price * item.amount + amount;
 }, 0);



  const [cardError, setCardError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    // console.log(e)
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  return (
    <Layouts>
      {/* header */}
      <div className={css.payment_header}>Checkout ({totalItem}) items</div>
      {/* payment method */}
      <section className={css.payment_container}>
        {/* address */}
        <div className={css.flex}>
          <h3> Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Bati, Wollo</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={css.flex}>
          <h3> Review items and delivery</h3>
          <div className={css.product_list}>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} key={item.id} />
            ))}
          </div>
        </div>
        <hr />

        {/* cardform */}
        <div className={css.flex}>
          <h3>Payment Methods</h3>
          <div className={css.payment_card_container}>
            <div className={css.payment_details}>
              <form action="">
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* cardelement */}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div className={css.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p> Total Order | </p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button> Pay Now</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layouts>
  );
}

export default Payment;
