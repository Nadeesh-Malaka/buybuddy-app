// src/Components/Navbar/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap for layout
import { useCart } from '../../context/CartContext'; // Import useCart
import { useUser } from '../../context/UserContext'; // Import useUser
import './Navbar.css'; // Custom CSS

function Navbar() {
  const { cartItems } = useCart(); // Get cartItems from context
  const { user, isLoggedIn, logout } = useUser(); // Get user state from context
  const navigate = useNavigate();

  // State for dropdown menu and search
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Function to toggle dropdown
  const toggleDropdown = () => {
    console.log("Toggling dropdown, current state:", isDropdownOpen); // Debug log
    setIsDropdownOpen((prev) => !prev);
  };

  // Function to handle logout
  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/');
    console.log("User logged out");
  };

  // Function to handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); // Clear search input
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search on Enter key
  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container navbar-container">
        {/* Logo */}
        <div className="navbar-brand">
          <Link to="/">BuyBuddy</Link>
        </div>

        {/* Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links, Search, and Icons */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Links */}
          <ul className="navbar-nav navbar-links">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categories">Categories</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/deals">Deals</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin">Admin</Link>
            </li>
          </ul>

          {/* Search Bar */}
          <form className="navbar-search" onSubmit={handleSearch}>
            <input 
              type="search" 
              placeholder="Search products..." 
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={handleSearchKeyPress}
            />
            <button type="submit" className="search-btn" aria-label="Search">
              <i className="bi bi-search"></i>
            </button>
          </form>

          {/* Icons (Cart and User) */}
          <div className="navbar-icons">
            <Link to="/cart" className="navbar-cart">
              <i className="bi bi-cart"></i>
              <span className="badge">{cartItems ? cartItems.length : 0}</span>
            </Link>
            {isLoggedIn ? (
              <div className="navbar-user-dropdown">
                <img
                  src={user?.profilePic?.startsWith('http') ? user.profilePic : `http://localhost:8080${user?.profilePic || '/default-profile.svg'}`}
                  alt="Profile"
                  className="navbar-profile-pic"
                  onClick={toggleDropdown} // Use named function for clarity
                  style={{ cursor: 'pointer' }} // Ensure cursor indicates clickable
                />
                {isDropdownOpen && (
                  <div className="navbar-dropdown-menu">
                    <p className="navbar-dropdown-email">{user?.email}</p>
                    <Link to="/profile" onClick={() => setIsDropdownOpen(false)}>
                      Your Profile
                    </Link>
                    <Link to="/addresses" onClick={() => setIsDropdownOpen(false)}>
                      Addresses
                    </Link>
                    <Link to="/payment-methods" onClick={() => setIsDropdownOpen(false)}>
                      Payment Methods
                    </Link>
                    <Link to="/order-history" onClick={() => setIsDropdownOpen(false)}>
                      Order History
                    </Link>
                    <button className="navbar-logout-btn" onClick={handleLogout}>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="navbar-user">
                <i className="bi bi-person"></i>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;