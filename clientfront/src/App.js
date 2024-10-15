import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import HomePage from "./HomePage";
import BuyProductPage from "./BuyProductPage";
import ProductForm from "./productForm";
import PrivateRoute from "./PrivateRoute";
import Cart from "./Cart";
import Checkout from "./Checkout";
import UserAccount from "./UserAccount";
import ProductDetailed from "./ProductDetailed";
import AboutUs from "./AboutUs";
import Admin from "./Admin";
import UserPage from "./userProduct";
import Username from "./username";
import OrdersPage from "./userorder";
import SkinCare from "./SkinProduct";
import HomeProduct from "./HomeProduct";
import EleProduct from "./ElectronicProduct";
import SportProduct from "./Sport";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/buy" element={<BuyProductPage />} />
          <Route path="/sell" element={<ProductForm />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<UserAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:id" element={<ProductDetailed />} />
          <Route path="/userproduct" element={<UserPage />} />
          <Route path="/useraccount" element={<Username />} />
          <Route path="/userorder" element={<OrdersPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/skincare" element={<SkinCare />} />
          <Route path="/homeproduct" element={<HomeProduct />} />
          <Route path="/Eleproduct" element={<EleProduct />} />
          <Route path="/sportproduct" element={<SportProduct />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
