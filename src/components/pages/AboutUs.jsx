import React, { useState, useEffect } from 'react';
import "../../assets/style/About.css";
import Nav from "../Nav";
import Footer from "../Footer"
import ScrollToTopBtn from "./ScrollToTopBtn"


const StatCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <>{count}{suffix}</>;
};

const imgs = {
  gallery: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1000&auto=format&fit=crop",
  skin: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600&auto=format&fit=crop", // Facial Glow
  hair: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1000&auto=format&fit=crop",
  makeup: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1000&auto=format&fit=crop",
  stress: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=1000&auto=format&fit=crop",
  glow: "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
}
const salonImg = "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=1000";

const scrollToBooking = () => {
  const bookingSection = document.getElementById('booking-section');
  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function About() {


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
              The Art of <span className="pink-accent">Seamless</span> Beauty

            </h2>
            <p className="hero-description">
              GlowApp is a simple and elegant appointment booking platform designed to turn visitors into real clients.
              We believe that your journey to beauty should be as effortless as the result itself.
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

      <section className="about-v2">
        <div className="liquid-blur"></div>

        <div className="about-v2-container">
          <div className="about-v2-header">
            <div className="tagline-pill">Est. 2024 — Future of Beauty</div>
            <h2 className="display-text">
              Redefining <span className="gradient-text">Elegance</span> <br />
              Through Digital <span className="text-stroke">Innovation</span>
            </h2>
          </div>
          <div className="bento-grid">

            <div className="bento-card vision fade-up-custom">
              <div className="card-content">
                <h3>Our Vision</h3>
                <p>We combine AI-driven scheduling with human artistic touch to ensure your style is always ahead of the curve.</p>
                <div className="stat-number">
                  <StatCounter end={100} suffix="%" />
                  <span>Precision</span>
                </div>
              </div>
            </div>

            <div className="bento-card-group">
              <div className="bento-card small fade-up-custom delay-1">
                <div className="stat-icon">✦</div>
                <div className="stat-info">
                  <h4><StatCounter end={15} suffix="K+" /></h4>
                  <p>Clients</p>
                </div>
              </div>

              <div className="bento-card small fade-up-custom delay-2">
                <div className="stat-icon">◈</div>
                <div className="stat-info">
                  <h4><StatCounter end={50} suffix="+" /></h4>
                  <p>Artists</p>
                </div>
              </div>
            </div>
            <div className="bento-card experience fade-up-custom delay-2">
              <div className="card-overlay-text">GLOW</div>
              <div className="exp-content">
                <span className="exp-label">Experience</span>
                <div className="exp-value"><StatCounter end={12} suffix="+" /></div>
                <p>Years of industry mastery</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <ScrollToTopBtn />

      <Footer />
    </>
  );
}