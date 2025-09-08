// src/Pages/Profile/ProfilePage.js
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import ProfileSidebar from '../../Components/ProfileSidebar/ProfileSidebar';
import { useUser } from '../../context/UserContext';
import userService from '../../services/userService';
import './ProfilePage.css';

function ProfilePage() {
  const { user, updateUser, isLoggedIn, loading } = useUser();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    number: user?.number || '',
    birthday: user?.birthday || '',
    gender: user?.gender || '',
    password: '',
  });

  // Update form data when user data is available
  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        number: user.number || '',
        birthday: user.birthday || '',
        gender: user.gender || '',
        password: '',
      });
    }
  }, [user]);

  // Handle authentication redirect
  React.useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate('/login');
    }
  }, [loading, isLoggedIn, navigate]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  // Redirect if not logged in (only after loading is complete)
  if (!loading && !isLoggedIn) {
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear messages when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSaveProfile = async () => {
    setProfileLoading(true);
    setError('');
    setSuccess('');

    try {
      const updatedUser = await userService.updateUser(user.id, {
        name: formData.name,
        email: formData.email,
        number: formData.number,
        birthday: formData.birthday,
        gender: formData.gender,
        password: formData.password || user.password, // Keep existing password if not changed
        profilePic: user.profilePic
      });

      updateUser(updatedUser);
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
      
      // Clear password field
      setFormData(prev => ({ ...prev, password: '' }));
      
    } catch (error) {
      setError(error.message || 'Failed to update profile');
    } finally {
      setProfileLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setError('');
    setSuccess('');
    // Reset form data
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      number: user?.number || '',
      birthday: user?.birthday || '',
      gender: user?.gender || '',
      password: '',
    });
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    setProfileLoading(true);
    setError('');
    setSuccess('');

    try {
      const updatedUser = await userService.uploadProfilePicture(user.id, file);
      updateUser(updatedUser);
      setSuccess('Profile picture updated successfully!');
    } catch (error) {
      setError(error.message || 'Failed to upload profile picture');
    } finally {
      setProfileLoading(false);
    }
  };

  const getProfilePicUrl = () => {
    if (!user?.profilePic) return 'http://localhost:8080/default-profile.svg';
    if (user.profilePic.startsWith('http')) return user.profilePic;
    return `http://localhost:8080${user.profilePic}`;
  };

  return (
    <div className="profile-page">
      <main className="profile-container">
        <ProfileSidebar />
        <div className="profile-content">
          {/* Success/Error Messages */}
          {success && (
            <div className="alert alert-success" style={{
              color: '#155724',
              backgroundColor: '#d4edda',
              border: '1px solid #c3e6cb',
              padding: '10px',
              borderRadius: '4px',
              marginBottom: '20px'
            }}>
              {success}
            </div>
          )}
          {error && (
            <div className="alert alert-danger" style={{
              color: '#721c24',
              backgroundColor: '#f8d7da',
              border: '1px solid #f5c6cb',
              padding: '10px',
              borderRadius: '4px',
              marginBottom: '20px'
            }}>
              {error}
            </div>
          )}

          <div className="profile-header">
            <div className="profile-pic-container" style={{ position: 'relative', display: 'inline-block' }}>
              <img 
                src={getProfilePicUrl()} 
                alt="Profile" 
                className="profile-pic"
                style={{ cursor: 'pointer' }}
                onClick={handleProfilePictureClick}
              />
              <div 
                className="profile-pic-overlay"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  opacity: 0,
                  transition: 'opacity 0.3s',
                  cursor: 'pointer',
                  color: 'white',
                  fontSize: '14px'
                }}
                onClick={handleProfilePictureClick}
                onMouseEnter={(e) => e.target.style.opacity = 1}
                onMouseLeave={(e) => e.target.style.opacity = 0}
              >
                Change Photo
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleProfilePictureChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
            </div>
            <div className="user-info">
              <h2>{user?.name || 'User'}</h2>
              <p>{user?.email}</p>
            </div>
          </div>

          <div className="profile-details">
            <div className="detail-item">
              <label>Full Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                readOnly={!isEditing}
                style={{
                  backgroundColor: isEditing ? 'white' : '#f8f9fa',
                  border: isEditing ? '1px solid #ced4da' : '1px solid #e9ecef',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  width: '100%'
                }}
              />
            </div>
            <div className="detail-item">
              <label>Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                readOnly={!isEditing}
                style={{
                  backgroundColor: isEditing ? 'white' : '#f8f9fa',
                  border: isEditing ? '1px solid #ced4da' : '1px solid #e9ecef',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  width: '100%'
                }}
              />
            </div>
            <div className="detail-item">
              <label>Phone Number</label>
              <input 
                type="text" 
                name="number"
                value={formData.number}
                onChange={handleInputChange}
                readOnly={!isEditing}
                style={{
                  backgroundColor: isEditing ? 'white' : '#f8f9fa',
                  border: isEditing ? '1px solid #ced4da' : '1px solid #e9ecef',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  width: '100%'
                }}
              />
            </div>
            <div className="detail-item">
              <label>Birthday</label>
              <input 
                type="date" 
                name="birthday"
                value={formData.birthday}
                onChange={handleInputChange}
                readOnly={!isEditing}
                style={{
                  backgroundColor: isEditing ? 'white' : '#f8f9fa',
                  border: isEditing ? '1px solid #ced4da' : '1px solid #e9ecef',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  width: '100%'
                }}
              />
            </div>
            <div className="detail-item">
              <label>Gender</label>
              <select 
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                disabled={!isEditing}
                style={{
                  backgroundColor: isEditing ? 'white' : '#f8f9fa',
                  border: isEditing ? '1px solid #ced4da' : '1px solid #e9ecef',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  width: '100%'
                }}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
            {isEditing && (
              <div className="detail-item">
                <label>New Password (leave blank to keep current)</label>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter new password or leave blank"
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #ced4da',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    width: '100%'
                  }}
                />
              </div>
            )}
          </div>

          <div className="profile-actions">
            {!isEditing ? (
              <button 
                className="edit-profile-btn"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            ) : (
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button 
                  className="btn btn-success"
                  onClick={handleSaveProfile}
                  disabled={profileLoading}
                  style={{
                    backgroundColor: '#198754',
                    border: '2px solid #198754',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    color: 'white',
                    cursor: profileLoading ? 'not-allowed' : 'pointer',
                    fontWeight: '600',
                    fontSize: '14px',
                    transition: 'all 0.3s ease',
                    opacity: profileLoading ? 0.7 : 1
                  }}
                >
                  {profileLoading ? 'Saving...' : 'Save Changes'}
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={handleCancelEdit}
                  disabled={profileLoading}
                  style={{
                    backgroundColor: '#6c757d',
                    border: '2px solid #6c757d',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    color: 'white',
                    cursor: profileLoading ? 'not-allowed' : 'pointer',
                    fontWeight: '600',
                    fontSize: '14px',
                    transition: 'all 0.3s ease',
                    opacity: profileLoading ? 0.7 : 1
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ProfilePage;