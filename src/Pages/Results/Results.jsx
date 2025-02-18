import React,{useState, useEffect} from 'react'
import Layouts from '../../components/Layouts/Layouts'
import {useParams} from "react-router-dom"
import axios from "axios"
import { productUrl } from '../../Api/basePoint'
import ProductCard from '../../components/Catagory/Product/ProductCard'
import css from "./results.module.css"
function Results() {
    const [results, setResults] = useState([]);
     const { categoryName } = useParams();
     console.log(categoryName);
    useEffect(() => {
     
      axios
        .get(`${productUrl}/products/category/${categoryName}`)
        .then((res) => {
          setResults(res.data);
           console.log(res)
        })
        .catch((err) => {
          console.log(err);
        });
      // console.log(categoryName);
    }, [])
    
   
  return (
    <Layouts>
       <section>
        <h1 style ={{padding:'30px'}}>Results</h1>
        <p style={{padding:'30px'}}>Category/ {categoryName}</p>
        <hr />
        <div className={css.products_container}>
            {results?.map((product) =>(
                <ProductCard key={product.id}  product={product}/>
            ))}

        </div>
       </section>
        
        </Layouts>
  )
  
}

export default Results