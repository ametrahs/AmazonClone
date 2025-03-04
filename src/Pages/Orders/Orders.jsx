import React, {useContext,useState, useEffect} from 'react'
import Layouts from "../../components/Layouts/Layouts";
import {db} from "../Utility/firebase"
import { DataContext } from '../../components/DataProvider/DataProvider';
import css from "./orders.module.css"
import {
  collection,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import ProductCard from '../../components/Product/ProductCard';

function Orders() {
  const [{user},dispatch] = useContext(DataContext)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (user) {
      
      const ordersRef = collection(db, "users", user.uid, "orders");
      console.log("Orders Reference:", ordersRef); 

      
      const q = query(ordersRef, orderBy("created", "desc"));
      console.log("Firestore Query:", q);

      
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          console.log("Snapshot Data:", snapshot); 
          const ordersData = snapshot.docs.map((doc) => ({
            id: doc.id,
            data: { ...doc.data() },
          }));
          console.log("Orders Data:", ordersData);
          setOrders(ordersData);
        },
        (error) => {
          console.error("Firestore Error:", error); 
        }
      );

      
      return () => unsubscribe();
    } else {
      
      setOrders([]);
    }
  }, [user]);


  /* useContext (() =>{
if(user){
db.collection('users').doc(user.uid).collection('orders').orderBy('created','desc').onSnapshot((snapshot) =>{
  console.log(snapshot)
})
}else{
}
  },[]) */

  return (
    <Layouts>
      <section className={css.container}>
        <div className={css.orders_container}>
          <h2>Your Orders </h2>
          {
            orders.length === 0 && <p style ={{color : 'green', padding: '30px'}}> you don't have orders yet!</p>
          }
          {/* <Ordered items /> */}
          <div>{
            orders?.map((eachOrder) =>{
              return (
                <div key={eachOrder.id}>
                  <p>Order ID :{eachOrder?.id}</p>
                  <hr />
                  {eachOrder?.data?.basket?.map((order) => {
                    return (
                      <ProductCard product={order} flex={true} key={order.id} />
                    );
                  })}
                </div>
              );
            })
            }</div>
        </div>
      </section>
    </Layouts>
  ); 
}

export default Orders