import React, { useContext, useState } from "react";
import css from "./payment.module.css";
import Layouts from "../../components/Layouts/Layouts";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../Utility/firebase";

import { collection, doc, setDoc } from "firebase/firestore"; 

import { useNavigate } from "react-router-dom";

function Payment() {
  const [{ user, basket }] = useContext(DataContext);
  console.log(user);
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

 

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);


 const total = basket?.reduce((amount, item) => {
   return item.price * item.amount + amount;
 }, 0);



  

  const handleChange = (e) => {
    // console.log(e)
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

const handlePayment = async (e) => {
  e.preventDefault();
  if (!stripe || !elements) {
    return;
  }
  try {
    setProcessing(true);
    // 1
    // backend ||  functions --  contact to the client secret
    const response = await axiosInstance({
      method: "post",
      url: `/payment/create?total=${total}`,
    });
    console.log(response.data);
    const clientSecret = response.data?.clientSecret;

    // 2
    // react side conformation using stipe
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    );

    if (error) {
      setCardError(error.message);
      setProcessing(false);
      return;
    }

    // 3. Save order to Firestore
    const userOrdersRef = collection(db, "users", user?.uid, "orders"); 
    const orderDocRef = doc(userOrdersRef, paymentIntent.id); 

    await setDoc(orderDocRef, {
      basket: basket,
      amount: paymentIntent.amount,
      created: paymentIntent.created,
    });


    // console.log(confirmation);
    // 3. Save order to Firestore and clear basket

    /* await db
      .collection("users")
      .doc(user.uid)
      .collection("orders")
      .doc(paymentIntent.id)
      .set({
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      }); */

    if (paymentIntent.status === "succeeded") {
      // 3. Save order to Firestore and clear basket
      console.log("Payment succeeded:", paymentIntent);
      // Add logic to save order and clear basket here
    }

    setProcessing(false);
    navigate("/orders",{state:{msg:"you have placed a new order"}} );
  } catch (error) {
      console.error("Payment error:", error);
      setCardError("An error occurred during payment. Please try again.");
      setProcessing(false);
    }
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
              <form onSubmit ={handlePayment} >
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
                  <button type = "submit"> 
                  {
                    processing ? (
                    <div className={css.loading}>
                      <ClipLoader  color="gray" size ={12} />
                     <p>Please Wait ...</p>
                    </div>
                    ) : "Pay Now"
                  }
                  
                  </button>
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
