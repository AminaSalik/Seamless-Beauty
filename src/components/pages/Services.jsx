import React, { useState, useEffect, useRef } from 'react';
import "../../assets/style/Services.css";
import Nav from "../Nav";
import Footer from "../Footer"
import ScrollToTopBtn from "./ScrollToTopBtn"


const salonImg = "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=1000";

const servicesData = [
  {
    id: 1,
    title: "Sculpted Hair Art",
    desc: "Precision cutting meets avant-garde styling. We treat every strand as a masterpiece of geometry and flow.",
    longDesc: "Our master stylists use a combination of dry-cutting and molecular hair treatments to ensure your style lasts for weeks, not days. Includes a deep-scalp massage and signature finish.",
    img: "https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "$95"
  },
  {
    id: 2,
    title: "Dermal Luminescence",
    desc: "High-tech skincare treatments designed to restore your natural glow through deep hydration.",
    longDesc: "Using non-invasive LED therapy and organic enzymes, we target the deeper layers of the dermis to pull out impurities and lock in moisture for a 2062-ready radiance.",
    img: "https://images.pexels.com/photos/3762466/pexels-photo-3762466.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "$140"
  },
  {
    id: 3,
    title: "Chroma Coloration",
    desc: "Luxury hair coloring that uses silk-infused dyes for multidimensional, healthy shine.",
    longDesc: "Our colorists specialize in balayage and corrective color. We use bond-builders in every step to ensure your hair stays stronger than when you arrived.",
    img: "https://images.pexels.com/photos/973401/pexels-photo-973401.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "$180"
  },
  {
    id: 4,
    title: "Atmospheric Makeup",
    desc: "Makeup artistry designed for 8K resolution and real-world perfection.",
    longDesc: "Whether it's for a high-profile event or a personal transformation, our artists use airbrush techniques and premium minerals for a weightless, flawless finish.",
    img: "https://images.pexels.com/photos/457701/pexels-photo-457701.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "$110"
  }
];

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const sliderRef = useRef(null);

  // Scroll Reveal Logic
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('reveal-active');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scroll = (direction) => {
    const { current } = sliderRef;
    if (direction === 'left') {
      current.scrollBy({ left: -400, behavior: 'smooth' });
    } else {
      current.scrollBy({ left: 400, behavior: 'smooth' });
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

   <section className="services-v3">
      <div className="services-v3-container">
        
        {/* Header with Navigation Buttons */}
        <div className="services-v3-header reveal">
          <div className="header-left">
            <span className="tagline-pill">Exclusive Catalog</span>
            <h2 className="display-text">Curated <span className="gradient-text">Beauty</span></h2>
          </div>
          <div className="slider-controls">
            <button onClick={() => scroll('left')} className="control-btn">←</button>
            <button onClick={() => scroll('right')} className="control-btn">→</button>
          </div>
        </div>

        {/* The Horizontal Slider */}
        <div className="services-slider" ref={sliderRef}>
          {servicesData.map((service, index) => (
            <div key={service.id} className={`service-slide-card reveal delay-${index + 1}`}>
              <div className="card-img-box">
                <img src={service.img} alt={service.title} />
                <div className="slide-price">{service.price}</div>
              </div>
              <div className="card-body">
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <button 
                  className="learn-more-btn" 
                  onClick={() => setSelectedService(service)}
                >
                  Explore Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODERN MODAL */}
      {selectedService && (
        <div className="service-modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="service-modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedService(null)}>&times;</button>
            <div className="modal-grid">
              <div className="modal-img-wrapper">
                <img src={selectedService.img} alt={selectedService.title} />
              </div>
              <div className="modal-text">
                <span className="pink-accent">Premium Experience</span>
                <h2>{selectedService.title}</h2>
                <div className="modal-price">{selectedService.price}</div>
                <p>{selectedService.longDesc}</p>
                <button className="book-now-btn">Secure Appointment</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>

 <ScrollToTopBtn />

      <Footer />
</>

 
  );
}