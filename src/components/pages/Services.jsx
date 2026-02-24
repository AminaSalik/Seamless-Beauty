import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
    longDesc: "Our master stylists use a combination of dry-cutting and molecular hair treatments to ensure your style lasts for weeks, not days.",
    img: "https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "$95",
    duration: "1 hr"
  },
  {
    id: 2,
    title: "Dermal Luminescence",
    desc: "High-tech skincare treatments designed to restore your natural glow through deep hydration.",
    longDesc: "Using non-invasive LED therapy and organic enzymes, we target the deeper layers of the dermis to pull out impurities.",
    img: "https://images.pexels.com/photos/3762466/pexels-photo-3762466.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "$140",
    duration: "45 min"
  },
  {
    id: 3,
    title: "Chroma Coloration",
    desc: "Luxury hair coloring that uses silk-infused dyes for multidimensional, healthy shine Silk-Lustre Color Artistry .",
    longDesc: "Our colorists specialize in balayage and corrective color. We use bond-builders in every step to ensure your hair stays stronger.",
    img: "https://images.pexels.com/photos/973401/pexels-photo-973401.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "$180",
    duration: "2 hr"
  },
  {
    id: 4,
    title: "Atmospheric Makeup",
    desc: "Makeup artistry designed for 8K resolution and real-world perfection.",
    longDesc: "Whether it's for a high-profile event or a personal transformation, our artists use airbrush techniques and premium minerals.",
    img: "https://images.pexels.com/photos/457701/pexels-photo-457701.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "$110",
    duration: "1 hr"
  }
];

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const sliderRef = useRef(null);
  const navigate = useNavigate();

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

  const handleBookingRedirect = (service) => {
    // Navigates to booking page and sends the service info
    navigate('/bookingNow', { 
      state: { 
        serviceTitle: service.title, 
        servicePrice: service.price 
      } 
    });
  };

  return (

    <>

    
    <section className="services-v3 feature-reveal-section">

         <Nav />
      <div className="services-v3-container">
        
        <div className="services-v3-header reveal">
          <div className="header-left">
            <span className="tagline-pill">Exclusive Catalog</span>
            <h2 className="display-text text-white">Curated <span className="gradient-text">Beauty</span></h2>
          </div>
          <div className="slider-controls">
            <button onClick={() => scroll('left')} className="control-btn">←</button>
            <button onClick={() => scroll('right')} className="control-btn">→</button>
          </div>
        </div>

        <div className="services-slider" ref={sliderRef}>
          {servicesData.map((service, index) => (
            <div 
              key={service.id} 
              className={`service-slide-card reveal delay-${index + 1}`}
              onClick={() => setSelectedService(service)} /* Clicks card to open modal */
              style={{cursor: 'pointer'}}
            >
              <div className="card-img-box">
                <img src={service.img} alt={service.title} />
                <div className="slide-price">{service.price}</div>
              </div>
              <div className="card-body">
                <h3>{service.title}</h3>
                <p className='text-white'>{service.desc}</p>
                {/* Modern 2026: No "Explore" button text, just a clean indicator */}
                <span className="pink-accent" style={{fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '1px'}}>VIEW DETAILS</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODERN 2026 SUMMARY MODAL */}
      {selectedService && (
        <div className="service-modal-overlay" onClick={() => setSelectedService(null)}>
          <div 
            className="service-modal" 
            style={{background: '#fff', maxWidth: '480px', borderRadius: '35px', padding: '40px'}} 
            onClick={e => e.stopPropagation()}
          >
            <button className="close-modal" style={{color: '#000'}} onClick={() => setSelectedService(null)}>&times;</button>
            
            <div style={{color: '#000', textAlign: 'left'}}>
              <h4 style={{fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '25px'}}>Appointment Summary</h4>
              
              <h2 style={{fontSize: '2rem', color: '#000', marginBottom: '10px', fontWeight: '800'}}>{selectedService.title}</h2>
              <p style={{fontSize: '1rem', color: '#444', marginBottom: '5px'}}>With Staff Member #1</p>
              <p style={{fontSize: '0.9rem', color: '#888'}}>{selectedService.duration} • Premium Service</p>
              
              <div style={{margin: '30px 0', borderTop: '1px solid #eee', borderBottom: '1px solid #eee', padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span style={{fontWeight: '600'}}>Total Amount</span>
                <span style={{fontSize: '1.8rem', fontWeight: '900', color: '#c86089'}}>{selectedService.price}</span>
              </div>

              <p style={{fontSize: '0.85rem', color: '#666', lineHeight: '1.5', marginBottom: '30px'}}>
                {selectedService.longDesc}
              </p>

              <button 
                className="book-now-btn" 
                style={{width: '100%', background: '#000', color: '#fff', borderRadius: '50px', padding: '20px', fontWeight: 'bold', border: 'none', cursor: 'pointer'}}
                onClick={() => handleBookingRedirect(selectedService)}
              >
                Schedule Appointment
              </button>
              
              <button 
                style={{width: '100%', background: 'transparent', color: '#000', border: 'none', marginTop: '15px', fontWeight: '600', cursor: 'pointer', opacity: 0.6}}
                onClick={() => setSelectedService(null)}
              >
                + Add another service
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
    
    </>


  );
}