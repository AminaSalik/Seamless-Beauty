import React, { useState, useEffect } from 'react';
import "../../assets/style/About.css"
import Nav from "../Nav"
import BookingApp from "../BookingApp"
import Footer from "../Footer"
import Booking from "../../assets/img/Booking.png";
import ScrollToTopBtn from "./ScrollToTopBtn"

export default function BookingNow() {
  
  // 1. Add the useEffect to trigger AOS on mount
  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
      });
      window.AOS.refresh();
    }
  }, []);

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

        {/* 2. Wrap content in a div with data-aos to trigger the animation */}
        <div className="hero-content" data-aos="fade-up">
          <div className="hero-text">
            <h2 className="hero-title">
              <span className="title-line">
                Reserve Your <span className="pink-accent">Perfect</span> Moment
              </span>
            </h2>
            <p className="hero-description">
              Take the first step toward your transformation. Select your preferred service 
              and specialist below to secure your appointment instantly.
            </p>
          
          </div>

          <div className="hero-visual">
            <div className="hero-image-wrapper" id="centralOrb">
              <img src={salonImg} alt="Luxury Salon Interior" className="hero-image" />
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-arrow" />
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* This is likely where your 'booking-section' ID is located */}
      <div id="booking-section">
        <BookingApp />
      </div>

      <ScrollToTopBtn/>
      <Footer />
    </>
  );
}