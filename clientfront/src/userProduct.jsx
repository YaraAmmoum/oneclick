//display user product in admin dashboard
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import "./assets/styles/userpage.css";  

const UserPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/product');
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="userpage-container">
      <h2 className="page-title">User Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <Link to={`/product/${product._id}`} state={{ product }} className="product-link">
              <img src={`http://localhost:5000/${product.image}`} alt={product.name} className="product-image" />
              <div className="product-details">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-price">${product.price}</p>
                <p className="product-desc">{product.desc}</p>
                <p className="product-category">Category: {product.category}</p>
                <p className="product-quantity">In Stock: {product.quantity}</p>
               <button className='AR'>Accept</button>
                <button className='AR'>Reject</button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
