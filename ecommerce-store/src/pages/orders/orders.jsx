//about.jsx
import React, { useEffect } from "react";



const Orders = ()=>{

    useEffect(()=>{
        if(localStorage.getItem('OrderHistory') != null){
            let fetchOrders = localStorage.getItem('OrderHistory');
            let jsonOrders = JSON.parse(fetchOrders)

            console.log(fetchOrders)
            console.log(jsonOrders)
        }
        else{
            localStorage.setItem('OrderHistory',JSON.stringify([]))
        }

},[])
    return(
        <h1>about page here</h1>
    )
}
export default Orders;