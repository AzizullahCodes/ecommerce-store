// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const OrderDetailsPage = () => {
//   const { orderId } = useParams(); // URL se orderId milti hai
//   const navigate = useNavigate();
//   const [order, setOrder] = useState(null);

//   // localStorage se wahi order dhoondo
//   useEffect(() => {
//     const allOrders = JSON.parse(localStorage.getItem("OrderHistory")) || [];
//     const found = allOrders.find((o) => String(o.orderId) === orderId);
//     setOrder(found);
//   }, [orderId]);

//   if (!order) {
//     return <p style={{ padding: 20 }}>Order nahi mila.</p>;
//   }

//   const status = order.status || "Pending";

//   // timeline ke steps
//   const steps = ["Pending", "Confirmed", "Shipped", "Delivered"];
//   const currentStep = steps.indexOf(status);

//   return (
//     <div style={{ padding: 20, maxWidth: 700 }}>
//       <button onClick={() => navigate("/orders")}>← Back to Orders</button>

//       <h1>Order #{order.orderId}</h1>
//       <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>

//       {/* 1. Status timeline */}
//       <h3>Order Status</h3>
//       {status === "Cancelled" ? (
//         <p style={{ color: "red" }}><b>Ye order cancel ho chuka hai.</b></p>
//       ) : (
//         <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
//           {steps.map((step, index) => (
//             <div
//               key={step}
//               style={{
//                 padding: "8px 12px",
//                 borderRadius: 5,
//                 background: index <= currentStep ? "green" : "#ddd",
//                 color: index <= currentStep ? "#fff" : "#000",
//               }}
//             >
//               {step}
//             </div>
//           ))}
//         </div>
//       )}

//       {order.estimatedDelivery && status !== "Cancelled" && (
//         <p>
//           Estimated Delivery:{" "}
//           {new Date(order.estimatedDelivery).toLocaleDateString()}
//         </p>
//       )}

//       {/* 2. Items */}
//       <h3>Items</h3>
//       {order.bucket.map((item) => (
//         <div
//           key={item.productId}
//           style={{ display: "flex", gap: 15, marginBottom: 10 }}
//         >
//           <img
//             src={item.productImage}
//             alt={item.productName}
//             style={{ width: 60, height: 60, objectFit: "contain" }}
//           />
//           <div>
//             <div>{item.productName}</div>
//             <div>
//               {item.productPrice} x {item.quantity} ={" "}
//               {item.productPrice * item.quantity} PKR
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* 3. Shipping address */}
//       <h3>Shipping Address</h3>
//       {order.shippingAddress ? (
//         <p>
//           {order.shippingAddress.name} <br />
//           {order.shippingAddress.phone} <br />
//           {order.shippingAddress.address}, {order.shippingAddress.city}
//         </p>
//       ) : (
//         <p>Address save nahi hai.</p>
//       )}

//       {/* 4. Payment */}
//       <h3>Payment</h3>
//       <p>
//         {order.paymentMethod || "COD"} ({order.paymentStatus || "Unpaid"})
//       </p>

//       {/* 5. Price summary */}
//       <h3>Price Summary</h3>
//       <p>Delivery Charges: {order.deliveryCharges || 0} PKR</p>
//       <h4>Total: {order.totalPrice} PKR</h4>

//       {order.otherDetails && <p>Note: {order.otherDetails}</p>}
//     </div>
//   );
// };

// export default OrderDetailsPage;



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./OrderDetail.css";

const OrderDetail = () => {
  const { orderId } = useParams(); // URL se orderId
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  // timeline ke steps
  const steps = ["Pending", "Confirmed", "Shipped", "Delivered"];

  // order dhoondo
  useEffect(() => {
    let allOrders = JSON.parse(localStorage.getItem("OrderHistory"));
    let activeUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (Array.isArray(allOrders)) {
      let found = allOrders.find(
        (o) => String(o.orderId) === orderId && o.userId === activeUser?.email
      );
      setOrder(found || null);
    }
  }, [orderId]);

  // Cancel Order
  const cancelOrder = () => {
    let allOrders = JSON.parse(localStorage.getItem("OrderHistory")) || [];

    let updated = allOrders.map((o) =>
      o.orderId === order.orderId ? { ...o, status: "Cancelled" } : o
    );
    localStorage.setItem("OrderHistory", JSON.stringify(updated));

    setOrder({ ...order, status: "Cancelled" });
  };

  if (!order) {
    return (
      <div className="detail-page">
        <p className="detail-notfound">Order nahi mila.</p>
        <button className="detail-back" onClick={() => navigate("/orders")}>
          ← Back to Orders
        </button>
      </div>
    );
  }

  let status = order.status || "Pending";
  let currentStep = steps.indexOf(status);
  let itemsTotal = order.bucket.reduce(
    (sum, item) => sum + Number(item.productPrice) * Number(item.quantity),
    0
  );

  return (
    <div className="detail-page">
      <button className="detail-back" onClick={() => navigate("/orders")}>
        ← Back to Orders
      </button>

      {/* Header */}
      <div className="detail-card">
        <div className="detail-header">
          <div>
            <p className="detail-label">Order ID</p>
            <h1 className="detail-id">#{order.orderId}</h1>
            <p className="detail-date">
              {new Date(order.orderDate).toLocaleDateString()} {order.orderTime}
            </p>
          </div>
          <span className={`detail-badge badge-${status.toLowerCase()}`}>
            {status}
          </span>
        </div>

        {/* Timeline */}
        <h3 className="detail-section">Order Status</h3>
        {status === "Cancelled" ? (
          <p className="detail-cancelled">Ye order cancel ho chuka hai.</p>
        ) : (
          <div className="timeline">
            {steps.map((step, index) => (
              <div
                key={step}
                className={
                  index <= currentStep ? "timeline-step done" : "timeline-step"
                }
              >
                <div className="timeline-circle">
                  {index <= currentStep ? "✓" : index + 1}
                </div>
                <span className="timeline-text">{step}</span>
              </div>
            ))}
          </div>
        )}

        {order.estimatedDelivery && status !== "Cancelled" && status !== "Delivered" && (
          <p className="detail-estimate">
            Estimated Delivery:{" "}
            <b>{new Date(order.estimatedDelivery).toLocaleDateString()}</b>
          </p>
        )}
      </div>

      {/* Items */}
      <div className="detail-card">
        <h3 className="detail-section">Items</h3>
        <ul className="detail-items">
          {order.bucket.map((item) => (
            <li key={item.productId} className="detail-item">
              <img
                className="detail-item-img"
                src={item.productImage}
                alt={item.productName}
              />
              <div className="detail-item-info">
                <h4>{item.productName}</h4>
                <p>
                  {item.productPrice} PKR x {item.quantity}
                </p>
              </div>
              <div className="detail-item-total">
                {item.productPrice * item.quantity} PKR
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Shipping + Payment */}
      <div className="detail-two-col">
        <div className="detail-card">
          <h3 className="detail-section">Shipping Address</h3>
          {order.shippingAddress ? (
            <div className="detail-text">
              <p><b>{order.shippingAddress.name}</b></p>
              <p>{order.shippingAddress.phone}</p>
              <p>
                {order.shippingAddress.address}, {order.shippingAddress.city}
              </p>
            </div>
          ) : (
            <p className="detail-text">Address save nahi hai.</p>
          )}
        </div>

        <div className="detail-card">
          <h3 className="detail-section">Payment</h3>
          <div className="detail-text">
            <p>Method: <b>{order.paymentMethod || "COD"}</b></p>
            <p>Status: <b>{order.paymentStatus || "Unpaid"}</b></p>
            {order.otherDetails && <p>Note: {order.otherDetails}</p>}
          </div>
        </div>
      </div>

      {/* Price summary */}
      <div className="detail-card">
        <h3 className="detail-section">Price Summary</h3>
        <div className="summary-row">
          <span>Items Total</span>
          <span>{itemsTotal} PKR</span>
        </div>
        <div className="summary-row">
          <span>Delivery Charges</span>
          <span>{order.deliveryCharges || 0} PKR</span>
        </div>
        <div className="summary-row summary-grand">
          <span>Grand Total</span>
          <span>{order.totalPrice} PKR</span>
        </div>
      </div>

      {/* Cancel button: sirf Pending par */}
      {status === "Pending" && (
        <button className="detail-cancel-btn" onClick={cancelOrder}>
          Cancel Order
        </button>
      )}
    </div>
  );
};

export default OrderDetail;