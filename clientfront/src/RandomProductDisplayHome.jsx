import React, { useEffect, useState, useRef } from 'react';
import './assets/styles/productDisplay.css';
import { Link } from 'react-router-dom';

const RandomProductDisplayHome = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const carouselRef = useRef(null);
  const autoScrollRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products/category/home');
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter(product =>
        product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
      setNoResults(filtered.length === 0);

      if (filtered.length > 0) {
        carouselRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setFilteredProducts(products);
      setNoResults(false);
    }
  }, [searchQuery, products]);

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ top: 0, left: -250, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ top: 0, left: 250, behavior: 'smooth' });
  };

  useEffect(() => {
    autoScrollRef.current = setInterval(scrollRight, 5000);
    return () => clearInterval(autoScrollRef.current);
  }, []);

  return (
    <div className="product-carousel">
      {noResults ? <p>No results found.</p> : null}
      <div className="carousel-container" ref={carouselRef}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="carousel-item">
              <img src={`http://localhost:5000/${product.image}`} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.desc}</p>
              <p>${product.price}</p>
              <Link to={`/product/${product._id}`} state={{ product }} className="product-content linkdetails">
                <button className="add-to-cart-btn">View Details</button>
              </Link>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
      <div className="carousel-buttons">
        <button className="carousel-button" onClick={scrollLeft}>←</button>
        <button className="carousel-button" onClick={scrollRight}>→</button>
      </div>
    </div>
  );
};

export default RandomProductDisplayHome;
