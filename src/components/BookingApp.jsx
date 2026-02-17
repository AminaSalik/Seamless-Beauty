import React, { useState, useEffect } from 'react';
import '../assets/style/Booking.css';
import { db } from '../config/firebaseConfig';
import { collection, addDoc, serverTimestamp, onSnapshot, query } from "firebase/firestore";
import emailjs from '@emailjs/browser';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Nav from "./Nav";

function BookingApp() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [step, setStep] = useState(1);
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toastMessage, setToastMessage] = useState({ text: "", isError: false });
    const [errors, setErrors] = useState({});
    const [adminHolidays, setAdminHolidays] = useState([]);

    // Logic for Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                    }
                });
            },
            { threshold: 0.15 }
        );

        const section = document.querySelector('.feature-reveal-section');
        if (section) observer.observe(section);

        return () => {
            if (section) observer.unobserve(section);
        };
    }, []);

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    useEffect(() => {
        const q = query(collection(db, "holidays"));
        const unsubscribe = onSnapshot(q, (snap) => {
            setAdminHolidays(snap.docs.map(doc => doc.id));
        });
        return () => unsubscribe();
    }, []);

    const triggerToast = (text, isError = false) => {
        setToastMessage({ text, isError });
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
    };

    const formatTimeDisplay = (time24h) => {
        if (!time24h) return "";
        const [hour, min] = time24h.split(':').map(Number);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        return `${hour % 12 || 12}:${min.toString().padStart(2, '0')} ${ampm}`;
    };

    const handleSendCode = async () => {
        let tempErrors = {};
        if (!firstName) tempErrors.firstName = true;
        if (!lastName) tempErrors.lastName = true;
        if (!email.includes('@')) tempErrors.email = true;
        if (number.length < 10) tempErrors.number = true;
        
        if (Object.keys(tempErrors).length > 0) {
            setErrors(tempErrors);
            triggerToast("Please fill all fields correctly", true);
            return;
        }

        setIsSubmitting(true);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(otp);

        try {
            await emailjs.send('service_8x55t1g', 'template_ns3ljzk', {
                to_name: firstName, to_email: email.trim().toLowerCase(),
                otp_code: otp, from_name: "GLOW"
            }, 'aeA09BV8gXTdUDj0I');
            setStep(4);
            triggerToast("Verification code sent!", false);
        } catch (error) {
            triggerToast("Error sending code.", true);
        } finally { setIsSubmitting(false); }
    };

    const handleVerifyAndBook = async () => {
        if (verificationCode !== generatedOtp) {
            triggerToast("Invalid code", true);
            return;
        }
        setIsSubmitting(true);
        try {
            await addDoc(collection(db, "bookings"), {
                firstName, lastName, email, number: "+" + number,
                date: selectedDate, time: selectedTime,
                status: "verified", createdAt: serverTimestamp()
            });
            triggerToast("Booking Confirmed! ✅", false);
            setTimeout(() => window.location.reload(), 3000);
        } catch (error) { triggerToast("Database error.", true); } 
        finally { setIsSubmitting(false); }
    };

    const generateCalendarDays = () => {
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const days = [];
        for (let i = 0; i < firstDay; i++) days.push({ day: '', status: 'empty' });
        for (let d = 1; d <= daysInMonth; d++) {
            const dateStr = `${currentYear}-${(currentMonth+1).toString().padStart(2,'0')}-${d.toString().padStart(2,'0')}`;
            const dateObj = new Date(currentYear, currentMonth, d);
            days.push({ day: d, date: dateStr, status: (dateObj < today || adminHolidays.includes(dateStr)) ? 'unavailable' : 'available' });
        }
        return days;
    };

    return (
        <div className="booking-v2-wrapper feature-reveal-section">
            <Nav />
            <div className="booking-v2-hero">
                <div className="hero-split-content">
                    <span className="tagline-pill">Private Concierge</span>
                    <h1 className="display-text">Secure Your <span className="gradient-text">Radiance</span></h1>
                    
                    <div className="selection-preview">
                        <div className={`preview-item ${selectedDate ? 'active' : ''}`}>
                            <span className="label">Date</span>
                            <span className="val">{selectedDate || '---'}</span>
                        </div>
                        <div className={`preview-item ${selectedTime ? 'active' : ''}`}>
                            <span className="label">Time</span>
                            <span className="val">{selectedTime ? formatTimeDisplay(selectedTime) : '---'}</span>
                        </div>
                    </div>
                </div>

                <div className="booking-v2-card-area">
                    <div className="glass-concierge-card">
                        {step === 1 && (
                            <div className="step-fade">
                                <h3 className="step-title-standalone">Choose a Date</h3>
                                <div className="calendar-v2">
                                    <div className="cal-header">
                                        <button onClick={() => setCurrentMonth(prev => prev === 0 ? 11 : prev - 1)}>←</button>
                                        <h3>{monthNames[currentMonth]} {currentYear}</h3>
                                        <button onClick={() => setCurrentMonth(prev => prev === 11 ? 0 : prev + 1)}>→</button>
                                    </div>
                                    <div className="week-grid">
                                        {/* FIXED: Added index to key to prevent "S" and "T" duplicates */}
                                        {['S','M','T','W','T','F','S'].map((day, index) => (
                                            <div key={`${day}-${index}`}>{day}</div>
                                        ))}
                                    </div>
                                    <div className="days-grid">
                                        {generateCalendarDays().map((d, i) => (
                                            <div key={d.date || `empty-${i}`} className={`day-cell ${d.status} ${selectedDate === d.date ? 'selected' : ''}`}
                                                onClick={() => { if(d.status==='available'){ setSelectedDate(d.date); setStep(2); }}}>
                                                {d.day}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="step-fade">
                                <div className="step-header">
                                    <button className="icon-back-btn" onClick={() => setStep(1)}><span>←</span></button>
                                    <h3>Choose Time</h3>
                                </div>
                                <div className="time-grid-v2">
                                    {['09:00', '10:00', '11:00', '13:00', '14:30', '16:00', '17:00'].map(t => (
                                        <div key={t} className={`time-pill ${selectedTime === t ? 'selected' : ''}`}
                                            onClick={() => { setSelectedTime(t); setStep(3); }}>
                                            {formatTimeDisplay(t)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="step-fade">
                                <div className="step-header">
                                    <button className="icon-back-btn" onClick={() => setStep(2)}><span>←</span></button>
                                    <h3>Guest Details</h3>
                                </div>
                                <div className="form-v2">
                                    <div className="input-row">
                                        <input type="text" placeholder="First Name" className={errors.firstName ? 'err' : ''} value={firstName} onChange={e=>setFirstName(e.target.value)} />
                                        <input type="text" placeholder="Last Name" className={errors.lastName ? 'err' : ''} value={lastName} onChange={e=>setLastName(e.target.value)} />
                                    </div>
                                    <input type="email" placeholder="Email Address" className={errors.email ? 'err' : ''} value={email} onChange={e=>setEmail(e.target.value)} />
                                    <div className="modern-phone-wrap">
                                        <PhoneInput 
                                            country={'ma'} value={number} onChange={setNumber} 
                                            containerClass="phone-v2-container" inputClass="phone-v2-input"
                                            buttonClass="phone-v2-button" dropdownClass="phone-v2-dropdown"
                                        />
                                    </div>
                                    <button className="confirm-main-btn" onClick={handleSendCode}>
                                        {isSubmitting ? "Processing..." : "Continue"}
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="step-fade">
                                <div className="step-header">
                                    <button className="icon-back-btn" onClick={() => setStep(3)}><span>←</span></button>
                                    <h3>Verification</h3>
                                </div>
                                <input type="text" className="otp-modern" maxLength="6" placeholder="000000" onChange={e=>setVerificationCode(e.target.value)} />
                                <button className="confirm-main-btn" onClick={handleVerifyAndBook}>
                                    {isSubmitting ? "Verifying..." : "Confirm Booking"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {showToast && (
                <div className={`toast-modern ${toastMessage.isError ? 'err' : 'success'}`}>
                    <div className="toast-content">
                        <div className="toast-icon">{toastMessage.isError ? '✕' : '✓'}</div>
                        <span className="toast-text">{toastMessage.text}</span>
                    </div>
                    <div className="toast-progress"></div>
                </div>
            )}
        </div>
    );
}

export default BookingApp;