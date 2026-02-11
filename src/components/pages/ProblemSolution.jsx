import React, { useState, useEffect } from 'react';
import "../../assets/style/About.css"
import Nav from "../Nav"
import ScrollToTopBtn from "./ScrollToTopBtn"
import Footer from "../Footer"


export default function ProblemSolution() {

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
              Stop Chasing <span className="pink-accent">Appointments</span>,
              Start Enjoying the <span className="pink-accent">Glow</span>

            </h2>
            <p className="hero-description">
              Traditional booking is often a messy mix of missed calls and confusing messages.
              GlowApp removes the friction, providing a simple and elegant space where your
              transformation is the only priority.
            </p>
           
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

      <section className="py-20 bg-black">
        <div className="flex flex-col px-8 mx-auto space-y-12 max-w-7xl xl:px-12">
          <div className="relative text-center">
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl text-white">
              Beauty Should Be <span className="span__">Effortless</span>
            </h2>
          </div>

          {/* First Feature */}
          <div className="flex flex-col mb-8 animated fadeIn sm:flex-row items-center">
            <div className="flex items-center mb-8 sm:w-1/2 md:w-5/12 sm:order-last">
              <img className="rounded-lg shadow-xl img-floating border border-pink-500/20" src={imgs.stress} alt="Stress-free" />
            </div>
            <div className="flex flex-col justify-center sm:w-1/2 md:w-7/12 sm:pr-16 text-white">
              <div className="span__ font-bold mb-2 text-sm uppercase tracking-widest">The Routine</div>
              <h3 className="text-2xl md:text-4xl font-bold">No More Waiting Lists</h3>
              <p className="mt-5 text-lg text-gray-400">
                Your time is as valuable as your beauty. Book your transformation online anytime.
              </p>
              <div className="mt-6 p-4 bg-gray-900 border-l-4 border-pink-500 rounded-r">
                <p className="font-semibold span__">24/7 Digital Concierge</p>
                <p className="text-sm text-gray-300">Pick your favorite artist and time in just a few clicks.</p>
              </div>
            </div>
          </div>

          {/* Second Feature */}
          <div className="flex flex-col mb-8 animated fadeIn sm:flex-row items-center">
            <div className="flex items-center mb-8 sm:w-1/2 md:w-5/12">
              <img className="rounded-lg shadow-xl img-floating border border-pink-500/20" src={imgs.glow} alt="Resulting Glow" />
            </div>
            <div className="flex flex-col justify-center sm:w-1/2 md:w-7/12 sm:pl-16 text-white">
              <div className="text-pink-500 font-bold mb-2 text-sm uppercase tracking-widest">The Experience</div>
              <h3 className="text-2xl md:text-4xl font-bold">Radiance Guaranteed</h3>
              <p className="mt-5 text-lg text-gray-400">
                We provide a customized beauty journey tailored specifically to your skin and hair needs.
              </p>
              <div className="mt-6 p-4 bg-gray-900 border-l-4 border-pink-500 rounded-r">
                <p className="font-semibold text-pink-500">VIP Personalized Care</p>
                <p className="text-sm text-gray-300">Get custom care tips sent to your phone after every visit.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ScrollToTopBtn />

      <Footer />
    </>
  );
}