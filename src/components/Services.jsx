import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Sparkles, Scissors, Wind, Heart, ChevronLeft, ChevronRight, X } from 'lucide-react';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../assets/style/Services.css';

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    // 1. Initialize or Refresh AOS when the component mounts
    if (window.AOS) {
      window.AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
      });
      window.AOS.refresh(); // Crucial for SPAs
    }

    // 2. Handle body scroll when modal is open
    document.body.style.overflow = selectedService ? 'hidden' : 'unset';
    
    // Cleanup function when leaving the page
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedService]);

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
    <section className="services-section">
      {/* Added a 'key' to force re-render if needed, and data-aos for animation */}
      <div 
        className="services-container" 
        data-aos="fade-up"
        key="services-content-wrapper" 
      >
        <div className="services-header">
          <h2 className="minimal-title">Our Services</h2>
          <p className="minimal-subtitle">Premium beauty care tailored for you</p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000 }}
          navigation={{ nextEl: '.custom-next', prevEl: '.custom-prev' }}
          breakpoints={{ 
            640: { slidesPerView: 2 }, 
            1024: { slidesPerView: 3 } 
          }}
          className="services-swiper"
        >
          {services.map((service, index) => (
            <SwiperSlide key={index}>
              <div className="minimal-card" onClick={() => setSelectedService(service)}>
                <div className="minimal-img-wrapper">
                  <img src={service.img} alt={service.title} />
                </div>
                <div className="minimal-info">
                  <div className="minimal-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                  <span className="learn-more-link">Learn More →</span>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="minimal-nav">
            <button className="custom-prev"><ChevronLeft size={20} /></button>
            <button className="custom-next"><ChevronRight size={20} /></button>
          </div>
        </Swiper>
      </div>

      {/* Modal Section */}
      {selectedService && (
        <div className="minimal-modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="minimal-modal" onClick={e => e.stopPropagation()} data-aos="zoom-in" data-aos-duration="300">
            <button className="modal-close" onClick={() => setSelectedService(null)}><X /></button>
            <img src={selectedService.img} alt={selectedService.title} className="modal-img" />
            <div className="modal-body">
              <h2>{selectedService.title}</h2>
              <p>{selectedService.fullDetails}</p>
              <button className="modal-btn" onClick={() => setSelectedService(null)}>Back to Services</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}