import React from "react";
import "./assets/styles/about.css";
import Nav from "./Nav";
import Footer from "./Footer";

export default function AboutUs() {
  return (
    <>
      <Nav />
      <div className="about-container">
        <h1 className="about-title">About Us</h1>
        <div className="about-content">
          <img
            src="https://static.tildacdn.com/tild3266-3734-4563-b139-393539623765/2.png"
            alt="About Us"
            className="about-image"
          />
          <div className="about-text">
            <h2>Welcome to Our Store</h2>
            <p>
              {" "}
              Welcome to our marketplace, where you can discover and publish a
              diverse range of high-quality products across categories like home
              essentials, sports gear, skincare, and electronics. Whether you're
              looking to upgrade your home, find the best workout equipment,
              enhance your beauty routine, or explore the latest tech, our
              platform is designed to meet all your needs.{" "}
            </p>{" "}
            <p>
              {" "}
              We are committed to offering products from trusted sellers who
              share our values of quality, sustainability, and ethical
              practices. Explore our marketplace and join a community dedicated
              to creating a more mindful and responsible shopping experience.{" "}
            </p>{" "}
            <h3>Our Mission</h3>{" "}
            <p>
              {" "}
              Our mission is to provide a platform where anyone can access
              affordable, high-quality products while supporting sustainable and
              ethical businesses. We aim to make shopping enjoyable and easy,
              whether you're buying or selling. Thank you for choosing us as
              your trusted marketplace.{" "}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
