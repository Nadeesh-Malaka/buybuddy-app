import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { paymentMethodService } from '../../services/addressPaymentService';
import Footer from '../../Components/Footer/Footer';
import './PaymentMethodsPage.css';

function PaymentMethodsPage() {
  const { user } = useContext(UserContext);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPaymentMethod, setEditingPaymentMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardType: 'CREDIT',
    cardNumber: '',
    cardHolderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    isDefault: false
  });

  useEffect(() => {
    if (user && user.id) {
      loadPaymentMethods();
    }
  }, [user]);

  const loadPaymentMethods = async () => {
    try {
      setLoading(true);
      const userPaymentMethods = await paymentMethodService.getUserPaymentMethods(user.id);
      setPaymentMethods(userPaymentMethods);
    } catch (error) {
      console.error('Error loading payment methods:', error);
      alert(error.message || 'Error loading payment methods');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.id) {
      alert('Please log in to manage payment methods');
      return;
    }

    console.log('Form data being submitted:', formData);
    console.log('Editing payment method:', editingPaymentMethod);

    try {
      setLoading(true);
      if (editingPaymentMethod) {
        console.log('Updating payment method with ID:', editingPaymentMethod.id);
        await paymentMethodService.updatePaymentMethod(editingPaymentMethod.id, formData);
        alert('Payment method updated successfully!');
      } else {
        console.log('Adding new payment method for user:', user.id);
        await paymentMethodService.addPaymentMethod(user.id, formData);
        alert('Payment method added successfully!');
      }
      
      resetForm();
      await loadPaymentMethods(); // Wait for payment methods to reload
    } catch (error) {
      console.error('Error saving payment method:', error);
      alert(error.message || 'Error saving payment method');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (paymentMethod) => {
    setEditingPaymentMethod(paymentMethod);
    setFormData({
      cardType: paymentMethod.cardType || 'CREDIT',
      cardNumber: paymentMethod.cardNumber || '',
      cardHolderName: paymentMethod.cardHolderName || '',
      expiryMonth: paymentMethod.expiryMonth || '',
      expiryYear: paymentMethod.expiryYear || '',
      cvv: '', // Always empty for security when editing
      isDefault: paymentMethod.isDefault || false
    });
    setShowAddForm(true);
  };

  const handleSetDefault = async (paymentMethodId) => {
    try {
      setLoading(true);
      await paymentMethodService.setDefaultPaymentMethod(paymentMethodId);
      await loadPaymentMethods(); // Wait for payment methods to reload
      alert('Default payment method updated successfully!');
    } catch (error) {
      console.error('Error setting default payment method:', error);
      alert(error.message || 'Error setting default payment method');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (paymentMethodId) => {
    if (window.confirm('Are you sure you want to delete this payment method?')) {
      try {
        setLoading(true);
        await paymentMethodService.deletePaymentMethod(paymentMethodId);
        await loadPaymentMethods(); // Wait for payment methods to reload
        alert('Payment method deleted successfully!');
      } catch (error) {
        console.error('Error deleting payment method:', error);
        alert(error.message || 'Error deleting payment method');
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      cardType: 'CREDIT',
      cardNumber: '',
      cardHolderName: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      isDefault: false
    });
    setEditingPaymentMethod(null);
    setShowAddForm(false);
  };

  const maskCardNumber = (cardNumber) => {
    if (!cardNumber || cardNumber.length < 4) return cardNumber;
    const lastFour = cardNumber.slice(-4);
    return `**** **** **** ${lastFour}`;
  };

  const generateMonthOptions = () => {
    const months = [];
    for (let i = 1; i <= 12; i++) {
      const month = i.toString().padStart(2, '0');
      months.push(
        <option key={month} value={month}>
          {month}
        </option>
      );
    }
    return months;
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 20; i++) {
      const year = currentYear + i;
      years.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
    }
    return years;
  };

  if (!user) {
    return (
      <div className="payment-methods-page">
        <h1>My Payment Methods</h1>
        <p>Please log in to manage your payment methods.</p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="payment-methods-page">
      <main className="payment-methods-container">
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
            <li className="menu-item active">
              <Link to="/payment-methods">
                <i className="bi bi-credit-card"></i> Payment Methods
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/order-history">
                <i className="bi bi-box"></i> Order History
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="payment-methods-content">
          <div className="payment-methods-header">
            <h2>Saved Payment Methods</h2>
            <button 
              className="add-payment-method-btn"
              onClick={() => setShowAddForm(true)}
              disabled={loading}
            >
              Add New Payment Method
            </button>
          </div>

          {loading && <div className="loading">Loading...</div>}

          {showAddForm && (
            <div className="payment-method-form-modal">
              <div className="payment-method-form-container">
                <h3>{editingPaymentMethod ? 'Edit Payment Method' : 'Add New Payment Method'}</h3>
                <form onSubmit={handleSubmit} className="payment-method-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Card Type</label>
                      <select
                        name="cardType"
                        value={formData.cardType}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="CREDIT">Credit Card</option>
                        <option value="DEBIT">Debit Card</option>
                        <option value="PREPAID">Prepaid Card</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Card Holder Name *</label>
                      <input
                        type="text"
                        name="cardHolderName"
                        value={formData.cardHolderName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Card Number *</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="16"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Month *</label>
                      <select
                        name="expiryMonth"
                        value={formData.expiryMonth}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Month</option>
                        {generateMonthOptions()}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Expiry Year *</label>
                      <select
                        name="expiryYear"
                        value={formData.expiryYear}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Year</option>
                        {generateYearOptions()}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>CVV {!editingPaymentMethod ? '*' : '(Optional)'}</label>
                      <input
                        type="password"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength="4"
                        required={!editingPaymentMethod}
                      />
                    </div>
                  </div>

                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        name="isDefault"
                        checked={formData.isDefault}
                        onChange={handleInputChange}
                      />
                      Set as default payment method
                    </label>
                  </div>

                  <div className="form-buttons">
                    <button type="button" onClick={resetForm} className="cancel-btn">
                      Cancel
                    </button>
                    <button type="submit" disabled={loading} className="save-btn">
                      {loading ? 'Saving...' : (editingPaymentMethod ? 'Update Payment Method' : 'Add Payment Method')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="payment-methods-list">
            {paymentMethods.length === 0 ? (
              <p className="no-payment-methods">No payment methods found. Add your first payment method!</p>
            ) : (
              paymentMethods.map(paymentMethod => (
                <div key={paymentMethod.id} className={`payment-method-item ${paymentMethod.isDefault ? 'default-payment-method' : ''}`}>
                  {paymentMethod.isDefault && <div className="default-badge">Default</div>}
                  
                  <div className="payment-method-info">
                    <h4>{paymentMethod.cardType} Card</h4>
                    <p><strong>{paymentMethod.cardHolderName}</strong></p>
                    <p>{maskCardNumber(paymentMethod.cardNumber)}</p>
                    <p>Expires: {paymentMethod.expiryMonth}/{paymentMethod.expiryYear}</p>
                  </div>

                  <div className="payment-method-actions">
                    {!paymentMethod.isDefault && (
                      <button 
                        onClick={() => handleSetDefault(paymentMethod.id)}
                        className="set-default-btn"
                        disabled={loading}
                      >
                        Set as Default
                      </button>
                    )}
                    <button 
                      onClick={() => handleEdit(paymentMethod)}
                      className="edit-btn"
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(paymentMethod.id)}
                      className="delete-btn"
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default PaymentMethodsPage;