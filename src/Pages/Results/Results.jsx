import React,{useState, useEffect} from 'react'
import Layouts from '../../components/Layouts/Layouts'
import {useParams} from "react-router-dom"
import axios from "axios"
import { productUrl } from '../../Api/basePoint'
import ProductCard from '../../components/Product/ProductCard'
import css from "./results.module.css"
import Loader from '../../components/Loader/Loader'
function Results() {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
     const { categoryName } = useParams();
     console.log(categoryName);
    useEffect(() => {
     setIsLoading(true);
      axios
        .get(`${productUrl}/products/category/${categoryName}`)
        .then((res) => {
          setResults(res.data);
          setIsLoading(false);
           console.log(res)
        })
        .catch((err) => {
            
          console.log(err);
          setIsLoading(false);
        });
      // console.log(categoryName);
    }, [])
    
   
  return (
    <Layouts>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category/ {categoryName}</p>
        <hr />
        {isLoading ? (
          <Loader />
        ) : (
          <div className={css.products_container}>
            {results?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </Layouts>
  );
  
}

export default Results