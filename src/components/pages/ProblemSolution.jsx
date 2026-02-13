import React, { useEffect } from 'react';
import "../../assets/style/ProblemSolution.css";
import Nav from "../Nav";
import ScrollToTopBtn from "./ScrollToTopBtn";
import Footer from "../Footer";

export default function ProblemSolution() {
  const imgs = {
    stress: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=1000&auto=format&fit=crop",
    glow: "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    // This is your stationary background image
    heroBg: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087&auto=format&fit=crop" 
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('reveal-active');
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
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

    
        <section className="feature-reveal-section">
      <div className="ps-container">
        
        <div className="section-header reveal">
          <span className="modern-tag">Modern Standards</span>
          <h2 className="display-text-small">
            Beauty Should Be <span className="gradient-text">Effortless</span>
          </h2>
        </div>

        {/* Row 1 */}
        <div className="feature-row reveal">
          <div className="feature-content">
            <div className="step-indicator">01</div>
            <span className="feature-tag">The Routine</span>
            <h3 className="modern-h3">No More <br/>Waiting Lists</h3>
            <p className="modern-p">Your time is as valuable as your beauty. Why spend it on hold? Our system eliminates the friction between you and your glow.</p>
            
            <div className="luxury-glass-card">
              <div className="card-accent"></div>
              <div className="benefit-icon">✦</div>
              <div className="card-info">
                <h4>24/7 Digital Concierge</h4>
                <p>Pick your favorite artist and time in just a few clicks.</p>
              </div>
            </div>
          </div>

          <div className="feature-visual">
            <div className="image-frame">
              <img src={imgs.stress} alt="Stress-free" className="main-img" />
              <div className="floating-blur-ball"></div>
            </div>
          </div>
        </div>

        {/* Row 2 - Reverse */}
        <div className="feature-row reverse reveal">
          <div className="feature-content">
            <div className="step-indicator">02</div>
            <span className="feature-tag">The Experience</span>
            <h3 className="modern-h3">Radiance <br/>Guaranteed</h3>
            <p className="modern-p">We provide a customized beauty journey tailored specifically to you. Every detail is curated for your comfort.</p>
            
            <div className="luxury-glass-card">
              <div className="card-accent"></div>
              <div className="benefit-icon">◈</div>
              <div className="card-info">
                <h4>VIP Personalized Care</h4>
                <p>Get custom care tips sent to your phone after every visit.</p>
              </div>
            </div>
          </div>

          <div className="feature-visual">
            <div className="image-frame accent-frame">
              <img src={imgs.glow} alt="Resulting Glow" className="main-img" />
              <div className="floating-blur-ball secondary"></div>
            </div>
          </div>
        </div>

      </div>
    </section>

      <ScrollToTopBtn />
      <Footer />
    </div>
  );
}