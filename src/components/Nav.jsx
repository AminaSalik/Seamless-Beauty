import React, { useState } from "react";
import "../assets/style/Navbar.css";
import { Link } from 'react-router-dom';

export default function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-logo">GLOW<span className="span__">APP</span></div>

                <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
                    <Link to="/" className="nav-item text-white" onClick={() => setIsMenuOpen(false)}>
                        Home
                    </Link>

                    <Link to="/about" className="nav-item text-white" onClick={() => setIsMenuOpen(false)}>
                        About
                    </Link>

                    <Link to="/solutions" className="nav-item text-white" onClick={() => setIsMenuOpen(false)}>
                        Solutions
                    </Link>

                    <Link to="/services" className="nav-item text-white" onClick={() => setIsMenuOpen(false)}>
                        Services
                    </Link>

                    <Link to="/admin" className="admin-link" onClick={() => setIsMenuOpen(false)}>
                        Login
                    </Link>

                    {/* This Link will now take you to the BookingNow page and close the mobile menu */}
                    <Link 
                        to="/bookingNow" 
                        className="btn nav-btn btn-primary" 
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Booking Now
                    </Link>
                </div>

                <div className="mobile-menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <div className={`line ${isMenuOpen ? "open" : ""}`}></div>
                    <div className={`line ${isMenuOpen ? "open" : ""}`}></div>
                    <div className={`line ${isMenuOpen ? "open" : ""}`}></div>
                </div>
            </div>
        </nav>
    );
}