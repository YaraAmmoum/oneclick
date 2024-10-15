import PaymentInfo from "./PaymentInfo";
import ShippingAddress from "./ShippingMethod";
import OrderSummary from "./OrderSummary";
import SuccessPage from "./SuccessPage";
import { useCart } from "./cartContext"; 
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; 

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState("shipping");
  const [cartData, setCartData] = useState([]);
  const [shippingCost, setShippingCost] = useState(0);
  const { cart, resetCart } = useCart(); 
  const navigate = useNavigate();

  useEffect(() => {
    setCartData(cart);
    const token = localStorage.getItem("token");
    if (!token) {
      alert("To complete your checkout process, you must login");
      navigate("/home");
    }
  }, [cart, navigate]);

  const handleShippingSubmit = (shippingDetails) => {
    setShippingCost(shippingDetails.shippingCost);
    setCurrentStep("summary");
  };

  const handleSummarySubmit = () => {
    setCurrentStep("payment");
  };

  const handlePaymentSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      const orderResponse = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          products: cartData.map((product) => ({
            productId: product._id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
          })),
          shippingMethod: "Standard Shipping",
          totalAmount: cartData.reduce(
            (acc, product) => acc + product.price * product.quantity,
            0
          ),
        }),
      });

      if (orderResponse.ok) {
        setCurrentStep("success");
        resetCart(); 
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        const errorText = await orderResponse.text();
        console.error("Error creating order:", errorText);
        throw new Error(errorText);
      }
    } catch (error) {
      console.error("Error during payment:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="checkout-container">
      {currentStep === "shipping" && (
        <ShippingAddress onSubmitShipping={handleShippingSubmit} />
      )}
      {currentStep === "summary" && (
        <OrderSummary
          cartData={cartData}
          shippingCost={shippingCost}
          onSubmitSummary={handleSummarySubmit}
        />
      )}
      {currentStep === "payment" && (
        <PaymentInfo onSubmitPayment={handlePaymentSubmit} />
      )}
      {currentStep === "success" && <SuccessPage />}
    </div>
  );
}
