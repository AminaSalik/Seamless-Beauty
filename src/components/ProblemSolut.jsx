import React, { useEffect } from 'react';
import "../assets/style/ProblemSolution.css";

export default function ProblemSolut() {
  const imgs = {
    stress: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=1000&auto=format&fit=crop",
    glow: "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  };

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
  );
}