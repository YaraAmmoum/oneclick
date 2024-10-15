import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import "./assets/styles/userpage.css";  

const Username = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/login');
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const formatPassword = (password) => {
    if (password.length <= 4) {
      return password;
    }
    const firstTwo = password.substring(0, 2);
    const lastTwo = password.substring(password.length - 2);
    const stars = '*'.repeat(5); 
    return `${firstTwo}${stars}${lastTwo}`; 
  };

  return (
    <div className="username-container">
      <h1 className="page-title">Users List</h1>
      <div className="user-list">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Password:</strong> {formatPassword(user.password)}</p> 
            <button className='AR'>Active</button>
            <button className='AR'>Deactive</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Username;
