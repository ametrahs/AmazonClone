import React, { useState, useContext } from "react";
import css from "./signup.module.css";
import { Link } from "react-router-dom";
import { auth } from "../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../components/DataProvider/DataProvider";
import {Type} from "../Utility/action.type"

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // console.log(password, email)

  const[{user},dispatch] = useContext(DataContext)
  console.log(user)

  const authHandler = async (e) => {
    e.preventDefault();
    try {
      if (e.target.name === "signin") {
        // Firebase sign-in

        const userInfo = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(userInfo)
        console.log("User signed in successfully!");
        dispatch({
          type:Type.SET_USER,
          user:userInfo.user,
        })
      } else {
        // Firebase sign-up
        const userInfo = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        ); 
        console.log(userInfo);
        console.log("User created successfully!");
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
      }
    } catch (err) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already in use. Please use a different email.");
      } else if (err.code === "auth/invalid-credential") {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };
  /* const authHandler = async(e) => {
    e.preventDefault();
    // console.log(e.target.name)
    if (e.target.name == "signin") {
      // firebase auth
      signInWithEmailAndPassword(auth, email, password).then((userInfo) =>{
        console.log(userInfo)
      }).catch((err) =>{
        console.log(err)
      })

    }else{
createUserWithEmailAndPassword(auth, email, password).then((userInfo) =>{
        console.log(userInfo)
      }).catch((err) =>{
        console.log(err)
      })
  }}; */

  return (
    <section className={css.login}>
      {/* logo */}
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>

      {/* form */}
      <div className={css.login_container}>
        <h1>Sign-In</h1>
        <form onSubmit={authHandler} action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={css.login_signInButton}
          >
            Sign In
          </button>
        </form>
        {/* agreement */}
        <p>
          By signinig-in you agree to the AMAZON FAKE CLONE Conditions of use &
          Sale. Please see our Privacy Notice. our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        {/* create account btn */}
        <button
          type="submit"
          onClick={authHandler}
          name="signup"
          className={css.login_registerBtn}
        >
          Create your Amazon Account
        </button>
      </div>
    </section>
  );
}

export default Auth;
