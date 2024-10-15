import { useState, useEffect } from "react";
import sc from "./assets/image/sc.jpg";
import ss from "./assets/image/ss.avif";
import hh from "./assets/image/hh.avif";
import "./assets/styles/style.css";

export default function SlideShow() {
  const images = [ss, sc, hh];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="slider">
      <img
        className="imageSlide"
        src={images[currentIndex]}
        alt="ecommerce"
      />
    </div>
  );
}
