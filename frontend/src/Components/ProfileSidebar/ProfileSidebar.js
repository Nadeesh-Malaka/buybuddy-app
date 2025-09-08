// src/Components/ProfileSidebar/ProfileSidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ProfileSidebar.css';

function ProfileSidebar() {
  const location = useLocation();
  
  const menuItems = [
    {
      path: '/profile',
      icon: 'bi bi-person',
      label: 'Profile'
    },
    {
      path: '/addresses',
      icon: 'bi bi-geo-alt',
      label: 'Addresses'
    },
    {
      path: '/payment-methods',
      icon: 'bi bi-credit-card',
      label: 'Payment Methods'
    },
    {
      path: '/order-history',
      icon: 'bi bi-box',
      label: 'Order History'
    }
  ];

  return (
    <div className="profile-sidebar">
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.path} className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}>
            <Link to={item.path}>
              <i className={item.icon}></i>
              <span className="menu-text">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfileSidebar;
