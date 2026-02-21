import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
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

      <div className="ps-page ">

        <Nav />
        <section
          className="ps-hero"
          style={{ backgroundImage: `url(${imgs.heroBg})` }}
        >
          <div className="ps-hero-overlay"></div>

          <div className="ps-hero-content reveal">
            <div className="tagline-pill">Your Go-To Glow</div>
            <h1 className="display-text">
              Forget the <span className="text-stroke">Routine</span> <br />
             Embrace Your Signature <span className="gradient-text">Radiance</span>
            </h1>
            <p className="hero-sub">
            Step into a world where your style is our masterpiece. We combine 
    expert artistry with a tailored experience to ensure you leave 
    feeling like the best version of yourself
            </p>

            <Link to="/bookingNow" className="magic-btn-hero" >
                        <span>Book Now</span>
                        <div className="btn-glow"></div>
                    </Link>
          </div>
        </section>

      </div>

    </>
  );
}