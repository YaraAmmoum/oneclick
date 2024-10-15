import React, { useState } from "react";
import SlideShow from "./SlideShow";
import "./assets/styles/style.css";
import "./assets/styles/productDisplay.css";
import RandomProductDisplaySport from "./RandomProductDisplaySport";
import RandomProductDisplayHome from "./RandomProductDisplayHome";
import Nav from "./Nav";
import Footer from "./Footer";
import RandomProductDisplayEle from "./RandomProductDisplayElectronic";
import RandomProductDisplaySkinCare from "./RandomProductDisplaySkinCare";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Nav onSearch={setSearchQuery} />
      <SlideShow />
      <section>
        <h2 className="carousel-title">Electronic Products</h2>
        <RandomProductDisplayEle searchQuery={searchQuery} />
      </section>
      <section>
        <h2 className="carousel-title">SkinCare Products</h2>
        <RandomProductDisplaySkinCare searchQuery={searchQuery} />
      </section>
      <section>
        <h2 className="carousel-title">Sport Products</h2>
        <RandomProductDisplaySport searchQuery={searchQuery} />
      </section>
      <section>
        <h2 className="carousel-title">Home Products</h2>
        <RandomProductDisplayHome searchQuery={searchQuery} />
      </section>
      <Footer />
    </>
  );
}
