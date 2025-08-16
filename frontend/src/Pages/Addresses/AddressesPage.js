import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { addressService } from '../../services/addressPaymentService';
import Footer from '../../Components/Footer/Footer';
import ProfileSidebar from '../../Components/ProfileSidebar/ProfileSidebar';
import './AddressesPage.css';

function AddressesPage() {
  const { user } = useContext(UserContext);
  const [addresses, setAddresses] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Auto-remove messages after 5 seconds
  React.useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  React.useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    addressType: 'HOME',
    isDefault: false
  });

  useEffect(() => {
    if (user && user.id) {
      loadAddresses();
    }
  }, [user]);

  const loadAddresses = async () => {
    try {
      setLoading(true);
      setError('');
      const userAddresses = await addressService.getUserAddresses(user.id);
      setAddresses(userAddresses);
    } catch (error) {
      console.error('Error loading addresses:', error);
      setError(error.message || 'Error loading addresses');
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
    // Clear messages when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.id) {
      setError('Please log in to manage addresses');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');
      if (editingAddress) {
        await addressService.updateAddress(editingAddress.id, formData);
        setSuccess('Address updated successfully!');
      } else {
        await addressService.addAddress(user.id, formData);
        setSuccess('Address added successfully!');
      }
      
      resetForm();
      await loadAddresses(); // Wait for addresses to reload
    } catch (error) {
      console.error('Error saving address:', error);
      setError(error.message || 'Error saving address');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setFormData({
      fullName: address.fullName || '',
      phoneNumber: address.phoneNumber || '',
      addressLine1: address.addressLine1 || '',
      addressLine2: address.addressLine2 || '',
      city: address.city || '',
      state: address.state || '',
      zipCode: address.zipCode || '',
      country: address.country || '',
      addressType: address.addressType || 'HOME',
      isDefault: address.isDefault || false
    });
    setShowAddForm(true);
    setError('');
    setSuccess('');
  };

  const handleSetDefault = async (addressId) => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      await addressService.setDefaultAddress(addressId);
      await loadAddresses(); // Wait for addresses to reload
      setSuccess('Default address updated successfully!');
    } catch (error) {
      console.error('Error setting default address:', error);
      setError(error.message || 'Error setting default address');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        setLoading(true);
        setError('');
        setSuccess('');
        await addressService.deleteAddress(addressId);
        await loadAddresses(); // Wait for addresses to reload
        setSuccess('Address deleted successfully!');
      } catch (error) {
        console.error('Error deleting address:', error);
        setError(error.message || 'Error deleting address');
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      phoneNumber: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      addressType: 'HOME',
      isDefault: false
    });
    setEditingAddress(null);
    setShowAddForm(false);
    setError('');
    setSuccess('');
  };

  if (!user) {
    return (
      <div className="addresses-page">
        <h1>My Addresses</h1>
        <p>Please log in to manage your addresses.</p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="addresses-page">
      <main className="addresses-container">
        <ProfileSidebar />
        
        <div className="addresses-content">
          {/* Success/Error Messages */}
          {success && (
            <div className="alert alert-success" style={{
              color: '#0f5132',
              backgroundColor: '#d1e7dd',
              border: '1px solid #badbcc',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              <i className="bi bi-check-circle-fill" style={{ color: '#198754', fontSize: '16px' }}></i>
              {success}
            </div>
          )}
          {error && (
            <div className="alert alert-danger" style={{
              color: '#842029',
              backgroundColor: '#f8d7da',
              border: '1px solid #f5c2c7',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              <i className="bi bi-exclamation-triangle-fill" style={{ color: '#dc3545', fontSize: '16px' }}></i>
              {error}
            </div>
          )}

          <div className="addresses-header">
            <h2>Saved Addresses</h2>
            <button 
              className="add-address-btn"
              onClick={() => {
                setShowAddForm(true);
                setError('');
                setSuccess('');
              }}
              disabled={loading}
            >
              Add New Address
            </button>
          </div>

          {loading && <div className="loading">Loading...</div>}

          {showAddForm && (
            <div className="address-form-modal">
              <div className="address-form-container">
                <h3>{editingAddress ? 'Edit Address' : 'Add New Address'}</h3>
                <form onSubmit={handleSubmit} className="address-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number *</label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Address Line 1 *</label>
                    <input
                      type="text"
                      name="addressLine1"
                      value={formData.addressLine1}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Address Line 2</label>
                    <input
                      type="text"
                      name="addressLine2"
                      value={formData.addressLine2}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>ZIP Code *</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Country *</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Address Type</label>
                      <select
                        name="addressType"
                        value={formData.addressType}
                        onChange={handleInputChange}
                      >
                        <option value="HOME">Home</option>
                        <option value="WORK">Work</option>
                        <option value="OTHER">Other</option>
                      </select>
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
                      Set as default address
                    </label>
                  </div>

                  <div className="form-buttons">
                    <button type="button" onClick={resetForm} className="cancel-btn">
                      Cancel
                    </button>
                    <button type="submit" disabled={loading} className="save-btn">
                      {loading ? 'Saving...' : (editingAddress ? 'Update Address' : 'Add Address')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="addresses-list">
            {addresses.length === 0 ? (
              <p className="no-addresses">No addresses found. Add your first address!</p>
            ) : (
              addresses.map(address => (
                <div key={address.id} className={`address-item ${address.isDefault ? 'default-address' : ''}`}>
                  {address.isDefault && <div className="default-badge">Default</div>}
                  
                  <div className="address-info">
                    <p><strong>{address.fullName}</strong></p>
                    <p>{address.phoneNumber}</p>
                    <p>{address.addressLine1}</p>
                    {address.addressLine2 && <p>{address.addressLine2}</p>}
                    <p>{address.city}, {address.state} {address.zipCode}</p>
                    <p>{address.country}</p>
                    <span className="address-type-badge">{address.addressType}</span>
                  </div>

                  <div className="address-actions">
                    {!address.isDefault && (
                      <button 
                        onClick={() => handleSetDefault(address.id)}
                        className="set-default-btn"
                        disabled={loading}
                      >
                        Set as Default
                      </button>
                    )}
                    <button 
                      onClick={() => handleEdit(address)}
                      className="edit-btn"
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(address.id)}
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

export default AddressesPage;