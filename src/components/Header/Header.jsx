import React from "react";
import css from "./Header.module.css";
import { BsSearch } from "react-icons/bs";
import {Link} from "react-router-dom"
import { BiCart } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl";
import LowerHeader from "./LowerHeader";

function Header() {
  return (
    <>
      <section>
        <div className={css.header__container}>
          {/* logo */}
          <div className={css.header_logo_container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon-logo"
              />
            </Link>

            {/* delivery */}
            <div className={css.delivery}>
              <span>
                <SlLocationPin />
              </span>

              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          <div className={css.search}>
            {/* search bar */}
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" placeholder="search Amazon" />
            <BsSearch size={25} />
          </div>
          {/* right side link */}
          <div class={css.order__container}>
            <Link to="/" className={css.language}>
              <img
                src="https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-xl.png"
                alt="usflag"
              />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>
            <Link to="/signin" className={css.sign}>
              <p>Hello,Sign In</p>
              <span>Account & Lists</span>
            </Link>
            {/* orders */}
            <Link to="/orders" className={css.order}>
              <p>returns</p>
              <span>& Orders</span>
            </Link>
            {/* cart */}
            <Link to="/cart" className={css.cart}>
              <BiCart size={35}  color="white"/>
              <span>0</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </>
  );
}

export default Header;
