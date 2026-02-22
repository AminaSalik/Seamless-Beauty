import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import '../assets/style/Booking.css';
import { db } from '../config/firebaseConfig';
import { collection, addDoc, serverTimestamp, onSnapshot, query, where } from "firebase/firestore";
import emailjs from '@emailjs/browser';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Nav from "./Nav";

function BookingApp() {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedService = location.state?.serviceTitle || "General Beauty Service";

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
    const [bookedSlots, setBookedSlots] = useState([]); 
    const [showExitModal, setShowExitModal] = useState(false);

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const timeOptions = ['09:00', '10:00', '11:00', '13:00', '14:30', '16:00', '17:00'];

    useEffect(() => {
        const qH = query(collection(db, "holidays"));
        const unsubH = onSnapshot(qH, (snap) => {
            setAdminHolidays(snap.docs.map(doc => doc.id));
        });

        const qB = query(collection(db, "bookings"), where("status", "==", "confirmed"));
        const unsubB = onSnapshot(qB, (snap) => {
            const confirmed = snap.docs.map(doc => ({
                date: doc.data().date,
                time: doc.data().time
            }));
            setBookedSlots(confirmed);
        });

        return () => { unsubH(); unsubB(); };
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

    const handleNextAvailability = () => {
        let scanDate = new Date(currentYear, currentMonth, today.getDate() + 1);
        let found = false;

        for (let i = 0; i < 180; i++) {
            const y = scanDate.getFullYear();
            const m = scanDate.getMonth();
            const d = scanDate.getDate();
            const dateStr = `${y}-${(m + 1).toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;

            const isHoliday = adminHolidays.includes(dateStr);
            const confirmedOnThisDay = bookedSlots.filter(slot => slot.date === dateStr).length;
            
            if (!isHoliday && confirmedOnThisDay < timeOptions.length) {
                setCurrentMonth(m);
                setCurrentYear(y);
                setSelectedDate(dateStr);
                triggerToast(`Jumping to: ${monthNames[m]} ${d}`);
                found = true;
                break;
            }
            scanDate.setDate(scanDate.getDate() + 1);
        }
        if (!found) triggerToast("No confirmed availability found.", true);
    };

    const isSlotTaken = (date, time) => {
        return bookedSlots.some(slot => slot.date === date && slot.time === time);
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
                otp_code: otp, from_name: "GLOW", 
                service_booked: selectedService 
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
                service: selectedService,
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
            
            const slotsForDay = timeOptions.filter(t => isSlotTaken(dateStr, t));
            const isFullyBooked = slotsForDay.length === timeOptions.length;

            let status = 'available';
            if (dateObj < today || adminHolidays.includes(dateStr)) {
                status = 'unavailable';
            } else if (isFullyBooked) {
                status = 'fully-booked';
            }
            days.push({ day: d, date: dateStr, status });
        }
        return days;
    };

    // Logic to decide if we show "Check Next Availability"
    const isDayFullyBooked = selectedDate && timeOptions.every(t => isSlotTaken(selectedDate, t));
    const isMonthEmpty = generateCalendarDays().filter(d => d.status === 'available').length === 0;

    return (
        <div className="booking-v2-wrapper feature-reveal-section">
            <Nav />
            <div className="booking-v2-hero">
                <div className="hero-split-content">
                    <div className="active-service-box" style={{ border: '1.5px solid #c86089', background: 'rgba(200, 96, 137, 0.05)', padding: '20px', borderRadius: '24px', marginBottom: '35px', maxWidth: '320px', position: 'relative' }}>
                        <span className="label" style={{color: '#888', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase'}}>Service</span>
                        <h2 style={{color: '#fff', fontSize: '1.5rem', margin: '8px 0'}}>{selectedService}</h2>
                        <button onClick={() => navigate('/services')} style={{background: 'none', border: 'none', color: '#c86089', cursor: 'pointer', fontSize: '0.8rem', position: 'absolute', right: '20px', top: '20px'}}>✎ Edit</button>
                    </div>

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
                    <div className="glass-concierge-card" style={{position: 'relative'}}>
                        <button className="close-modal" onClick={() => setShowExitModal(true)} style={{position: 'absolute', right: '30px', top: '25px', background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer'}}>×</button>

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
                                        {['S','M','T','W','T','F','S'].map((day, index) => (
                                            <div key={`${day}-${index}`}>{day}</div>
                                        ))}
                                    </div>
                                    <div className="days-grid">
                                        {generateCalendarDays().map((d, i) => (
                                            <div key={d.date || `empty-${i}`} 
                                                 className={`day-cell ${d.status} ${selectedDate === d.date ? 'selected' : ''}`}
                                                 onClick={() => { if(d.status==='available'){ setSelectedDate(d.date); setStep(2); }}}>
                                                {d.day}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* CONDITION: Show button only if Day is full OR Month is empty */}
                                {(isDayFullyBooked || isMonthEmpty) ? (
                                    <div className="availability-info" style={{marginTop: '30px', padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)'}}>
                                        <p style={{color: '#c86089', marginBottom: '15px'}}>No more confirmed slots here.</p>
                                        <button className="next-avail-btn" onClick={handleNextAvailability} style={{background: 'none', border: '1px solid #c86089', color: '#c86089', padding: '12px 25px', borderRadius: '50px', cursor: 'pointer', fontWeight: '600'}}>
                                            Check Next Availability
                                        </button>
                                    </div>
                                ) : (
                                    <div className="availability-info" style={{marginTop: '30px', padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center'}}>
                                         <p style={{color: '#666', fontSize: '0.8rem'}}>Available slots found</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {step === 2 && (
                            <div className="step-fade">
                                <div className="step-header">
                                    <button className="icon-back-btn" onClick={() => setStep(1)}><span>←</span></button>
                                    <h3>Choose Time</h3>
                                </div>
                                <div className="time-grid-v2">
                                    {timeOptions.map(t => {
                                        const taken = isSlotTaken(selectedDate, t);
                                        return (
                                            <div key={t} 
                                                className={`time-pill ${selectedTime === t ? 'selected' : ''} ${taken ? 'taken' : ''}`}
                                                onClick={() => { if(!taken) { setSelectedTime(t); setStep(3); } }}
                                                style={{
                                                    opacity: taken ? 0.3 : 1,
                                                    cursor: taken ? 'not-allowed' : 'pointer',
                                                    textDecoration: taken ? 'line-through' : 'none'
                                                }}>
                                                {formatTimeDisplay(t)}
                                            </div>
                                        );
                                    })}
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
                                        <PhoneInput country={'ma'} value={number} onChange={setNumber} containerClass="phone-v2-container" inputClass="phone-v2-input" buttonClass="phone-v2-button" dropdownClass="phone-v2-dropdown" />
                                    </div>
                                    <button className="confirm-main-btn" onClick={handleSendCode}> {isSubmitting ? "Processing..." : "Continue"} </button>
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
                                <button className="confirm-main-btn" onClick={handleVerifyAndBook}> {isSubmitting ? "Verifying..." : "Confirm Booking"} </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showExitModal && (
                <div className="exit-overlay" style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000}}>
                    <div className="exit-card" style={{background: '#fff', color: '#000', padding: '40px', borderRadius: '30px', textAlign: 'center', maxWidth: '400px'}}>
                        <h2 style={{fontSize: '1.8rem', marginBottom: '15px'}}>Are you sure?</h2>
                        <p style={{color: '#666', marginBottom: '30px'}}>Your progress will be lost.</p>
                        <div style={{display: 'flex', gap: '15px', justifyContent: 'center'}}>
                            <button onClick={() => setShowExitModal(false)} style={{padding: '12px 25px', borderRadius: '50px', border: '1px solid #ddd', background: 'none', cursor: 'pointer', fontWeight: 'bold'}}>No, Go Back</button>
                            <button onClick={() => navigate('/')} style={{padding: '12px 25px', borderRadius: '50px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold'}}>Yes, Close</button>
                        </div>
                    </div>
                </div>
            )}

            {showToast && (
                <div className={`toast-modern ${toastMessage.isError ? 'err' : 'success'}`}>
                    <div className="toast-content">
                        <div className="toast-icon">{toastMessage.isError ? '✕' : '✓'}</div>
                        <span className="toast-text">{toastMessage.text}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BookingApp;