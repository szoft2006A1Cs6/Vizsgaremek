import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle, Clock, ChefHat, AlertTriangle } from 'lucide-react';

// --- STATIKUS PÉLDA ADATOK ---
const PELDADAT_RENDELESEK = [
  {
    rendeles_id: 1,
    asztal_id: 3,
    idopont: '18:15',
    pincer_nev: 'Kiss Péter',
    tetelek: [
      { termek_nev: 'Margherita pizza', mennyiseg: 2 },
      { termek_nev: 'Coca-Cola 0.5l', mennyiseg: 2 }
    ]
  },
  {
    rendeles_id: 2,
    asztal_id: 8,
    idopont: '18:18',
    pincer_nev: 'Kovács Bence',
    tetelek: [
      { termek_nev: 'Sajtburger', mennyiseg: 1 },
      { termek_nev: 'BBQ oldalas', mennyiseg: 1 },
      { termek_nev: 'Házi limonádé', mennyiseg: 2 }
    ]
  },
  {
    rendeles_id: 3,
    asztal_id: 2,
    idopont: '18:22',
    pincer_nev: 'Horváth Luca',
    tetelek: [
      { termek_nev: 'Spaghetti Carbonara', mennyiseg: 3 },
      { termek_nev: 'Cézár saláta', mennyiseg: 1 }
    ]
  }
];

const PELDADAT_HIVASOK = [
  { id: 101, asztal_id: 4, tipus: 'Fizetés', ido: '18:26' },
  { id: 102, asztal_id: 9, tipus: 'Segítség kérése', ido: '18:28' }
];

export default function KonyhaiKijelzo() {
  const [orders, setOrders] = useState(PELDADAT_RENDELESEK);
  const [waiterCalls, setWaiterCalls] = useState(PELDADAT_HIVASOK);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Óra frissítése
  useEffect(() => {
    const clockInterval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(clockInterval);
  }, []);

  const markAsReady = (id) => {
    setOrders(prev => prev.filter(o => o.rendeles_id !== id));
  };

  const resolveCall = (id) => {
    setWaiterCalls(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="kds-container">
      {/* FEJLÉC */}
      <header className="kds-header">
        <h1 className="kds-title">
          <ChefHat size={40} />
          Konyhai Nézet
        </h1>
        <div className="kds-clock">
          {currentTime.toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>
      </header>

      {/* FŐ TARTALOM */}
      <div className="kds-layout">
        
        {/* RENDELÉSEK (BAL OLDAL) */}
        <section className="kds-orders-section">
          <h2>Aktív rendelések ({orders.length})</h2>
          
          <div className="kds-orders-grid">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.rendeles_id} className="kds-card">
                  <div className="kds-card-header">
                    <span className="kds-table-num">#{order.asztal_id}</span>
                    <span className="kds-time">{order.idopont}</span>
                  </div>
                  
                  <div className="kds-card-body">
                    <span className="kds-waiter-name">Pincér: {order.pincer_nev}</span>
                    <ul className="kds-items">
                      {order.tetelek.map((tetel, index) => (
                        <li key={index} className="kds-item">
                          <span className="kds-qty">{tetel.mennyiseg}x</span>
                          <span className="kds-item-name">{tetel.termek_nev}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="kds-btn-ready" onClick={() => markAsReady(order.rendeles_id)}>
                    <CheckCircle size={24} />
                    Elkészült
                  </button>
                </div>
              ))
            ) : (
              <div className="kds-empty-state">
                <p>Minden rendelés kész!</p>
              </div>
            )}
          </div>
        </section>

        {/* PINCÉRHÍVÁSOK (JOBB OLDAL) */}
        <aside className="kds-sidebar">
          <h2 className="kds-sidebar-title">
            <Bell size={20} />
            Hívások
          </h2>
          
          <div className="kds-calls-list">
            {waiterCalls.map((call) => (
              <div key={call.id} className="kds-call-alert">
                <div className="kds-call-header">
                  <span>#{call.asztal_id} Asztal</span>
                  <small>{call.ido}</small>
                </div>
                <div className="kds-call-reason">
                  {call.tipus}
                </div>
                <button className="kds-btn-ack" onClick={() => resolveCall(call.id)}>
                  Nyugtázva
                </button>
              </div>
            ))}
            
            {waiterCalls.length === 0 && (
              <p style={{ textAlign: 'center', opacity: 0.5 }}>Nincs aktív hívás</p>
            )}
          </div>
        </aside>

      </div>
    </div>
  );
}