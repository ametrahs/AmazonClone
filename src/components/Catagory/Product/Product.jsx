import React, { useState, useEffect } from "react";
import Axios from "axios";
import ProductCard from "./ProductCard";
import css from "./product.module.css";
function Product() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    Axios.get("https://fakestoreapi.com/products")

      .then((res) => {
        console.log(res);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className={css.products_container}>
      {products.map((singleProduct) => {
        return <ProductCard product={singleProduct} key={singleProduct.id} />;
      })}
    </section>
  );
}

export default Product;
