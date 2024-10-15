import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import "./assets/styles/userpage.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orderget');
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const [expandedOrders, setExpandedOrders] = useState({});

  const toggleShowMore = (orderId) => {
    setExpandedOrders((prevExpanded) => ({
      ...prevExpanded,
      [orderId]: !prevExpanded[orderId],
    }));
  };

  return (
    <div className="orders-container">
      <h1 className="page-title">user Orders</h1>
      <div className="order-grid">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <h2>Order ID: {order._id}</h2>
              <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="products-section">
              <h3>Products:</h3>
              {order.products.slice(0, expandedOrders[order._id] ? order.products.length : 2).map((product, index) => (
                <div key={index} className="product-item">
                  <p><strong>{product.name}</strong></p>
                  <p>Price: ${product.price}</p>
                  <p>Quantity: {product.quantity}</p>
                </div>
              ))}

              {order.products.length > 2 && (
                <button
                  className="show-more-btn"
                  onClick={() => toggleShowMore(order._id)}
                >
                  {expandedOrders[order._id] ? 'Show Less' : 'Show More'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
