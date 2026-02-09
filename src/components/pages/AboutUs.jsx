import React, { useState, useEffect } from 'react';
import "../../assets/style/About.css";
import Nav from "../Nav";
import Footer from "../Footer"
import ScrollToTopBtn from "./ScrollToTopBtn"
import Booking from "../../assets/img/Booking.png";
import Doctor from '../../assets/img/Doctor.png';
import Lawyer from '../../assets/img/Lawyer.png';
import Teacher from '../../assets/img/Teacher.png';
import Project_Team from '../../assets/img/Project_Team.png';

const StatCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <>{count}{suffix}</>;
};

const imgs = {
  gallery: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1000&auto=format&fit=crop",
  skin: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600&auto=format&fit=crop", // Facial Glow
  hair: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1000&auto=format&fit=crop",
  makeup: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1000&auto=format&fit=crop",
  stress: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=1000&auto=format&fit=crop",
  glow: "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
}
const salonImg = "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=1000";

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking-section');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

export default function About() {


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
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={scrollToBooking}>
                Booking Now
              </button>
            </div>
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

      <header className="min-h-screen py-10 px-5 xl:py-0 xl:px-0 bg-black">
        <div className="min-h-screen xl:grid place-items-center place-content-center xl:grid-cols-2 xl:max-w-screen-xl mx-auto w-11/12 xl:max-w-screen-2xl gap-14">

          {/* Text Content Area */}
          <div className="max-w-xl mx-auto xl:max-w-2xl xl:-mt-8">
            <h1 className="text-3xl xl:text-5xl font-semibold xl:leading-snug text-white 2xl:text-6xl 2xl:leading-snug">
              Elevate Your <span className="span__">Beauty </span> Experience
            </h1>
            <p className="xl:leading-9 text-gray-300 xl:text-lg mt-3 mb-10">
              Indulge in luxury treatments designed to make you glow. Book your professional hair, skin, or makeup session in seconds.
            </p>

           

            {/* Stats Section */}
            <div className="flex items-center max-w-sm justify-between mt-16 mx-auto text-center lg:text-left lg:mx-0 text-white bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10">
              <div>
                <span className="text-3xl font-semibold span__">8K+</span>
                <p className="capitalize mt-2 text-sm text-gray-400">Happy Clients</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <span className="text-3xl font-semibold span__">4.9/5</span>
                <p className="capitalize mt-2 text-sm text-gray-400">Top Rated Salon</p>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="card__grid mt-14 xl:mt-0 sm:justify-items-center">

            {/* Salon Gallery Card */}
            <div className="card--1 glass-hero-card orb-canvas lg:row-start-1 lg:row-end-3 p-4 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-lg">
              <div className="w-full h-40 lg:h-48 xl:h-56 overflow-hidden rounded-2xl">
                <img className="w-full h-full object-cover img-floating" src={imgs.gallery} alt="Luxury Interior" />
              </div>
              <div>
                <h2 className="capitalize font-semibold text-lg mt-4 mb-2 text-white">Our Sanctuary</h2>
                <p className="text-gray-400 text-sm flex justify-between items-center">
                  Premium Quality <span className="flex items-center span__">★★★★★</span>
                </p>
              </div>
            </div>

            {/* Skin Care Card (Facial Glow) */}
            <div className="card--2 glass-hero-card orb-canvas lg:row-start-1 lg:row-end-2 flex items-center p-4 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-lg">
              <div className="w-16 h-16 shrink-0">
                <img src={imgs.skin} alt="Facial Glow" className="rounded-xl object-cover w-full h-full img-floating" />
              </div>
              <div className="ml-4">
                <h2 className="text-md text-white font-semibold capitalize">Facial Glow</h2>
                <p className="span__ text-xs">Deep Rejuvenation</p>
              </div>
            </div>

            {/* Hair Stylist Card */}
            <div className="card--3 glass-hero-card orb-canvas lg:row-start-2 lg:row-end-5 p-4 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-lg">
              <div className="w-full h-40 lg:h-48 xl:h-56 overflow-hidden rounded-2xl">
                <img className="w-full h-full object-cover img-floating" src={imgs.hair} alt="Hair Styling" />
              </div>
              <h2 className="capitalize font-semibold text-lg mt-4 text-white">Master Artistry</h2>
              <p className="span__ text-sm font-bold">New Trends Available</p>
            </div>

            {/* Makeup Artist Card (Makeup Artist) */}
            <div className="card--4 glass-hero-card orb-canvas lg:row-start-3 lg:row-end-4 flex items-center p-4 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-lg">
              <div className="w-16 h-16 shrink-0">
                <img src={imgs.makeup} alt="Makeup Artistry" className="rounded-xl object-cover w-full h-full img-floating" />
              </div>
              <div className="ml-4">
                <h2 className="text-md text-white font-semibold capitalize">Makeup</h2>
                <p className="text-gray-400 text-xs mt-1">Bridal & Glam Hour</p>
              </div>
            </div>

          </div>
        </div>
      </header>

      <ScrollToTopBtn />

      <Footer />
    </>
  );
}