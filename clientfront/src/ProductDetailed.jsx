import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./assets/styles/productDetailed.css";
import { useCart } from "./cartContext";
import StarRating from "./StarRating";
import Nav from "./Nav";
import Footer from "./Footer";

export default function ProductDetailed() {
  const { addToCart } = useCart();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products/${id}`);
        if (!response.ok) throw new Error("Error occurred while fetching product");
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products/${id}/reviews`);
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [id]);

  const handleAddToCart = () => {
    const parsedQuantity = parseInt(quantity, 10);
    if (parsedQuantity > product.quantity) {
      alert("No items left in stock!");
      return;
    }
    addToCart(product, parsedQuantity);
    const remainingQuantity = product.quantity - parsedQuantity;
    setProduct({ ...product, quantity: remainingQuantity });

    if (remainingQuantity <= 0) {
      alert("This product is out of stock!");
    } else if (remainingQuantity <= 2) {
      alert(`Hurry! Only ${remainingQuantity} items left in stock.`);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const reviewData = { rating, comment: review };
    try {
      const response = await fetch(`http://localhost:5000/products/${id}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });
      if (response.ok) {
        const updatedReviews = await response.json();
        setReviews(updatedReviews);
        setReview("");
        setRating(1);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <>
      <Nav />
      <div className="product-container">
        {product && (
          <div className="product-details-container">
            <img src={`http://localhost:5000/${product.image}`} alt={product.name} className="detailsImage" />
            <div className="product-details">
              <h1 className="product-title">{product.name}</h1>
              <p className="product-description">{product.desc}</p>
              <p className="product-price">Price: {product.price} $</p>
              <p className="product-category">Category: {product.category}</p>
              <p className="product-quantity">Available quantity: {product.quantity}</p>
              <div className="quantity-selector">
                <label>Quantity:</label>
                <input type="number" min="1" max={product.quantity} value={quantity} onChange={(e) => setQuantity(e.target.value)} />
              </div>
              <button className="add-to-cart-btn" onClick={handleAddToCart} disabled={parseInt(quantity, 10) > product.quantity || product.quantity === 0}>
                Add to cart
              </button>
            </div>
          </div>
        )}
        <div className="reviews-section">
          <h2 className="reviewHead">Reviews</h2>
          {reviews.map((rev, index) => (
            <div key={index} className="review">
              <p>
                <strong>Rating:</strong> <StarRating rating={rev.rating} />
              </p>
              <p>
                <strong>Comment:</strong> {rev.comment}
              </p>
            </div>
          ))}
          <div className="review-form">
            <h3>Leave a review</h3>
            <form onSubmit={handleReviewSubmit}>
              <label>Rating:</label>
              <select value={rating} onChange={(e) => setRating(e.target.value)}>
                {[1, 2, 3, 4, 5].map((val) => (
                  <option key={val} value={val}>{val}</option>
                ))}
              </select>
              <label>Comment:</label>
              <textarea value={review} onChange={(e) => setReview(e.target.value)} required />
              <button type="submit">Submit Review</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
