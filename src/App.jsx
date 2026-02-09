import { Routes, Route, Navigate } from 'react-router-dom';
import Hero from "./components/Hero";
import Dashboard from "./components/AdminDashboard";
import AdminPanel from "./components/AdminLogin";
import About from "./components/pages/AboutUs";
import Services from "./components/pages/Services";
import BookingNow from "./components/pages/BookingNow";
import Solutions from "./components/pages/ProblemSolution";

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />

      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/bookingNow" element={<BookingNow />} />
      <Route path="/solutions" element={<Solutions />} />

      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/admin-dashboard" element={<Dashboard />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;