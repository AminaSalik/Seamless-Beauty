import React, { useEffect } from 'react';
import "../assets/style/ProblemSolution.css"

export default function ProblemSolut() {
  
 

  const imgs = {
   stress: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=1000&auto=format&fit=crop",
    glow: "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    salon: "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=1000"
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
    <>
      <section className="feature-reveal-section">
        <div className="ps-container">
          
          <div className="section-title reveal">
            <h2 className="display-text-small text-white">Beauty Should Be <span className="gradient-text">Effortless</span></h2>
          </div>

          {/* Feature 1: The Problem/Solution Split */}
          <div className="feature-row reveal">
            <div className="feature-text">
              <span className="feature-tag">The Routine</span>
              <h3>No More Waiting Lists</h3>
              <p>Your time is as valuable as your beauty. Why spend it on hold?</p>
              
              <div className="glass-benefit">
                <div className="benefit-icon">✦</div>
                <div>
                  <h4>24/7 Digital Concierge</h4>
                  <p>Pick your favorite artist and time in just a few clicks.</p>
                </div>
              </div>
            </div>
            <div className="feature-image">
              <div className="image-glow-wrap">
                <img src={imgs.stress} alt="Stress-free" />
              </div>
            </div>
          </div>

          {/* Feature 2: Reverse Layout */}
          <div className="feature-row reverse reveal">
             <div className="feature-image">
              <div className="image-glow-wrap accent-glow">
                <img src={imgs.glow} alt="Resulting Glow" />
              </div>
            </div>
            <div className="feature-text">
              <span className="feature-tag">The Experience</span>
              <h3>Radiance Guaranteed</h3>
              <p>We provide a customized beauty journey tailored specifically to you.</p>
              
              <div className="glass-benefit">
                <div className="benefit-icon">◈</div>
                <div>
                  <h4>VIP Personalized Care</h4>
                  <p>Get custom care tips sent to your phone after every visit.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}