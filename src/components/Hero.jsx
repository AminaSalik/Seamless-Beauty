import React, { useEffect } from 'react'
import "../assets/style/Hero.css";
import Benefits_ from "./Benefits"
import Services from './Services'
import ProblemSolut from './ProblemSolut'
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

     <ProblemSolut/>

    

      <Benefits_ />
      <Booking />
      <Footer />
    </>
  )
}