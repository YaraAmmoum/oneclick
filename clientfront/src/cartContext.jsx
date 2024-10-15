import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const resetCart = () => {
    setCart([]);
  };

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const { userId } = jwtDecode(token);
        const response = await axios.get(
          `http://localhost:5000/api/cart?userId=${userId}`
        );
        setCart(response.data);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCart();
  }, [token]);

  const addToCart = async (product, quantity = 1) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const { userId } = jwtDecode(token);
        await axios.post("http://localhost:5000/api/cart", {
          ...product,
          quantity,
          userId,
        });
      }
      setCart((prevCart) => {
        const itemExists = prevCart.find((item) => item._id === product._id);
        if (itemExists) {
          return prevCart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          return [...prevCart, { ...product, quantity }];
        }
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const increaseQuantity = async (productId) => {
    try {
      const product = cart.find((item) => item._id === productId);
      if (!product || product.quantity >= product.stock) return;

      const updatedQuantity = product.quantity + 1;

      await axios.put(`http://localhost:5000/api/cart/${productId}`, {
        quantity: updatedQuantity,
      });

      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === productId ? { ...item, quantity: updatedQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${productId}`);

      setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const decreaseQuantity = async (productId) => {
    try {
      const product = cart.find((item) => item._id === productId);
      if (!product || product.quantity <= 1) return;

      const updatedQuantity = product.quantity - 1;
      await axios.put(`http://localhost:5000/api/cart/${productId}`, {
        quantity: updatedQuantity,
      });

      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === productId ? { ...item, quantity: updatedQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        resetCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
