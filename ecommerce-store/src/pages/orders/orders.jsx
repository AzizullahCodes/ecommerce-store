// import React, { useEffect, useState } from "react";
// import "./Orders.css";

// const Orders = () => {
//   const [myOrders, setMyOrders] = useState("");
//   const orderStatus = ["pending", "confirmed", "cancelled", "delivered", "shipped"];
//   const [list, setList] = useState([]);

//   useEffect(() => {
//     let fetchAllOrders = localStorage.getItem("OrderHistory") || [];
//     if (!fetchAllOrders) {
//       alert("No order found now");
//     } else {
//       let jsonOrders = JSON.parse(fetchAllOrders);
//       console.log(jsonOrders.bucket);
//       jsonOrders && setList(jsonOrders.bucket);
//       jsonOrders && setMyOrders(jsonOrders);
//     }
//   }, []);

//   return (
//     <div className="orders-page">
//       <h1 className="orders-title">My All Orders</h1>

//       <div className="order-card">
//         {/* Header */}
//         <div className="order-header">
//           <div>
//             <p className="order-label">Order ID</p>
//             <h2 className="order-id">#{myOrders.orderId}</h2>
//           </div>

//           <div>
//             <p className="order-label">Order Date</p>
//             <p className="order-value">{myOrders.orderDate}</p>
//             <p className="order-value">{myOrders.orderTime}</p>
//           </div>

//           <span className={`status-badge status-${orderStatus[0]}`}>
//             {orderStatus[0]}
//           </span>
//         </div>

//         {/* Items */}
//         <h3 className="items-title">Item List</h3>
//         <ul className="items-list">
//           {list?.map((item) => {
//             return (
//               <li key={item.productId} className="item-row">
//                 <img
//                   className="item-image"
//                   src={item.productImage}
//                   alt={item.productName}
//                 />

//                 <div className="item-info">
//                   <h3 className="item-name">{item.productName}</h3>
//                   <p className="item-meta">
//                     Price: {item.productPrice} PKR &nbsp;|&nbsp; Qty: {item.quantity}
//                   </p>
//                 </div>

//                 <div className="item-subtotal">
//                   {item.productPrice * item.quantity} PKR
//                 </div>
//               </li>
//             );
//           })}
//         </ul>

//         {/* Footer */}
//         <div className="order-footer">
//           <span>Total Price</span>
//           <span className="order-total">{myOrders.totalPrice} PKR</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Orders;


import React, { useEffect, useState } from "react";
import "./Orders.css";

const Orders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const orderStatus = ["pending", "confirmed", "cancelled", "delivered", "shipped"];

  useEffect(() => {
    let fetchAllOrders = JSON.parse(localStorage.getItem("OrderHistory"));
    let activeUser = JSON.parse(localStorage.getItem("loggedInUser"));

    // array ho tabhi aage chalo
    if (Array.isArray(fetchAllOrders)) {
      // sirf current user ke orders, latest sabse upar
      let userOrders = fetchAllOrders
        .filter((order) => order.userId === activeUser?.email)
        .reverse();
      setMyOrders(userOrders);
    }
  }, []);

  if (myOrders.length === 0) {
    return (
      <div className="orders-page">
        <h1 className="orders-title">My All Orders</h1>
        <p className="empty-text">Aapne abhi tak koi order nahi kiya.</p>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h1 className="orders-title">My All Orders ({myOrders.length})</h1>

      {myOrders.map((order) => {
        // status lowercase mein, taake badge ki CSS class match kare
        let status = (order.status || orderStatus[0]).toLowerCase();

        return (
          <div className="order-card" key={order.orderId}>
            {/* Header */}
            <div className="order-header">
              <div>
                <p className="order-label">Order ID</p>
                <h2 className="order-id">#{order.orderId}</h2>
              </div>

              <div>
                <p className="order-label">Order Date</p>
                <p className="order-value">
                  {new Date(order.orderDate).toLocaleDateString()}
                </p>
                <p className="order-value">{order.orderTime}</p>
              </div>

              <span className={`status-badge status-${status}`}>{status}</span>
            </div>

            {/* Delivery + payment info */}
            <div className="order-info">
              {order.shippingAddress && (
                <p>
                  <b>Ship to:</b> {order.shippingAddress.name},{" "}
                  {order.shippingAddress.address}, {order.shippingAddress.city} |{" "}
                  {order.shippingAddress.phone}
                </p>
              )}
              <p>
                <b>Payment:</b> {order.paymentMethod} ({order.paymentStatus})
              </p>
              {order.estimatedDelivery && status !== "cancelled" && (
                <p>
                  <b>Estimated Delivery:</b>{" "}
                  {new Date(order.estimatedDelivery).toLocaleDateString()}
                </p>
              )}
              {order.otherDetails && (
                <p>
                  <b>Note:</b> {order.otherDetails}
                </p>
              )}
            </div>

            {/* Items */}
            <h3 className="items-title">Item List</h3>
            <ul className="items-list">
              {order.bucket.map((item) => {
                return (
                  <li key={item.productId} className="item-row">
                    <img
                      className="item-image"
                      src={item.productImage}
                      alt={item.productName}
                    />

                    <div className="item-info">
                      <h3 className="item-name">{item.productName}</h3>
                      <p className="item-meta">
                        Price: {item.productPrice} PKR &nbsp;|&nbsp; Qty: {item.quantity}
                      </p>
                    </div>

                    <div className="item-subtotal">
                      {item.productPrice * item.quantity} PKR
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Footer */}
            {order.deliveryCharges > 0 && (
              <div className="delivery-row">
                <span>Delivery Charges</span>
                <span>{order.deliveryCharges} PKR</span>
              </div>
            )}
            <div className="order-footer">
              <span>Total Price</span>
              <span className="order-total">{order.totalPrice} PKR</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;