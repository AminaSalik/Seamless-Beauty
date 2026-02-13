import React, { useEffect, useState } from "react";
import "../assets/style/Navbar.css";
import Nav from "./Nav";


const imgs = {

  heroBg: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087&auto=format&fit=crop"
}



export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking-section');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>

      <div className="ps-page">

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

      </div>

    </>
  );
}