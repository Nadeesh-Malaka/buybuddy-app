// src/Pages/SignUp/SignUpPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import userService from '../../services/userService';
import './SignUpPage.css';

function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    // Clear messages when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }
    if (!formData.agreeTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy!");
      setLoading(false);
      return;
    }

    try {
      const user = await userService.registerUser({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      });

      console.log("Registration successful:", user);
      setSuccess("Account created successfully! Redirecting to login...");
      
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (error) {
      setError(error.message);
      console.error("Registration failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <main className="signup-container">
        <div className="signup-form">
          <div className="form-header">
            <i className="bi bi-person-plus-fill"></i>
            <h2>Create an Account</h2>
            <p>Join us to start shopping</p>
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
            {success && (
              <div className="success-message" style={{
                color: '#27ae60',
                backgroundColor: '#f2fdf5',
                padding: '10px',
                borderRadius: '4px',
                marginBottom: '15px',
                border: '1px solid #27ae60'
              }}>
                {success}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="fullName">FULL NAME</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
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
            <div className="form-group">
              <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group terms">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
              />
              <label htmlFor="agreeTerms">
                I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
              </label>
            </div>
            <button type="submit" className="signup-btn" disabled={loading}>
              {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            </button>
            <p className="signin-link">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default SignUpPage;