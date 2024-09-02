import React, { useState, useEffect } from "react";
import "./styles/Hero.css"; // Ensure you have this CSS file for styling

const Hero = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => (prevPosition + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollDown = () => {
    window.scrollTo({
      top: window.scrollY + 300, // Scroll down by 300 pixels
      behavior: 'smooth', // Smooth scroll
    });
  };

  return (
    <div className="hero">
      <div className="hero-left">
        <h1>Chhammak Chhallo</h1>
        <h3>Your One Stop for All Ethnic Attire</h3>
        <p>Elevate your elegance with Chhammak Chhallo's stunning ethnic wear, where tradition meets timeless style.</p>
        <button type="button" className="hero-btn" onClick={scrollDown}>
          View Collections
        </button>
      </div>
      <div className="rotating-images-container">
        <img
          src="hero1.png"
          alt="Left"
          className={`image ${
            position === 0 ? "middle" : position === 1 ? "right" : "left"
          }`}
        />
        <img
          src="hero2.png"
          alt="Middle"
          className={`image ${
            position === 1 ? "middle" : position === 2 ? "right" : "left"
          }`}
        />
        <img
          src="hero3.png"
          alt="Right"
          className={`image ${
            position === 2 ? "middle" : position === 0 ? "right" : "left"
          }`}
        />
      </div>
    </div>
  );
};

export default Hero;
