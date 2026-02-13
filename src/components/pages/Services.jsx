import React, { useState, useEffect, useRef } from 'react';
import "../../assets/style/Services.css";
import Nav from "../Nav";
import Footer from "../Footer"
import ScrollToTopBtn from "./ScrollToTopBtn"


const imgs = {
  heroBg: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087&auto=format&fit=crop" 
}

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

    
     <div className="ps-page">

        <Nav />

      <section className="ps-hero">
        {/* The background is handled by CSS ::before for the stationary effect */}
        <div className="ps-hero-overlay"></div>

        <div className="ps-hero-content"> {/* Removed 'reveal' to make it visible immediately */}
          <div className="tagline-pill">Behind the Glow</div>
          <h1 className="display-text">
            Crafting the Future of <span className="text-stroke">Digital</span> <br />
            Beauty <span className="gradient-text">Experiences</span>
          </h1>
          <p className="hero-sub">
            GlowApp was born from a simple vision: to bridge the gap between world-class beauty
            and effortless technology. We don't just manage bookings; we curate the first step
            of your transformation journey.
          </p>
        </div>
      </section>


      <section className="services-v3 feature-reveal-section">
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
     </div>
    
    </>


  );
}