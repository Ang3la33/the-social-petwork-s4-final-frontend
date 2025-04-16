import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import '../App.css';
import Logo from "../Assets/Images/greenLogo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Top Section */}
        <div className="footer-top">
          
          <div className="footer-links">
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
          </div>

          <img src={Logo} alt="Logo" className="footer-logo" />

          <div className="footer-links">
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms and Conditions</Link>
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
