import React, { useState, useEffect } from 'react';
import { db, auth } from '../config/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import {
    collection, query, onSnapshot, orderBy,
    doc, updateDoc, deleteDoc, setDoc
} from "firebase/firestore";

const AdminDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [holidays, setHolidays] = useState([]);
    const [newHoliday, setNewHoliday] = useState('');
    const navigate = useNavigate();

    // دالة تسجيل الخروج
    const handleLogout = async () => {
        if (window.confirm("Are you sure you want to logout?")) {
            try {
                await signOut(auth);
                navigate('/admin');
            } catch (error) {
                console.error("Logout Error:", error);
            }
        }
    };

    useEffect(() => {
        const qBookings = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
        const unsubBookings = onSnapshot(qBookings, (snap) => {
            setBookings(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        const qHolidays = query(collection(db, "holidays"));
        const unsubHolidays = onSnapshot(qHolidays, (snap) => {
            setHolidays(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => { unsubBookings(); unsubHolidays(); };
    }, []);

    const updateStatus = async (id, newStatus) => {
        try {
            await updateDoc(doc(db, "bookings", id), { status: newStatus });
        } catch (error) { console.error("Error updating status: ", error); }
    };

    const addHoliday = async () => {
        if (!newHoliday) return;
        try {
            await setDoc(doc(db, "holidays", newHoliday), { date: newHoliday });
            setNewHoliday('');
        } catch (e) { console.error("Error adding holiday:", e); }
    };

    const deleteHoliday = async (id) => {
        try {
            await deleteDoc(doc(db, "holidays", id));
        } catch (e) { console.error("Error deleting holiday:", e); }
    };

    const handleWhatsAppConfirm = async (booking) => {
        try {
            await updateStatus(booking.id, "confirmed");
            const msg = `Hello ${booking.firstName}%0AYour booking is confirmed ✅%0A📅 Date: ${booking.date}%0A🕒 Time: ${booking.time}`;
            window.open(`https://wa.me/${booking.fullPhone || booking.number}?text=${msg}`, '_blank');
        } catch (error) { console.error("Error: ", error); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this booking?")) {
            try { await deleteDoc(doc(db, "bookings", id)); } 
            catch (error) { console.error("Error deleting: ", error); }
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 font-sans">
            <div className="max-w-6xl mx-auto">
                
                {/* Header Actions */}
                <div className="flex justify-between items-center mb-6">
                    <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-400 hover:text-yellow-500 transition-colors group">
                        <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span> Back to Site
                    </button>
                    
                    <button 
                        onClick={handleLogout}
                        className="bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white px-4 py-2 rounded-xl border border-red-500/30 transition-all font-bold text-sm"
                    >
                        Logout Exit 🚪
                    </button>
                </div>

                {/* Holiday Manager */}
                <div className="mb-10 bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-xl">
                    <h2 className="text-xl font-bold mb-4 text-yellow-500">Holiday Manager</h2>
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <input
                            type="date"
                            value={newHoliday}
                            onChange={(e) => setNewHoliday(e.target.value)}
                            className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white flex-1 focus:border-yellow-500 outline-none"
                        />
                        <button onClick={addHoliday} className="bg-yellow-600 hover:bg-yellow-500 px-8 py-2 rounded-lg font-bold transition-colors">
                            Add Holiday
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {holidays.map(h => (
                            <span key={h.id} className="bg-red-500/10 border border-red-500/30 px-3 py-1 rounded-full flex items-center gap-3 text-sm text-red-400">
                                {h.date}
                                <button onClick={() => deleteHoliday(h.id)} className="text-red-500 hover:text-white font-bold">&times;</button>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Stats Header */}
                <header className="flex justify-between items-center mb-10 bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-200 bg-clip-text text-transparent">Admin Dashboard</h1>
                        <p className="text-gray-400 text-sm">Real-time Bookings Manager</p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-mono text-yellow-500">{bookings.length}</div>
                        <div className="text-[10px] uppercase tracking-widest text-gray-500">Total Bookings</div>
                    </div>
                </header>

                {/* Bookings Table */}
                <div className="bg-gray-800 rounded-3xl overflow-hidden border border-gray-700 shadow-2xl overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-700/50 text-gray-400 text-xs uppercase">
                            <tr>
                                <th className="px-6 py-4">Client</th>
                                <th className="px-6 py-4">Appointment</th>
                                <th className="px-6 py-4">Phone</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {bookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-gray-750 transition-all">
                                    <td className="px-6 py-4 font-medium italic text-gray-200">{booking.firstName} {booking.lastName}</td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm">{booking.date}</div>
                                        <div className="text-xs text-yellow-500 font-bold">{booking.time}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-mono">{booking.fullPhone || booking.number}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                                            booking.status === 'confirmed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-500'
                                        }`}>
                                            {booking.status || 'Pending'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-2">
                                            <button onClick={() => handleWhatsAppConfirm(booking)} className="bg-green-600 hover:bg-green-500 p-2 rounded-lg">✅</button>
                                            <button onClick={() => updateStatus(booking.id, "completed")} className="bg-blue-600 hover:bg-blue-500 p-2 rounded-lg">✔</button>
                                            <button onClick={() => handleDelete(booking.id)} className="bg-red-600 hover:bg-red-500 p-2 rounded-lg">🗑</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;