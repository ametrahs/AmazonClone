import React, { useState, useEffect } from "react";
import Axios from "axios";
import ProductCard from "./ProductCard";
import css from "./product.module.css";
import Loader from "../../Loader/Loader";

function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
     setIsLoading(true);
    Axios.get("https://fakestoreapi.com/products")

      .then((res) => {
        console.log(res);
        setProducts(res.data);
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={css.products_container}>
          {products.map((singleProduct) => {
            return (
              <ProductCard product={singleProduct} key={singleProduct.id} />
            );
          })}
        </section>
      )}
    </>
  );
}

export default Product;
