import React from 'react';
import './assets/styles/star.css';
import Nav from "./Nav";
import Footer from "./Footer";
const OrderSummary = ({ cartData, shippingCost, onSubmitSummary }) => {
    const subtotal = cartData.reduce((total, item) => total + item.price * item.quantity, 0);
     const total = subtotal + shippingCost;

    const handlePlaceOrder = () => {
        onSubmitSummary();
    };

    return (
        <><Nav/>
        <div className="order-summary-container">
            <h2 className="order-summary-title">Review Your Order</h2>
            <div className="order-items">
                {cartData.map((item, index) => (
                    <div key={index} className="order-item">
                        <span className="item-name">{item.name}</span>
                        <span className="item-price">${item.price.toFixed(2)}</span>
                        <span className="item-quantity">Quantity: {item.quantity}</span>
                    </div>
                ))}
            </div>
            <div className="order-details">
                <div className="order-detail">
                    <span className="detail-label">Subtotal:</span>
                    <span className="detail-value">${subtotal.toFixed(2)}</span>
                </div>
                <div className="order-detail">
                    <span className="detail-label">Shipping Cost:</span>
                    <span className="detail-value">${shippingCost.toFixed(2)}</span>
                </div>
                <div className="order-detail">
                    <strong className="detail-label">Total:</strong>
                    <strong className="detail-value">${total.toFixed(2)}</strong>
                </div>
            </div>
            <button onClick={handlePlaceOrder} className="summary-button">
                Proceed to Payment
            </button>
        </div>  <Footer/></>
    );
};
export default OrderSummary;
