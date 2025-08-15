// src/Pages/OrderHistory/OrderHistoryPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import './OrderHistoryPage.css';

function OrderHistoryPage() {
  // Placeholder order history (to be replaced with actual data from backend)
  const orders = [
    {
      id: '12345',
      date: '2025-04-20',
      total: 99.99,
      status: 'Delivered',
    },
  ];

  return (
    <div className="order-history-page">
      <main className="order-history-container">
        <div className="profile-sidebar">
          <ul className="sidebar-menu">
            <li className="menu-item">
              <Link to="/profile">
                <i className="bi bi-person"></i> Profile
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/addresses">
                <i className="bi bi-geo-alt"></i> Addresses
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/payment-methods">
                <i className="bi bi-credit-card"></i> Payment Methods
              </Link>
            </li>
            <li className="menu-item active">
              <Link to="/order-history">
                <i className="bi bi-box"></i> Order History
              </Link>
            </li>
          </ul>
        </div>
        <div className="order-history-content">
          <h2>Order History</h2>
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="order-item">
                <p><strong>Order #{order.id}</strong></p>
                <p>Date: {order.date}</p>
                <p>Total: ${order.total.toFixed(2)}</p>
                <p>Status: {order.status}</p>
                <button className="view-details-btn">View Details</button>
              </div>
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default OrderHistoryPage;