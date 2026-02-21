import React, { useState, useEffect } from 'react';
import { db } from '../config/firebaseConfig';
import { collection, onSnapshot, doc, deleteDoc, updateDoc, setDoc } from "firebase/firestore";
import { Users, Trash2, Clock, Search, CheckCircle, X, Calendar, CheckSquare } from 'lucide-react';
import "../assets/style/Admin.css";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [newHoliday, setNewHoliday] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "bookings"), (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
    }, (error) => console.error("Firestore Error:", error));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "holidays"), (snap) => {
      setHolidays(snap.docs.map(doc => doc.id));
    });
    return () => unsubscribe();
  }, []);


  const updateStatus = async (e, id, newStatus) => {
    if (e) e.preventDefault();

    try {
      const docRef = doc(db, "bookings", id);
      await updateDoc(docRef, {
        status: newStatus
      });
      console.log(`Status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Check console.");
    }
  };
  const deleteBooking = async (e, id) => {
    if (e) e.preventDefault();
    if (window.confirm("Are you sure?")) {
      await deleteDoc(doc(db, "bookings", id));
    }
  };
  const filteredBookings = bookings.filter(b => {
    const name = `${b.firstName || ''} ${b.lastName || ''}`.toLowerCase();
    const matchesSearch = name.includes(searchTerm.toLowerCase()) || (b.number && b.number.includes(searchTerm));

    const bStatus = (b.status || "verified").toLowerCase();
    const fStatus = filterStatus.toLowerCase();

    return matchesSearch && (filterStatus === "all" || bStatus === fStatus);
  });

  const groupedBookings = filteredBookings.reduce((acc, booking) => {
    const month = new Date(booking.date).toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!acc[month]) acc[month] = [];
    acc[month].push(booking);
    return acc;
  }, {});

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="admin-logo">GLOW<span>ADMIN</span></div>
        <nav>
          <div className={`nav-item ${filterStatus === 'all' ? 'active' : ''}`} onClick={() => setFilterStatus('all')}><Users size={20} /> All Clients</div>
          <div className={`nav-item ${filterStatus === 'verified' ? 'active' : ''}`} onClick={() => setFilterStatus('verified')}><Clock size={20} /> New / Pending</div>
          <div className={`nav-item ${filterStatus === 'confirmed' ? 'active' : ''}`} onClick={() => setFilterStatus('confirmed')}><CheckCircle size={20} /> Confirmed</div>
          <div className={`nav-item ${filterStatus === 'completed' ? 'active' : ''}`} onClick={() => setFilterStatus('completed')}><Calendar size={20} /> Completed</div>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>Management Console</h1>
          <div className="search-bar">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <div className="admin-split-view">
          <section className="admin-section">
            {Object.keys(groupedBookings).map(month => (
              <div key={month} className="month-group">
                <h2 className="month-title">{month}</h2>
                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>Client</th>
                        <th>Service</th>
                        <th>Date/Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedBookings[month].map((item) => {
                        const currentStatus = (item.status || "verified").toLowerCase();
                        return (
                          <tr key={item.id}>
                            <td><strong>{item.firstName} {item.lastName}</strong><br /><small>{item.number}</small></td>
                            <td><span className="service-tag">{item.service}</span></td>
                            <td>{item.date} <br /> {item.time}</td>
                            <td><span className={`badge ${currentStatus}`}>{item.status}</span></td>
                            <td>
                              <div className="action-group">

                                {currentStatus === 'verified' && (
                                  <button
                                    type="button"
                                    className="confirm-btn"
                                    onClick={(e) => updateStatus(e, item.id, 'confirmed')}
                                  >
                                    <CheckCircle size={18} />
                                  </button>
                                )}

                                {currentStatus === 'confirmed' && (
                                  <button
                                    type="button"
                                    className="complete-btn"
                                    onClick={(e) => updateStatus(e, item.id, 'completed')}
                                  >
                                    <CheckSquare size={18} />
                                  </button>
                                )}

                                <button
                                  type="button"
                                  className="delete-btn"
                                  onClick={(e) => deleteBooking(e, item.id)}
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}