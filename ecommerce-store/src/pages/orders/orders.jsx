//about.jsx
import React, { useEffect, useState } from "react";



const Orders = ()=>{
    const [myOrders,setMyOrders] = useState([])

    useEffect(()=>{
        if(localStorage.getItem('OrderHistory') != null){
            let fetchOrders = localStorage.getItem('OrderHistory');
            let jsonOrders = JSON.parse(fetchOrders)

            console.log(fetchOrders)
            console.log(jsonOrders)
            console.log(`my orders length is ${jsonOrders.length}`)
            jsonOrders && setMyOrders(jsonOrders)
        }
        else{
            localStorage.setItem('OrderHistory',JSON.stringify([]))
        }

},[])
console.log('cureently orders are...',myOrders)
    return(
        <div>
            <h1>My orders page</h1>
            <h1>My total Orders {myOrders.length}</h1>
            <h1>My OrderId {myOrders.orderId}</h1>
        </div>
    )
}
export default Orders;