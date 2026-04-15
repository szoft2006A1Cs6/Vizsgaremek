import React, { useState, useEffect } from 'react';

const INITIAL_ORDERS = [
  { id: 1, asztal: 3, ido: '18:15', pincer: 'Kiss Péter', tetelek: [{ nev: 'Margherita pizza', db: 2 }, { nev: 'Coca-Cola 0.5l', db: 2 }] },
  { id: 2, asztal: 8, ido: '18:18', pincer: 'Kovács Bence', tetelek: [{ nev: 'Sajtburger', db: 1 }, { nev: 'Házi limonádé', db: 2 }] }
];
const INITIAL_CALLS = [{ id: 101, asztal: 4, tipus: 'Fizetés', ido: '18:26' }];

export default function KonyhaiKijelzo() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [calls, setCalls] = useState(INITIAL_CALLS);
  const [time, setTime] = useState(new Date().toLocaleTimeString('hu-HU'));

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString('hu-HU')), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="kds-theme">
      
      <header className="kds-header">
        <h1 className="kds-title">
          <span className="material-icons kds-title-icon">soup_kitchen</span> Konyhai Nézet
        </h1>
        <div className="kds-clock">
          {time}
        </div>
      </header>

      <div className="kds-layout">
        
        <section>
          <h2 className="kds-section-title">Aktív rendelések ({orders.length})</h2>
          <div className="kds-orders-grid">
            {orders.map(o => (
              <div key={o.id} className="kds-card">
                
                <div className="kds-card-header">
                  <span className="kds-card-table">#{o.asztal}</span>
                  <span className="kds-card-time">{o.ido}</span>
                </div>
                
                <div className="kds-card-body">
                  <div className="kds-card-waiter">Pincér: {o.pincer}</div>
                  <ul className="kds-item-list">
                    {o.tetelek.map((t, i) => (
                      <li key={i} className="kds-item">
                        <span className="kds-item-qty">{t.db}x</span>
                        <span>{t.nev}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button 
                  className="kds-btn-ready"
                  onClick={() => setOrders(prev => prev.filter(order => order.id !== o.id))}
                >
                  Elkészült <span className="material-icons">check_circle</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        <aside className="kds-sidebar">
          <h2 className="kds-sidebar-title">
            <span className="material-icons">notifications</span> Hívások
          </h2>
          <div className="kds-calls-list">
            {calls.map(c => (
              <div key={c.id} className="kds-call-card">
                <div className="kds-call-header">
                  <span>#{c.asztal} Asztal</span>
                  <small>{c.ido}</small>
                </div>
                <div className="kds-call-type">{c.tipus}</div>
                <button 
                  className="kds-btn-ack"
                  onClick={() => setCalls(prev => prev.filter(call => call.id !== c.id))}
                >
                  Nyugtázva
                </button>
              </div>
            ))}
            {calls.length === 0 && <div className="kds-empty-calls">Nincs aktív hívás</div>}
          </div>
        </aside>
      </div>
    </div>
  );
}