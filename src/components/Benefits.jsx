import React, { useEffect } from "react";
import { Clock, MessageCircle, CheckCircle } from 'lucide-react';
import "../assets/style/Benefits.css";

const cardsData = [
  {
    title: "Smart Agenda",
    text: "View live availability and secure your slot with a single click. No double bookings, ever.",
    tag: "Real-Time",
    icon: <Clock size={24} />
  },
  {
    title: "Instant Chat",
    text: "Have a quick question? Message our specialists directly via WhatsApp for peace of mind.",
    tag: "Direct",
    icon: <MessageCircle size={24} />
  },
  {
    title: "Auto-Confirm",
    text: "Get a unique digital ticket and automated reminders via SMS so you never miss a date.",
    tag: "Automated",
    icon: <CheckCircle size={24} />
  },
];

export default function Benefits() {
  
  useEffect(() => {
    // Force AOS à recalculer les positions dès que ce composant est affiché
    if (window.AOS) {
      window.AOS.refresh();
    }
  }, []);

  return (
    <section className="benefits-section">
      <div className="benefits-container">
        
        {/* En-tête qui descend doucement */}
        <div className="benefits-header" data-aos="fade-down">
          <h2 className="minimal-title">Why Choose <span className="pink-accent">GlowApp</span></h2>
          <p className="minimal-subtitle">The modern way to manage your beauty routine</p>
        </div>

        <div className="benefits-grid">
          {cardsData.map((card, index) => (
            <div 
              className="minimal-benefit-card" 
              key={index}
              data-aos="fade-up" // Animation de montée
              data-aos-delay={index * 200} // Délai progressif (0ms, 200ms, 400ms)
              data-aos-anchor-placement="top-bottom"
            >
              <div className="benefit-icon-wrapper">
                {card.icon}
              </div>
              <div className="benefit-content">
                <span className="benefit-tag">{card.tag}</span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}