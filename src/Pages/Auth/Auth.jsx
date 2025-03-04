import React, { useState, useContext } from "react";
import css from "./signup.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Type } from "../Utility/action.type";
import { ClipLoader } from "react-spinners";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // console.log(password, email)

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState({ signIn: false, signUp: false });
  const navStateData = useLocation();
  console.log(navStateData);
  // console.log(user)

  const authHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      if (e.target.name === "signin") {
        // Firebase sign-in
        setLoading({ ...loading, signIn: true });
        const userInfo = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        // console.log(userInfo)
        console.log("User signed in successfully!");
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
        setLoading({ ...loading, signIn: false });
        navigate(navStateData?.state?.redirect || "/");
      } else {
        // Firebase sign-up
        setLoading({ ...loading, signUp: true });
        const userInfo = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        // console.log(userInfo);
        console.log("User created successfully!");
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
        setLoading({ ...loading, signUp: false });
        navigate(navStateData?.state?.redirect || "/");
      }
    } catch (err) {
      console.error(err.code);

      if (err.code === "auth/email-already-in-use") {
        setError("This email is already in use. Please use a different email.");
      } else if (err.code === "auth/invalid-credential") {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("An error occurred. Please try again later.");
      }
      setLoading({ signIn: false, signUp: false });
    }
  };

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
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "hotpink",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}
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
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
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
          {loading.signUp ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;
