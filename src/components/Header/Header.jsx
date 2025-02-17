import React from "react";
import css from "./Header.module.css";
import { BsSearch } from "react-icons/bs";
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
            <a href="#">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon-logo"
              />
            </a>

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
            <a href="" className={css.language}>
              <img
                src="https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-xl.png"
                alt="usflag"
              />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </a>
            <a href="" className={css.sign}>
              <p>Hello,Sign In</p>
              <span>Account & Lists</span>
            </a>
            {/* orders */}
            <a href="" className={css.order}>
              <p>returns</p>
              <span>& Orders</span>
            </a>
            {/* cart */}
            <a to={"/cart"} className={css.cart}>
              <BiCart size={35} />
              <span>0</span>
            </a>
          </div>
        </div>
      </section>
      <LowerHeader />
    </>
  );
}

export default Header;
