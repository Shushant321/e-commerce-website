import React from "react";
import "./../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="#">About</a>
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Help</a>
      </div>
      <p className="footer-copy">
      © {new Date().getFullYear()} E-Commerce-Web. Made by Shushant
      </p>
    </footer>
  );
};

export default Footer;
