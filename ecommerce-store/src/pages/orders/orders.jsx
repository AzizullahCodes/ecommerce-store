// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Orders = () => {
//   const navigate = useNavigate();
//   const [myOrders, setMyOrders] = useState([]);
//   const [tab, setTab] = useState("All");

//   const tabs = ["All", "Pending", "Delivered", "Cancelled"];

//   // page khulte hi current user ke orders load karo
//   useEffect(() => {
//     const allOrders = JSON.parse(localStorage.getItem("OrderHistory")) || [];
//     const user = JSON.parse(localStorage.getItem("loggedInUser"));

//     const userOrders = allOrders
//       .filter((order) => order.userId === user?.email)
//       .reverse(); // latest sabse upar

//     setMyOrders(userOrders);
//   }, []);

//   // Cancel Order
//   const cancelOrder = (orderId) => {
//     const allOrders = JSON.parse(localStorage.getItem("OrderHistory")) || [];

//     const updated = allOrders.map((order) =>
//       order.orderId === orderId ? { ...order, status: "Cancelled" } : order
//     );
//     localStorage.setItem("OrderHistory", JSON.stringify(updated));

//     setMyOrders(
//       myOrders.map((order) =>
//         order.orderId === orderId ? { ...order, status: "Cancelled" } : order
//       )
//     );
//   };

//   // Buy Again: purane items wapas cart mein
//   const buyAgain = (items) => {
//     const cart = JSON.parse(localStorage.getItem("YourOrders")) || [];

//     items.forEach((item) => {
//       const found = cart.find((c) => c.productId === item.productId);
//       if (found) {
//         found.quantity += item.quantity;
//       } else {
//         cart.push({ ...item });
//       }
//     });

//     localStorage.setItem("YourOrders", JSON.stringify(cart));
//     navigate("/cart"); // apne cart ka asli route likho
//   };

//   // tab ke hisaab se filter
//   const filteredOrders =
//     tab === "All"
//       ? myOrders
//       : myOrders.filter((order) => (order.status || "Pending") === tab);

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>My Orders ({myOrders.length})</h1>

//       {/* Tabs */}
//       <div style={{ marginBottom: 20 }}>
//         {tabs.map((t) => (
//           <button
//             key={t}
//             onClick={() => setTab(t)}
//             style={{
//               marginRight: 10,
//               padding: "6px 14px",
//               cursor: "pointer",
//               background: tab === t ? "#0d6efd" : "#eee",
//               color: tab === t ? "#fff" : "#000",
//               border: "none",
//               borderRadius: 5,
//             }}
//           >
//             {t}
//           </button>
//         ))}
//       </div>

//       {filteredOrders.length === 0 && <p>Koi order nahi mila.</p>}

//       {filteredOrders.map((order) => {
//         const status = order.status || "Pending";

//         return (
//           <div
//             key={order.orderId}
//             style={{
//               border: "1px solid #ccc",
//               borderRadius: 8,
//               padding: 15,
//               marginBottom: 20,
//             }}
//           >
//             <h3>Order #{order.orderId}</h3>
//             <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
//             <p>
//               Status: <b>{status}</b>
//             </p>

//             {order.estimatedDelivery && status !== "Cancelled" && (
//               <p>
//                 Estimated Delivery:{" "}
//                 {new Date(order.estimatedDelivery).toLocaleDateString()}
//               </p>
//             )}

//             <p>
//               Payment: {order.paymentMethod || "COD"} (
//               {order.paymentStatus || "Unpaid"})
//             </p>

//             {/* Items */}
//             {order.bucket.map((item) => (
//               <div
//                 key={item.productId}
//                 style={{ display: "flex", gap: 15, marginBottom: 10 }}
//               >
//                 <img
//                   src={item.productImage}
//                   alt={item.productName}
//                   style={{ width: 60, height: 60, objectFit: "contain" }}
//                 />
//                 <div>
//                   <div>{item.productName}</div>
//                   <div>
//                     {item.productPrice} x {item.quantity} ={" "}
//                     {item.productPrice * item.quantity} PKR
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {order.otherDetails && <p>Note: {order.otherDetails}</p>}
//             <h4>Total: {order.totalPrice} PKR</h4>

//             {/* Buttons */}
//             <button onClick={() => navigate(`/orders/${order.orderId}`)}>
//               View Details
//             </button>{" "}
//             <button onClick={() => buyAgain(order.bucket)}>Buy Again</button>{" "}
//             {status === "Pending" && (
//               <button onClick={() => cancelOrder(order.orderId)}>
//                 Cancel Order
//               </button>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Orders;



import React, { useEffect, useState } from "react";



const Orders = ()=>{
    const [myOrders,setMyOrders] = useState('')
    const orderStatus = ['pending','confirmed','cancelled','delivered','shipped']
    const [list,setList] = useState([])




    useEffect(()=>{
        let fetchAllOrders = localStorage.getItem("OrderHistory") || []
        // console.log(fetchAllOrders)
        if(!fetchAllOrders){
            alert('No order found now')
        }
        else{
            let jsonOrders = JSON.parse(fetchAllOrders)
            //  console.log('json orders...',jsonOrders) 
            console.log(jsonOrders.bucket)
            jsonOrders && setList(jsonOrders.bucket)

              jsonOrders && setMyOrders(jsonOrders)
        }
    },[])


    return(
        <div>
            <h1>My All Orders page</h1>
            <h1>{myOrders.orderId}</h1>
            <h1>{myOrders.orderDate}</h1>
            <h1>{myOrders.orderTime}</h1>
            <h2>Order status : {orderStatus[0]}</h2>
            <h2>item list</h2>
            <div>
                <ul>{
                    list?.map((item,index)=>{
                        return <li key={item.productId}>
                            <h3>{item.productName} <div><img src={item.productImage} alt="" /></div> {item.productPrice} {item.quantity} {item.productPrice * item.quantity}</h3>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Orders