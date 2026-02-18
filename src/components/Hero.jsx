import React, { useEffect } from 'react'
import "../assets/style/Hero.css";
import Benefits_ from "./Benefits"
import Services from './Services'
import ProblemSolut from './ProblemSolut'
import Intro from "./Intro"
import AboutUs from "./AboutUs"
import Footer from "./Footer"
import Booking from "./BookingApp"
import { OrbController } from "../utils/animations"
import ScrollToTopBtn from "./pages/ScrollToTopBtn"
export default function Hero() {
  useEffect(() => {
    new OrbController();
  }, []);


  return (
    <>
      <Intro />
      <AboutUs/>
      <Services />
     <ProblemSolut/>
      <Benefits_ />
      <Booking />
      <Footer />
      <ScrollToTopBtn />
    </>
  )
}