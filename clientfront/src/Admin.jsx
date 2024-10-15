
import React, { useEffect, useState } from 'react';
// import "./assets/styles/admin.css";
import account from "./assets/image/profile.png";
import axios from 'axios';
import { Link } from "react-router-dom";
import Nav from './Nav';
import Footer from './Footer';

const Admin = () => {
  const [productCount, setProductCount] = useState();
  const [userCount, setUserCount] = useState();
  const [order, setOrderCount] = useState();
  const [admin, setAdminCount] = useState();

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/count');
        setProductCount(response.data.count);
      } catch (error) {
        console.error('Error fetching product count', error);
      }
    };
    fetchProductCount();
  }, []);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/login/logincount');
        setUserCount(response.data.count);
      } catch (error) {
        console.error('Error fetching user count', error);
      }
    };
    fetchUserCount();
  }, []);

  useEffect(() => {
    const fetchOrderCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/order/ordercount');
        setOrderCount(response.data.count);
      } catch (error) {
        console.error('Error fetching order count', error);
      }
    };
    fetchOrderCount();
  }, []);
  useEffect(() => {
    const fetchAdminCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/admincount');
        setAdminCount(response.data.count);
      } catch (error) {
        console.error('Error fetching order count', error);
      }
    };
    fetchAdminCount();
  }, []);

  return (
    <>
    <Nav/>
    <div className="admin-container">
      <nav className="sidebar">
        <div className="logo">Service</div>
        <ul className="nav-list">
          <li className="nav-item active">Dashboard</li>
          <li className="nav-item">Admin Management</li>
          <li className="nav-item">Product Approval</li>
          <li className="nav-item">Users Management</li>
          <li className="nav-item">Reports</li>
        </ul>
      </nav>
      <div className="main-content">
        <header className="header">
          <h2>Admin Dashboard <img className="userImage" src={account} alt="Profile" /></h2>
          <p>Hello Admin, Welcome to your dashboard </p>
        </header>
        <div className="stats-grid">
          <Link to ="/userproduct">
            <div className="stat-card">
              <h3>Products</h3>
              <p>{productCount}</p>
            </div>
            </Link>
            <Link to ="/useraccount">
          <div className="stat-card">
            <h3>Users</h3>
            <p>{userCount}</p>
          </div>
          </Link>
          <Link to ="/userorder">
          <div className="stat-card">
            <h3>Orders</h3>
            <p>{order}</p>
          </div>
          </Link>
          <Link to ="/userorder">
          <div className="stat-card">
            <h3>Admins</h3>
            <p>{admin}</p>
          </div>
          </Link>
        </div>
        <div className="report-section">
          <div className="chart-card">
            <h3>Daily Reports</h3>
          </div>
          <div className="chart-card">
            <h3>Sales Reports</h3>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Admin;
