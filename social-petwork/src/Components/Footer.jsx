import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import '../App.css';
import Logo from "../Assets/Images/greenLogo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Top Section */}
        <div className="footer-top">
          
          <div className="footer-links">
            <a href="/">Home</a>
            <a href="/about">About Us</a>
            <a href="/contact">Contact Us</a>
          </div>

          <img src={Logo} alt="Logo" className="footer-logo" />

          <div className="footer-links">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms and Conditions</a>
          </div>
        </div>

        <hr className="footer-line" />

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-icons">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </div>
          <div className="footer-text">
            &copy; {new Date().getFullYear()} Copyright. All Rights Reserved
          </div>
          <div className="footer-text">
            Made with <span className="footer-heart">&#10084;&#65039;</span> For All You Pet Lovers
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
