import { Link } from "react-router-dom";
import "./assets/styles/s.css";
import { useCart } from "./cartContext";
import { useState } from "react";
import StarRating from "./StarRating";
import Nav from "./Nav";
import Footer from "./Footer";
export default function ProductList({ products, title, categories }) {
  const [selectedName, setSelectedName] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const { addToCart } = useCart();

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round(totalRating / reviews.length);
  };

  const filteredProducts = products.filter((product) => {
    const averageRating = calculateAverageRating(product.reviews);
    return (
      (selectedName === "" || product.name === selectedName) &&
      (selectedPrice === "" || product.price <= parseInt(selectedPrice)) &&
      (selectedRating === "" || averageRating >= parseInt(selectedRating))
    );
  });

  const handleAddToCart = (product) => {
    const quantity = product.quantity;
    if (quantity <= product.quantity) {
      addToCart(product, quantity);
      alert(`${quantity} of ${product.name} added to cart!`);
    } else {
      alert("Not enough stock available.");
    }
  };


  return (<>    
    <Nav />

    <div className="app">
      <h1 className="h1">{title}</h1>
      <div className="content-container">
        <div className="filters">
          <h3>Filter by Price</h3>
          <select onChange={(e) => setSelectedPrice(e.target.value)}>
            <option className="option" value="">All prices</option>
            <option className="option" value="10">Up to 10 $</option>
            <option className="option" value="20">Up to 20 $</option>
            <option className="option" value="30">Up to 30 $</option>
            <option className="option" value="40">Up to 40 $</option>
          </select>

          <h3>Filter by Name</h3>
          <select onChange={(e) => setSelectedName(e.target.value)}>
            <option className="option" value="">All items</option>
            {categories.map((name) => (
              <option className="option" key={name} value={name}>{name}</option>
            ))}
          </select>

          <h3>Filter by Rating</h3>
          <select onChange={(e) => setSelectedRating(e.target.value)}>
            <option className="option" value="">All ratings</option>
            <option className="option" value="1">⭐</option>
            <option className="option" value="2">⭐⭐</option>
            <option className="option" value="3">⭐⭐⭐</option>
            <option className="option" value="4">⭐⭐⭐⭐</option>
            <option className="option" value="5">⭐⭐⭐⭐⭐</option>
          </select>
        </div>

        <div className="product-list">
          {filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <Link to={`/product/${product._id}`} state={{ product }} className="product-content linkdetails">
                <img src={`http://localhost:5000/${product.image}`} alt={product.name} className="product-image" />
                <h2 className="proHead">{product.name}</h2>
                <p className="proPara">Price: {product.price} $</p>
                <StarRating rating={calculateAverageRating(product.reviews)} />
              </Link>
              <div className="btnList">
                <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                <Link to={`/product/${product._id}`} state={{ product }} className="product-content linkdetails">
                  <button className="add-to-cart-btn">View Details</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer/></>
  );
}
