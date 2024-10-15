import React from "react";
import "./assets/styles/star.css";
const StarRating = ({ rating }) => {
  const stars = [];
  
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<span key={i} className="star">★</span>);
    } else {
      stars.push(<span key={i} className="star">☆</span>); 
    }
  }

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;


