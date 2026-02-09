import React, { useState, useEffect } from 'react';
import "../../assets/style/About.css"
import Nav from "../Nav"
import ScrollToTopBtn from "./ScrollToTopBtn"
import Footer from "../Footer"
import Problem from '../../assets/img/Problem.png'
import Solution from '../../assets/img/Solution.png'
import Booking from "../../assets/img/Booking.png";

export default function ProblemSolution() {

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
      {/* <section className="hero">
        <div className="hero-background">
          <div className="gradient-bg" />
          <div />
          <div className="floating-shapes">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={`shape shape-${i}`} />
            ))}
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="title-line">Problem Solve</span>
            </h1>
            <p className="hero-description">
              We solved the biggest headaches in appointment booking so you can focus on what you do best.
            </p>
          </div>

          <div className="hero-visual">
            <div className="hero-image-wrapper" id="centralOrb">
              <img src={Booking} alt="Hero Visual" className="hero-image" />
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-arrow" />
          <span>Scroll to explore</span>
        </div>
      </section> */}


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

      <section className="py-20 bg-black">
        <div className="flex flex-col px-8 mx-auto space-y-12 max-w-7xl xl:px-12">

          <div className="relative text-center">
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl text-white">
              Stop Wasting Time on <span className="text-yellow-500">Manual Scheduling</span>
            </h2>
            <div className="gold-underline"></div>
          </div>

          {/* Problem Section 1 */}
          <div className="flex flex-col mb-8 animated fadeIn sm:flex-row items-center">
            <div className="flex items-center mb-8 sm:w-1/2 md:w-5/12 sm:order-last">
              <img className="rounded-lg shadow-xl img-floating border " src={Problem} alt="Smart Booking Interface" />
            </div>
            <div className="flex flex-col justify-center sm:w-1/2 md:w-7/12 sm:pr-16 text-white">
              <div className="text-red-500 font-bold mb-2 text-sm uppercase tracking-widest">The Problem</div>
              <h3 className="text-2xl md:text-4xl font-bold">Endless Back-and-Forth</h3>
              <p className="mt-5 text-lg text-gray-400">
                Spending hours on phone calls or texts just to find a time that works for everyone.
              </p>
              <div className="mt-6 p-4 bg-gray-900 border-l-4 border-yellow-500 rounded-r">
                <p className="font-semibold text-yellow-500">The Solution: Instant Self-Booking</p>
                <p className="text-sm text-gray-300">Clients view your real-time availability and book their own slot in under 30 seconds.</p>
              </div>
            </div>
          </div>

          {/* Problem Section 2 */}
          <div className="flex flex-col mb-8 animated fadeIn sm:flex-row items-center">
            <div className="flex items-center mb-8 sm:w-1/2 md:w-5/12">
              <img className="rounded-lg shadow-xl img-floating border" src={Solution} alt="WhatsApp Integration" />
            </div>
            <div className="flex flex-col justify-center sm:w-1/2 md:w-7/12 sm:pl-16 text-white">
              <div className="text-green-500 font-bold mb-2 text-sm uppercase tracking-widest">The Solution</div>
              <h3 className="text-2xl md:text-4xl font-bold">No-Shows & Cancellations</h3>
              <p className="mt-5 text-lg text-gray-400">
                Losing money and time because clients simply forget their appointments.
              </p>
              <div className="mt-6 p-4 bg-gray-900 border-l-4 border-green-500 rounded-r">
                <p className="font-semibold text-green-500">The Solution: WhatsApp Reminders</p>
                <p className="text-sm text-gray-300">Our system sends smart alerts to ensure your clients show up on time, every time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BACK TO TOP ARROW */}
      <ScrollToTopBtn/>

      <Footer />
    </>
  );
}