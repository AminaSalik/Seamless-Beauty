import React, { useState, useEffect } from 'react';
import { db } from '../config/firebaseConfig';
import { collection, onSnapshot, doc, deleteDoc, setDoc, updateDoc } from "firebase/firestore";
import { Users, Trash2, XCircle, Clock, Search, CheckCircle, X, Calendar } from 'lucide-react';
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
      // Sort by newest date first
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

  // --- Logic Functions ---
  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, "bookings", id), { status });
  };

  const deleteBooking = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this record?")) {
      await deleteDoc(doc(db, "bookings", id));
    }
  };

  const addHoliday = async () => {
    if (!newHoliday) return;
    await setDoc(doc(db, "holidays", newHoliday), { active: true });
    setNewHoliday("");
  };

  // --- Grouping & Filtering ---
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = `${b.firstName} ${b.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) || b.number.includes(searchTerm);
    const matchesFilter = filterStatus === "all" || b.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Group bookings by Month for the UI
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
              placeholder="Search name or phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Total Bookings</span>
            <div className="stat-value">{bookings.length}</div>
          </div>
          <div className="stat-card">
            <span className="stat-label">Pending Review</span>
            <div className="stat-value text-yellow">{bookings.filter(b => b.status === 'verified').length}</div>
          </div>
        </div>

        <div className="admin-split-view">
          <section className="admin-section">
            {Object.keys(groupedBookings).length === 0 ? (
              <div className="no-data">No bookings found for this criteria.</div>
            ) : (
              Object.keys(groupedBookings).map(month => (
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
                        {groupedBookings[month].map((item) => (
                          <tr key={item.id} className={`status-${item.status}`}>
                            <td><strong>{item.firstName} {item.lastName}</strong><br/><small>{item.number}</small></td>
                            <td><span className="service-tag">{item.service || "General Service"}</span></td>
                            <td>{item.date} <br/> <small><Clock size={10}/> {item.time}</small></td>
                            <td><span className={`badge ${item.status}`}>{item.status || 'pending'}</span></td>
                            <td>
                              <div className="action-group">
                                {item.status !== 'confirmed' && (
                                  <button className="confirm-btn" title="Confirm" onClick={() => updateStatus(item.id, 'confirmed')}><CheckCircle size={18}/></button>
                                )}
                                {item.status !== 'completed' && (
                                  <button className="complete-btn" title="Mark Done" onClick={() => updateStatus(item.id, 'completed')}><Calendar size={18}/></button>
                                )}
                                <button className="delete-btn" title="Delete" onClick={() => deleteBooking(item.id)}><Trash2 size={18}/></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))
            )}
          </section>

          <section className="holiday-mgmt">
            <h3>Block Dates (Holidays)</h3>
            <div className="holiday-input">
              <input type="date" value={newHoliday} onChange={(e) => setNewHoliday(e.target.value)} />
              <button onClick={addHoliday}>Block</button>
            </div>
            <div className="holiday-list">
              {holidays.sort().map(date => (
                <div key={date} className="holiday-item">
                  <span>{date}</span>
                  <X size={18} className="remove-holiday" onClick={() => deleteDoc(doc(db, "holidays", date))} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}