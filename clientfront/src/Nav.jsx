import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./assets/styles/style.css";
import OneClick from "./assets/image/OneClick.png";
import { useCart } from "./cartContext";
import SearchBar from "./SearchBar";

const navItems = [
  { name: "Buy", path: "/buy" },
  { name: "Sell", path: "/sell" },
  { name: "About Us", path: "/about" },
  { name: "Cart", path: "/cart" },
];

export default function Nav({ onSearch }) {
  const [activeLink, setActiveLink] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { fetchCart } = useCart();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    if (token) {
      fetchCart();
    }
  }, [fetchCart]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    fetchCart();
  };

  return (
    <nav className="nav">
      <Logo activeLink={activeLink} setActiveLink={setActiveLink} />
      <div className="hamburgerMenu" onClick={toggleMenu}>
        &#9776;
      </div>
      <ul className={`ulNav ${isMenuOpen ? "active" : ""}`}>
        {navItems.map(({ name, path }) => (
          <li className="liNav" key={name} onClick={() => setActiveLink(name)}>
            <Link to={path}>{name}</Link>
          </li>
        ))}
        <li className="liNav 
        ">
          <SearchBar onSearch={onSearch} />
        </li>
        <li className="liNav">
          <span className="liNavUser">
            <Link to="/user">User Account</Link>
          </span>
          {isLoggedIn ? (
            <span className="liNavLog LL" onClick={handleSignOut}>
              Sign Out
            </span>
          ) : (
            <span className="liNavLog">
              <Link to="/login">Sign In</Link>
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}

export function Logo({ activeLink }) {
  return (
    <span className={`ProjectName ${activeLink === "Home" ? "active" : ""}`}>
      <Link to="/">
        <img className="logoImage" src={OneClick} alt="Logo" />
      </Link>
    </span>
  );
}
