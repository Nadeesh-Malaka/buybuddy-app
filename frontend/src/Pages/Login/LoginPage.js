// src/Pages/Login/LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import userService from '../../services/userService';
import { useUser } from '../../context/UserContext';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await userService.loginUser({
        email: formData.email,
        password: formData.password
      });

      // Use UserContext to manage login state
      login(user, formData.rememberMe);

      console.log("Login successful:", user);
      
      // Redirect to home page or dashboard
      navigate('/');
      
    } catch (error) {
      setError(error.message);
      console.error("Login failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <main className="login-container">
        <div className="login-form">
          <div className="form-header">
            <i className="bi bi-person-fill"></i>
            <h2>Welcome Back</h2>
            <p>Sign in to your account to continue</p>
          </div>
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="error-message" style={{
                color: '#e74c3c',
                backgroundColor: '#fdf2f2',
                padding: '10px',
                borderRadius: '4px',
                marginBottom: '15px',
                border: '1px solid #e74c3c'
              }}>
                {error}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="email">EMAIL ADDRESS</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group options">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label htmlFor="rememberMe">REMEMBER ME</label>
              </div>
              <Link to="/forgot-password" className="forgot-password">
                FORGOT PASSWORD?
              </Link>
            </div>
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
            <p className="signup-link">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default LoginPage;