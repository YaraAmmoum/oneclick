import React from "react";
import "./assets/styles/SuccessPage.css";
import Nav from "./Nav";
import Footer from "./Footer";
const SuccessPage = () => {
  return (
    <>
      <Nav />
      <div className="success-container">
        <div className="success-card">
          <div className="icon-container">
            <i className="checkmark">✓</i>
          </div>
          <h1>Payment Successful</h1>
          <p>Thank you for your purchase!</p>
          <p>Redirecting to the homepage...</p>
        </div>
      </div>{" "}
      <Footer />{" "}
    </>
  );
};

export default SuccessPage;
