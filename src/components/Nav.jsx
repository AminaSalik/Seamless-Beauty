import React, { useState, useEffect } from "react";
import { NavLink, Link } from 'react-router-dom';

export default function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className={`nav-magic-wrapper ${scrolled ? "nav-island" : ""}`}>
            <div className="nav-container">
                
                <Link to="/" className="nav-logo" onClick={closeMenu}>
                    G L O W<span className="dot">.</span>
                </Link>

                <div className={`nav-menu-wrapper ${isMenuOpen ? "active" : ""}`}>
                    <ul className="nav-links">
                        <li><NavLink to="/" onClick={closeMenu}>Home</NavLink></li>
                              <li><NavLink to="/about" onClick={closeMenu}>Story</NavLink></li>
                        <li><NavLink to="/services" onClick={closeMenu}>Services</NavLink></li>
                        <li><NavLink to="/solutions" onClick={closeMenu}>Solutions</NavLink></li>
                  
                        <li><NavLink to="/admin" className="nav-login-link" onClick={closeMenu}>Login</NavLink></li>
                    </ul>

                    <Link to="/bookingNow" className="magic-btn" onClick={closeMenu}>
                        <span>Book Now</span>
                        <div className="btn-glow"></div>
                    </Link>
                </div>

                <button 
                    className={`magic-menu-toggle ${isMenuOpen ? "active" : ""}`} 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    <div className="icon-box">
                        <span className="l1"></span>
                        <span className="l2"></span>
                    </div>
                </button>
            </div>
        </nav>
    );
}