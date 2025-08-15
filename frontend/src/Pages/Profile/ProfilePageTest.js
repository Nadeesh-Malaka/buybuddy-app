// src/Pages/Profile/ProfilePageTest.js
import React from 'react';
import { useUser } from '../../context/UserContext';

function ProfilePageTest() {
  const { user, isLoggedIn, loading } = useUser();

  if (loading) {
    return <div>Loading user data...</div>;
  }

  if (!isLoggedIn) {
    return <div>Not logged in. Please log in first.</div>;
  }

  return (
    <div>
      <h1>Profile Page Test</h1>
      <p>User: {user?.name || 'No name'}</p>
      <p>Email: {user?.email || 'No email'}</p>
      <p>Login Status: {isLoggedIn ? 'Logged in' : 'Not logged in'}</p>
    </div>
  );
}

export default ProfilePageTest;
