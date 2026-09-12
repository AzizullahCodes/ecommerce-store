//about.jsx
import React, { useEffect } from "react";



const Orders = ()=>{

    useEffect(()=>{
        if(localStorage.getItem('OrderHistory') != null){
            let fetchOrders = localStorage.getItem('OrderHistory');

            console.log(fetchOrders)
        }

},[])
    return(
        <h1>about page here</h1>
    )
}
export default Orders;