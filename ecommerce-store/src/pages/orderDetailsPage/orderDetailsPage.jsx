import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const OrderDetailsPage = () => {
  const { orderId } = useParams(); // URL se orderId milti hai
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  // localStorage se wahi order dhoondo
  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem("OrderHistory")) || [];
    const found = allOrders.find((o) => String(o.orderId) === orderId);
    setOrder(found);
  }, [orderId]);

  if (!order) {
    return <p style={{ padding: 20 }}>Order nahi mila.</p>;
  }

  const status = order.status || "Pending";

  // timeline ke steps
  const steps = ["Pending", "Confirmed", "Shipped", "Delivered"];
  const currentStep = steps.indexOf(status);

  return (
    <div style={{ padding: 20, maxWidth: 700 }}>
      <button onClick={() => navigate("/orders")}>← Back to Orders</button>

      <h1>Order #{order.orderId}</h1>
      <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>

      {/* 1. Status timeline */}
      <h3>Order Status</h3>
      {status === "Cancelled" ? (
        <p style={{ color: "red" }}><b>Ye order cancel ho chuka hai.</b></p>
      ) : (
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          {steps.map((step, index) => (
            <div
              key={step}
              style={{
                padding: "8px 12px",
                borderRadius: 5,
                background: index <= currentStep ? "green" : "#ddd",
                color: index <= currentStep ? "#fff" : "#000",
              }}
            >
              {step}
            </div>
          ))}
        </div>
      )}

      {order.estimatedDelivery && status !== "Cancelled" && (
        <p>
          Estimated Delivery:{" "}
          {new Date(order.estimatedDelivery).toLocaleDateString()}
        </p>
      )}

      {/* 2. Items */}
      <h3>Items</h3>
      {order.bucket.map((item) => (
        <div
          key={item.productId}
          style={{ display: "flex", gap: 15, marginBottom: 10 }}
        >
          <img
            src={item.productImage}
            alt={item.productName}
            style={{ width: 60, height: 60, objectFit: "contain" }}
          />
          <div>
            <div>{item.productName}</div>
            <div>
              {item.productPrice} x {item.quantity} ={" "}
              {item.productPrice * item.quantity} PKR
            </div>
          </div>
        </div>
      ))}

      {/* 3. Shipping address */}
      <h3>Shipping Address</h3>
      {order.shippingAddress ? (
        <p>
          {order.shippingAddress.name} <br />
          {order.shippingAddress.phone} <br />
          {order.shippingAddress.address}, {order.shippingAddress.city}
        </p>
      ) : (
        <p>Address save nahi hai.</p>
      )}

      {/* 4. Payment */}
      <h3>Payment</h3>
      <p>
        {order.paymentMethod || "COD"} ({order.paymentStatus || "Unpaid"})
      </p>

      {/* 5. Price summary */}
      <h3>Price Summary</h3>
      <p>Delivery Charges: {order.deliveryCharges || 0} PKR</p>
      <h4>Total: {order.totalPrice} PKR</h4>

      {order.otherDetails && <p>Note: {order.otherDetails}</p>}
    </div>
  );
};

export default OrderDetailsPage;