import React, { useEffect, useState } from "react";
import "./AdminOrders.css";

const AdminOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [tab, setTab] = useState("All");

  const statusList = ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"];
  const tabs = ["All", ...statusList];

  // saare orders load karo
  useEffect(() => {
    let fetchAllOrders = JSON.parse(localStorage.getItem("OrderHistory"));
    if (Array.isArray(fetchAllOrders)) {
      setAllOrders(fetchAllOrders);
    }
  }, []);

  // status badlo
  const changeStatus = (orderId, newStatus) => {
    let updated = allOrders.map((order) => {
      if (order.orderId === orderId) {
        return {
          ...order,
          status: newStatus,
          // delivered hone par payment bhi paid ho jati hai
          paymentStatus: newStatus === "Delivered" ? "Paid" : order.paymentStatus,
        };
      }
      return order;
    });

    setAllOrders(updated);
    localStorage.setItem("OrderHistory", JSON.stringify(updated));
  };

  // tab ke hisaab se filter, latest sabse upar
  let filteredOrders = allOrders
    .filter((order) => tab === "All" || (order.status || "Pending") === tab)
    .reverse();

  return (
    <div className="admin-orders-page">
      <h1 className="admin-orders-title">All Orders ({allOrders.length})</h1>

      {/* Tabs */}
      <div className="admin-tabs">
        {tabs.map((t) => (
          <button
            key={t}
            className={tab === t ? "admin-tab active" : "admin-tab"}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <p className="admin-empty">Koi order nahi mila.</p>
      )}

      {filteredOrders.map((order) => {
        let status = order.status || "Pending";

        return (
          <div className="admin-order-card" key={order.orderId}>
            {/* Header */}
            <div className="admin-order-header">
              <div>
                <p className="admin-label">Order ID</p>
                <h3 className="admin-order-id">#{order.orderId}</h3>
              </div>

              <div>
                <p className="admin-label">Date</p>
                <p className="admin-value">
                  {new Date(order.orderDate).toLocaleDateString()}
                </p>
              </div>

              <span className={`admin-badge badge-${status.toLowerCase()}`}>
                {status}
              </span>
            </div>

            {/* Customer info */}
            <div className="admin-info">
              <p><b>Customer (account):</b> {order.userId}</p>
              {order.shippingAddress && (
                <>
                  <p><b>Name:</b> {order.shippingAddress.name}</p>
                  <p><b>Phone:</b> {order.shippingAddress.phone}</p>
                  <p>
                    <b>Address:</b> {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city}
                  </p>
                </>
              )}
              <p>
                <b>Payment:</b> {order.paymentMethod} ({order.paymentStatus})
              </p>
              {order.otherDetails && <p><b>Note:</b> {order.otherDetails}</p>}
            </div>

            {/* Items */}
            <ul className="admin-items">
              {order.bucket.map((item) => (
                <li key={item.productId} className="admin-item">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="admin-item-img"
                  />
                  <span className="admin-item-name">{item.productName}</span>
                  <span>
                    {item.productPrice} x {item.quantity}
                  </span>
                  <b>{item.productPrice * item.quantity} PKR</b>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div className="admin-footer">
              <div className="admin-total">Total: {order.totalPrice} PKR</div>

              <div className="admin-status-box">
                <label>Change Status:</label>
                <select
                  value={status}
                  onChange={(e) => changeStatus(order.orderId, e.target.value)}
                >
                  {statusList.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminOrders;