import React, { useState,useRef, useEffect } from 'react';
import { Sparkles, Scissors, Wind, Heart } from 'lucide-react';
import "../assets/style/Services.css";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



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
    desc: "Luxury hair coloring that uses silk-infused dyes for multidimensional, healthy shine Silk-Lustre Color Artistry .",
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


  const services = [
    {
      title: "Makeup Artistry",
      desc: "Professional glam for any occasion.",
      fullDetails: "Full face application including premium lashes and long-wear setting. Tailored to your specific style.",
      icon: <Sparkles size={24} />,
      img: "https://images.pexels.com/photos/3018845/pexels-photo-3018845.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      title: "Hair Styling",
      desc: "Cut, color, and master styling.",
      fullDetails: "Expert hair care using professional products. From routine cuts to advanced color transformations.",
      icon: <Scissors size={24} />,
      img: "https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      title: "Facial Care",
      desc: "Rejuvenating skin treatments.",
      fullDetails: "Deep cleansing and hydration therapy to restore your natural glow and skin health.",
      icon: <Wind size={24} />,
      img: "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      title: "Nail Design",
      desc: "Luxury manicures and gel art.",
      fullDetails: "Precision nail shaping and custom art designs using high-quality, long-lasting gel polish.",
      icon: <Heart size={24} />,
      img: "https://images.pexels.com/photos/3997391/pexels-photo-3997391.jpeg?auto=compress&cs=tinysrgb&w=600",
    }
  ];

  return (
    <section className="services-v3 feature-reveal-section">
      <div className="services-v3-container">
        
        {/* Header with Navigation Buttons */}
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
                <p className='text-white'>{service.desc}</p>
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
                <span  className="pink-accent text-white">Premium Experience</span>
                <h2 className='text-white'>{selectedService.title}</h2>
                <div className="modal-price">{selectedService.price}</div>
                <p className='text-white'>{selectedService.longDesc}</p>
                <button className="book-now-btn">Secure Appointment</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}