import { Routes, Route, Navigate } from 'react-router-dom';
import Hero from "./components/Hero";
import Dashboard from "./components/AdminDashboard";
import AdminPanel from "./components/AdminLogin";
import About from "./components/pages/AboutUs";
import Services from "./components/pages/Services";
import BookingNow from "./components/pages/BookingNow";
import Solutions from "./components/pages/ProblemSolution";
import ProtectedRoute from "./components/ProtectedRoute"; // استيراد الحارس

import './App.css';

function App() {
  return (
    <Routes>
      {/* المسارات العامة */}
      <Route path="/" element={<Hero />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/bookingNow" element={<BookingNow />} />
      <Route path="/solutions" element={<Solutions />} />

      {/* صفحة الدخول للأدمن */}
      <Route path="/admin" element={<AdminPanel />} />

      {/* صفحة لوحة التحكم المحمية */}
      <Route 
        path="/admin-dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;