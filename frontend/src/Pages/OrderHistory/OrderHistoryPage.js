// src/Pages/OrderHistory/OrderHistoryPage.js
import React from 'react';
import Footer from '../../Components/Footer/Footer';
import ProfileSidebar from '../../Components/ProfileSidebar/ProfileSidebar';
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
    {
      id: '12346',
      date: '2025-04-18',
      total: 149.99,
      status: 'Shipped',
    },
    {
      id: '12347',
      date: '2025-04-15',
      total: 79.99,
      status: 'Processing',
    },
    {
      id: '12348',
      date: '2025-04-10',
      total: 199.99,
      status: 'Delivered',
    },
  ];

  return (
    <div className="order-history-page">
      <main className="order-history-container">
        <ProfileSidebar />
        <div className="order-history-content">
          <h2>Order History</h2>
          {orders.length > 0 ? (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-item">
                  <p><strong>Order #{order.id}</strong></p>
                  <p>Date: {order.date}</p>
                  <p>Total: ${order.total.toFixed(2)}</p>
                  <p>Status: {order.status}</p>
                  <button className="view-details-btn">View Details</button>
                </div>
              ))}
            </div>
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