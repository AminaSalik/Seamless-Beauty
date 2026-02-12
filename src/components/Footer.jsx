import React from 'react';
import { FaInstagram, FaFacebook, FaTwitter, FaArrowUp } from 'react-icons/fa';
import "../assets/style/Footer.css";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="modern-footer">
      <div className="footer-glow"></div>
      
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <h2 className="footer-logo">GLOW<span>APP</span></h2>
            <p className="footer-tagline">
              Redefining beauty through seamless digital experiences. 
              Your transformation starts here.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
            </div>
          </div>

          <div className="footer-links-grid">
            <div className="link-group">
              <h4>Navigation</h4>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/booking">Booking</a></li>
                <li><a href="/about">Our Story</a></li>
              </ul>
            </div>
            <div className="link-group">
              <h4>Support</h4>
              <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-newsletter">
            <h4>Join the Glow</h4>
            <p>Get beauty tips and exclusive offers.</p>
            <div className="subscribe-box">
              <input type="email" placeholder="Your email..." />
              <button type="button">Join</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} GlowApp Studio. All rights reserved.</p>
          <button className="back-to-top" onClick={scrollToTop}>
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}