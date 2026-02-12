import React, { useEffect, useRef } from "react";
import { Clock, MessageCircle, CheckCircle } from 'lucide-react';
import "../assets/style/Benefits.css";

const cardsData = [
  {
    title: "Smart Agenda",
    text: "View live availability and secure your slot with a single click. No double bookings, ever.",
    tag: "Real-Time",
    icon: <Clock size={28} strokeWidth={1.5} />
  },
  {
    title: "Instant Chat",
    text: "Have a quick question? Message our specialists directly via WhatsApp for peace of mind.",
    tag: "Direct",
    icon: <MessageCircle size={28} strokeWidth={1.5} />
  },
  {
    title: "Auto-Confirm",
    text: "Get a unique digital ticket and automated reminders via SMS so you never miss a date.",
    tag: "Automated",
    icon: <CheckCircle size={28} strokeWidth={1.5} />
  },
];

export default function Benefits() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 } // Starts animation when 10% of the section is visible
    );

    const cards = sectionRef.current.querySelectorAll(".minimal-benefit-card");
    const header = sectionRef.current.querySelector(".benefits-header");
    
    observer.observe(header);
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="benefits-section" ref={sectionRef}>
      <div className="benefits-container">
        
        <div className="benefits-header scroll-init">
          <span className="tagline-pill">Exclusive Advantages</span>
          <h2 className="minimal-title">Why Choose <span className="gradient-text">GlowApp</span></h2>
          <p className="minimal-subtitle">The modern way to manage your beauty routine</p>
        </div>

        <div className="benefits-grid">
          {cardsData.map((card, index) => (
            <div 
              className="minimal-benefit-card scroll-init" 
              key={index}
              style={{ transitionDelay: `${index * 150}ms` }} // Staggered entry
            >
              <div className="benefit-card-inner">
                <div className="benefit-icon-wrapper">
                  {card.icon}
                </div>
                <div className="benefit-content">
                  <span className="benefit-tag">{card.tag}</span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
                <div className="card-glow-effect"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}