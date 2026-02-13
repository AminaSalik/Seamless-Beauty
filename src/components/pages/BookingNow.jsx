import React, { useState, useEffect } from 'react';
import "../../assets/style/About.css"
import Nav from "../Nav"
import BookingApp from "../BookingApp"
import Footer from "../Footer"
import Booking from "../../assets/img/Booking.png";
import ScrollToTopBtn from "./ScrollToTopBtn"

export default function BookingNow() {
  
 const imgs = {
    heroBg: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087&auto=format&fit=crop" 
  }
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

       <section 
        className="ps-hero" 
        style={{ backgroundImage: `url(${imgs.heroBg})` }}
      >
        <div className="ps-hero-overlay"></div>
        
        <div className="ps-hero-content reveal">
          <div className="tagline-pill">The Evolution of Booking</div>
          <h1 className="display-text">
            Stop Chasing <span className="text-stroke">Appointments</span>, <br />
            Start Enjoying the <span className="gradient-text">Glow</span>
          </h1>
          <p className="hero-sub">
            GlowApp removes the friction of traditional booking, providing a 
            space where your transformation is the only priority.
          </p>
        </div>
      </section>
      
      <div id="booking-section">
        <BookingApp />
      </div>

      <ScrollToTopBtn/>
      <Footer />
    </>
  );
}