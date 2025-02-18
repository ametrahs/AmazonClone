import React, {useState, useEffect} from 'react'
import Layouts from '../../components/Layouts/Layouts'
import css from "./productdetail.module.css"
import { useParams } from "react-router-dom"
import axios from "axios"
import { productUrl } from '../../Api/basePoint'
import ProductCard from '../../components/Product/ProductCard'
import Loader from '../../components/Loader/Loader'


function ProductDetail() {
    const { productId } = useParams();
    // console.log(productId);
    const [product, setProduct] = useState({});
const [isLoading, setIsLoading] = useState(false)

useEffect(() => {
setIsLoading(true)
  axios.get(`${productUrl}/products/${productId}`)
.then((res) =>{
    // console.log(res)
setProduct(res.data)
setIsLoading(false);
}).catch((err) =>{
    console.log(err)
    setIsLoading(false);
})
 
}, [])


  return (
    <>
      <Layouts>
        {isLoading ? (
          <Loader />
        ) : (
          <section className={css.productDetailContainer}>
            <ProductCard product={product}  flex ={true}
            renderDesc={true}/>
          </section>
        )}
      </Layouts>
    </>
  );
}

export default ProductDetail