import React from "react";
import { useCart } from "./cartContext";
import { useNavigate } from "react-router-dom";
import "./assets/styles/style.css";
import Nav from "./Nav";
import Footer from "./Footer";
function ProductItem({ product, onIncrease, onDecrease, onRemove }) {
  return (
    <li className="productItemCart">
      <div className="productDetailsCart">
        <img
          src={`http://localhost:5000/${product.image}`}
          alt={product.name}
          className="cartImage"
        />
        <div className="CartHD">
          <h2 className="headGridCart">{product.name}</h2>
          <p className="descGridCart">{product.decs}</p>
        </div>
        <div className="CartPQ">
          <p className="priceGridCart">{product.price.toLocaleString()} $</p>
          <div className="quantityControlsCart">
            <button onClick={onDecrease} className="quantityBtnCart">
              {" "}
              -{" "}
            </button>
            <span className="quantityCart">{product.quantity}</span>
            <button onClick={onIncrease} className="quantityBtnCart">
              {" "}
              +{" "}
            </button>
            <button onClick={onRemove} className="removeBtnCart">
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function Cart() {
  const { increaseQuantity, decreaseQuantity, cart, removeFromCart } =
    useCart();

  const navigate = useNavigate();
  if (cart.length === 0) {
    return (
      <div className="cartEmpty">
        <p>Your cart is empty 😔</p>
        <a href="/buy">Continue shopping</a>
      </div>
    );
  }
  

  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      <Nav />{" "}
      <div className="productCart">
        <h1 className="headCart">Your cart 🛒</h1>
        <ul className="grid-viewCart">
          {cart.map((product) => (
            <ProductItem
              product={product}
              key={product._id}
              onIncrease={() => increaseQuantity(product._id)}
              onDecrease={() => decreaseQuantity(product._id)}
              onRemove={() => removeFromCart(product._id)}
            />
          ))}
        </ul>
        <div className="totalPriceCart">
          <span className="spanCart">
            Total Price: {totalPrice.toLocaleString()} $
          </span>
          <button onClick={handleCheckout} className="btnCart">
            Check Out
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
