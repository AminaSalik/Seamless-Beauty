import React, { useEffect } from 'react'
import "../assets/style/Hero.css";
import Benefits_ from "./Benefits"
import Services from './Services'
import Navbar from "./Navbar"
import Footer from "./Footer"
import Booking from "./BookingApp"
import { OrbController } from "../utils/animations"

export default function Hero() {
  useEffect(() => {
    new OrbController();
  }, []);

  // Updated Image URLs for the Salon
  const imgs = {
    gallery: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1000&auto=format&fit=crop",
    skin: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600&auto=format&fit=crop", // Facial Glow
    hair: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1000&auto=format&fit=crop",
    makeup: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1000&auto=format&fit=crop",
    stress: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=1000&auto=format&fit=crop",
    glow: "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }

  return (
    <>
      <Navbar />
      <Services />

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

            {/* <button className="btnSubscr text-white rounded-full py-4 px-8 tracking-wider text-sm font-bold hover:scale-105 transition-transform shadow-lg inline-block bg-pink-600">
              RESERVE YOUR GLOW
            </button> */}

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

      {/* Feature Section */}
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

      <Benefits_ />
      <Booking />
      <Footer />
    </>
  )
}