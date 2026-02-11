import React, { useState, useEffect } from 'react';
import "../../assets/style/About.css"
import Nav from "../Nav"
import ScrollToTopBtn from "./ScrollToTopBtn"
import Footer from "../Footer"
import Service from "../Services"
import Booking from "../../assets/img/Booking.png";

export default function Services() {
 
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
            Elevated Services for <span className="pink-accent">Your Unique</span> Glow
            
            </h2>
            <p className="hero-description">
          Experience a collection of premium beauty treatments designed to enhance your natural beauty. 
    From professional makeup to luxury skincare, we ensure every detail is as effortless as it is elegant.
            </p>
           
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

      <div className="animate-on-scroll">
        <Service />
      </div>

      {/* BACK TO TOP ARROW */}
       <ScrollToTopBtn/>

      <Footer />
    </>
  );
}