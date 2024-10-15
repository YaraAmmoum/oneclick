import React, { useState } from "react";
import "./assets/styles/style.css";
import ecommerce7 from "./assets/image/skincare.jpg";
import ecommerce8 from "./assets/image/ele.jpg";
import ecommerce9 from "./assets/image/home.jpg";
import ecommerce10 from "./assets/image/sport.jpg";
import SkinCare from "./SkinProduct";
import HomeProduct from "./HomeProduct";
import SportProduct from "./Sport";
import Nav from "./Nav";
import Footer from "./Footer";
import EleProduct from "./ElectronicProduct";
import { Link } from "react-router-dom";
export default function BuyProductPage() {
  const [activeSection, setActiveSection] = useState("home");

  return (
    <div>
      {activeSection === "home" && (
        <CardResult setActiveSection={setActiveSection} />
      )}
      {activeSection === "ele" && <EleProduct />}
      {activeSection === "skincare" && <SkinCare />}
      {activeSection === "homeProducts" && <HomeProduct />}
      {activeSection === "sport" && <SportProduct />}
    </div>
  );
}

export function CardComponent({ image, head, btn, act }) {
  return (
    <div className="card">
      <img src={image} className="avatar" alt="Content" />
      <h3 className="categoryCard">{head}</h3>
      <center>
        <button className="categoryBtn" onClick={act}>
          {btn}
        </button>
      </center>
    </div>
  );
}

export function CardResult({ setActiveSection }) {
  return (
    <>
      <Nav />
      <div className="mainCards main">
        <Link to="/skincare" className="dd">
          <CardComponent
            image={ecommerce7}
            head="Skin Care"
            btn="Shop Now"
            act={() => setActiveSection("skincare")}
          />
        </Link>
        <Link to="/Eleproduct" className="dd">
          <CardComponent
            image={ecommerce8}
            head="Electronic"
            btn="Shop Now"
            act={() => setActiveSection("ele")}
          />
        </Link>

        <Link to="/homeproduct" className="dd">
          <CardComponent
            image={ecommerce9}
            head="Home"
            btn="Shop Now"
            act={() => setActiveSection("homeProducts")}
          />
        </Link>
        <Link to="/sportproduct" className="dd">
          <CardComponent
            image={ecommerce10}
            head="Sport"
            btn="Shop Now"
            act={() => setActiveSection("sport")}
          />
        </Link>
      </div>
      <Footer />
    </>
  );
}
