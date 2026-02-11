import React, { useState, useEffect } from 'react';
import '../assets/style/Booking.css';
import { db } from '../config/firebaseConfig';
import { collection, addDoc, serverTimestamp, onSnapshot, query } from "firebase/firestore";
import emailjs from '@emailjs/browser';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

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
    const [showScrollTop, setShowScrollTop] = useState(false);

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    useEffect(() => {
        const checkScroll = () => {
            setShowScrollTop(window.pageYOffset > 300);
        };
        window.addEventListener('scroll', checkScroll);
        
        // Refresh AOS when component loads
        if (window.AOS) {
            window.AOS.refresh();
        }

        return () => window.removeEventListener('scroll', checkScroll);
    }, []);

    // ... (Keep all your existing logic: handleSendCode, handleVerifyAndBook, etc.)
    useEffect(() => {
        const q = query(collection(db, "holidays"));
        const unsubscribe = onSnapshot(q, (snap) => {
            const holidayDates = snap.docs.map(doc => doc.id);
            setAdminHolidays(holidayDates);
        });
        return () => unsubscribe();
    }, []);

    const triggerToast = (text, isError = false) => {
        setToastMessage({ text, isError });
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
    };

    const validateForm = () => {
        let tempErrors = {};
        if (firstName.trim().length < 2) tempErrors.firstName = "First name is too short";
        if (lastName.trim().length < 2) tempErrors.lastName = "Last name is too short";
        if (!email.includes('@')) tempErrors.email = "Invalid email address";
        if (number.length < 10) tempErrors.number = "Invalid phone number";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const formatTimeDisplay = (time24h) => {
        if (!time24h) return "";
        const [hour, min] = time24h.split(':').map(Number);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        return `${hour % 12 || 12}:${min.toString().padStart(2, '0')} ${ampm}`;
    };

    const handleSendCode = async () => {
        if (!validateForm()) return;
        setIsSubmitting(true);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(otp);

        try {
            await emailjs.send('service_8x55t1g', 'template_ns3ljzk', {
                to_name: firstName,
                to_email: email.trim().toLowerCase(),
                otp_code: otp,
                from_name: "AMALYZE"
            }, 'aeA09BV8gXTdUDj0I');
            setStep(4);
            triggerToast("Verification code sent!", false);
        } catch (error) {
            triggerToast("Error sending code.", true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleVerifyAndBook = async () => {
        if (verificationCode !== generatedOtp) {
            triggerToast("Invalid code. Try again.", true);
            return;
        }
        setIsSubmitting(true);
        try {
            const bookingData = {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim().toLowerCase(),
                number: "+" + number,
                date: selectedDate,
                time: selectedTime,
                status: "verified",
                createdAt: serverTimestamp()
            };

            await addDoc(collection(db, "bookings"), bookingData);

            await emailjs.send('service_8x55t1g', 'template_gkzhgn9', {
                admin_email: "aminasalik012@gmail.com",
                client_name: `${firstName} ${lastName}`,
                date: selectedDate,
                time: formatTimeDisplay(selectedTime),
                phone: "+" + number,
                client_email: email.trim()
            }, 'aeA09BV8gXTdUDj0I');

            triggerToast("Booking Verified! ✅", false);
            setTimeout(() => resetForm(), 3000);
        } catch (error) {
            triggerToast("Database error.", true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setStep(1); setSelectedDate(null); setSelectedTime(null);
        setFirstName(''); setLastName(''); setNumber(''); setEmail('');
        setVerificationCode(''); setGeneratedOtp('');
    };

    const scrollToTop = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const navigateMonth = (delta) => {
        let newMonth = currentMonth + delta;
        let newYear = currentYear;
        if (newMonth < 0) { newMonth = 11; newYear--; }
        if (newMonth > 11) { newMonth = 0; newYear++; }
        setCurrentMonth(newMonth); setCurrentYear(newYear);
    };

    const formatDateString = (year, month, day) => `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    const generateCalendarDays = () => {
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
        const calendarDays = [];
        for (let i = firstDay; i > 0; i--) calendarDays.push({ day: daysInPrevMonth - i + 1, status: 'booking-other-month', date: null });
        for (let d = 1; d <= daysInMonth; d++) {
            const dateStr = formatDateString(currentYear, currentMonth, d);
            const dateObj = new Date(currentYear, currentMonth, d);
            dateObj.setHours(0, 0, 0, 0);
            let status = (dateObj < today || adminHolidays.includes(dateStr)) ? 'booking-unavailable' : 'booking-available';
            calendarDays.push({ day: d, status, date: dateStr });
        }
        return calendarDays;
    };

    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 9; hour <= 17; hour++) {
            for (let min = 0; min < 60; min += 30) {
                if (hour === 17 && min > 0) continue;
                slots.push({ time: `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`, status: 'booking-available' });
            }
        }
        return slots;
    };

    return (
        <div className="booking-page-wrapper" id="booking-section">
            {/* Slide in from the left */}
            <div className="booking-side-image" data-aos="fade-right">
                <div className="image-content-overlay">
                    <h1>Experience Excellence</h1>
                    <p>Secure your premium slot in just a few clicks.</p>
                </div>
            </div>

            <div className="booking-main-content">
                {/* Slide in from the right */}
                <div className="booking-container glass-card" data-aos="fade-left" data-aos-delay="200">
                    <header className="booking-header">
                        <h2 className="text-white">Appointment Booking</h2>
                        <div style={{ margin: '10px 0', textAlign: 'center' }}>
                            <p style={{ color: '#fff', fontSize: '14px', opacity: 0.9 }}>
                                {selectedDate ? `${selectedDate} ${selectedTime ? `at ${formatTimeDisplay(selectedTime)}` : ''}` : 'Select a date and time'}
                            </p>
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '20px 0', padding: '0 10px' }}>
                            {[{ id: 1, label: "Date" }, { id: 2, label: "Time" }, { id: 3, label: "Info" }, { id: 4, label: "Verify" }].map((s, idx, arr) => (
                                <React.Fragment key={s.id}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                                        <div style={{
                                            width: '30px', height: '30px', borderRadius: '50%',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            backgroundColor: step >= s.id ? '#fff' : 'rgba(255,255,255,0.1)',
                                            color: step >= s.id ? '#000' : '#fff',
                                            border: '2px solid #fff'
                                        }}>{step > s.id ? '✓' : s.id}</div>
                                        <span style={{ fontSize: '10px', color: '#fff', marginTop: '5px' }}>{s.label}</span>
                                    </div>
                                    {idx < arr.length - 1 && <div style={{ height: '2px', flex: 1, backgroundColor: step > s.id ? '#fff' : 'rgba(255,255,255,0.2)', marginBottom: '15px' }}></div>}
                                </React.Fragment>
                            ))}
                        </div>
                    </header>

                    {/* Content Steps */}
                    {step === 1 && (
                        <div className="booking-card-inner" data-aos="fade-in">
                            <div className="booking-calendar-header">
                                <button onClick={() => navigateMonth(-1)}>&lt;</button>
                                <h3 className="text-white">{monthNames[currentMonth]} {currentYear}</h3>
                                <button onClick={() => navigateMonth(1)}>&gt;</button>
                            </div>
                            <div className="booking-weekdays">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
                            </div>
                            <div className="booking-days">
                                {generateCalendarDays().map((d, idx) => (
                                    <div key={idx}
                                        className={`booking-day ${d.status} ${selectedDate === d.date ? 'booking-selected' : ''}`}
                                        onClick={() => { if (d.status === 'booking-available') { setSelectedDate(d.date); setStep(2); } }}>
                                        {d.day}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="booking-card-inner" data-aos="fade-in">
                            <div className="booking-inner-header">
                                <h3 className="text-white">Select Time</h3>
                                <button className="back-link" onClick={() => setStep(1)}>Change Date</button>
                            </div>
                            <div className="booking-time-slots-grid">
                                {generateTimeSlots().map(slot => (
                                    <div key={slot.time} className={`booking-time-slot ${slot.status}`} onClick={() => { setSelectedTime(slot.time); setStep(3); }}>
                                        {formatTimeDisplay(slot.time)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="booking-card-inner" data-aos="fade-in">
                            <div className="booking-inner-header">
                                <h3 className="text-white">Your Details</h3>
                                <button className="back-link" onClick={() => setStep(2)}>Back</button>
                            </div>
                            <div className="booking-form-group"><input type="text" className={errors.firstName ? 'error-border' : ''} value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" /></div>
                            <div className="booking-form-group"><input type="text" className={errors.lastName ? 'error-border' : ''} value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" /></div>
                            <div className="booking-form-group"><input type="email" className={errors.email ? 'error-border' : ''} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" /></div>
                            <div className="booking-form-group">
                                <PhoneInput country={'ma'} value={number} onChange={phone => setNumber(phone)} containerClass="phone-container" inputClass="phone-input-field" />
                            </div>
                            <button className="booking-confirm-btn" onClick={handleSendCode} disabled={!firstName || !lastName || !number || !email || isSubmitting}>
                                {isSubmitting ? "Sending Code..." : "Send Verification Code"}
                            </button>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="booking-card-inner" data-aos="fade-in">
                            <div className="booking-inner-header">
                                <h3 className="text-white">Enter OTP</h3>
                                <button className="back-link" onClick={() => setStep(3)}>Back</button>
                            </div>
                            <div className="booking-form-group">
                                <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} placeholder="000000" className="otp-input" style={{ textAlign: 'center', fontSize: '24px', letterSpacing: '8px' }} />
                            </div>
                            <button className="booking-confirm-btn" onClick={handleVerifyAndBook} disabled={verificationCode.length < 6 || isSubmitting}>
                                {isSubmitting ? "Verifying..." : "Confirm Booking Now"}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Back to Top Button */}
            <a
                href="#"
                onClick={scrollToTop}
                className={`scroll-top-btn ${showScrollTop ? 'visible' : ''}`}
            >
                <svg viewBox="0 0 448 512" width="20" height="20">
                    <path fill="currentColor" d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L256 165.4V464c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V165.4L53.2 289.1c-9.3 9.8-24.8 10-34.3.4z" />
                </svg>
            </a>

            {/* Toast */}
            <div className={`booking-toast-notification ${showToast ? 'booking-show' : ''}`} style={{ backgroundColor: toastMessage.isError ? '#e63946' : '#2a9d8f', color: '#fff', padding: '12px 20px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: '25px', height: '25px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {toastMessage.isError ? '!' : '✓'}
                </div>
                <div style={{ fontWeight: '600' }}>{toastMessage.text}</div>
            </div>
        </div>
    );
}

export default BookingApp;