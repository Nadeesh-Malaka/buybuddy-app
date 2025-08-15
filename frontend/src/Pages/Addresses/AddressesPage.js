import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { addressService } from '../../services/addressPaymentService';
import Footer from '../../Components/Footer/Footer';
import './AddressesPage.css';

function AddressesPage() {
  const { user } = useContext(UserContext);
  const [addresses, setAddresses] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [loading, setLoading] = useState(false);
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
      const userAddresses = await addressService.getUserAddresses(user.id);
      setAddresses(userAddresses);
    } catch (error) {
      console.error('Error loading addresses:', error);
      alert(error.message || 'Error loading addresses');
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
      alert('Please log in to manage addresses');
      return;
    }

    try {
      setLoading(true);
      if (editingAddress) {
        await addressService.updateAddress(editingAddress.id, formData);
        alert('Address updated successfully!');
      } else {
        await addressService.addAddress(user.id, formData);
        alert('Address added successfully!');
      }
      
      resetForm();
      await loadAddresses(); // Wait for addresses to reload
    } catch (error) {
      console.error('Error saving address:', error);
      alert(error.message || 'Error saving address');
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
  };

  const handleSetDefault = async (addressId) => {
    try {
      setLoading(true);
      await addressService.setDefaultAddress(addressId);
      await loadAddresses(); // Wait for addresses to reload
      alert('Default address updated successfully!');
    } catch (error) {
      console.error('Error setting default address:', error);
      alert(error.message || 'Error setting default address');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        setLoading(true);
        await addressService.deleteAddress(addressId);
        await loadAddresses(); // Wait for addresses to reload
        alert('Address deleted successfully!');
      } catch (error) {
        console.error('Error deleting address:', error);
        alert(error.message || 'Error deleting address');
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
        <div className="profile-sidebar">
          <ul className="sidebar-menu">
            <li className="menu-item">
              <Link to="/profile">
                <i className="bi bi-person"></i> Profile
              </Link>
            </li>
            <li className="menu-item active">
              <Link to="/addresses">
                <i className="bi bi-geo-alt"></i> Addresses
              </Link>
            </li>
            <li className="menu-item">
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
        
        <div className="addresses-content">
          <div className="addresses-header">
            <h2>Saved Addresses</h2>
            <button 
              className="add-address-btn"
              onClick={() => setShowAddForm(true)}
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