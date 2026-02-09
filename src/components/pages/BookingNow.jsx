import React, { useState, useEffect } from 'react';
import "../../assets/style/About.css"
import Nav from "../Nav"
import BookingApp from "../BookingApp"
import Footer from "../Footer"
import Booking from "../../assets/img/Booking.png";
import ScrollToTopBtn from "./ScrollToTopBtn"

export default function BookingNow() {
 
const salonImg = "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=1000";

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking-section');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <>
      <Nav />

        <section className="hero">
        <div className="hero-background">
          <div className="gradient-bg" />
          <div className="floating-shapes">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={`shape shape-${i}`} />
            ))}
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-text">
            <h2 className="hero-title">
          Reserve Your <span className="pink-accent">Perfect</span> Moment
            
            </h2>
            <p className="hero-description">
          Take the first step toward your transformation. Select your preferred service 
           and specialist below to secure your appointment instantly.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={scrollToBooking}>
                Booking Now
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-wrapper" id="centralOrb">
              {/* Updated the src here to use salonImg */}
              <img src={salonImg} alt="Luxury Salon Interior" className="hero-image" />
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-arrow" />
          <span>Scroll to explore</span>
        </div>
      </section>

      <BookingApp />

      <ScrollToTopBtn/>

      <Footer />
    </>
  );
}