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
    <div style={{ background: '#111827', color: 'white', minHeight: '100vh', padding: '1.5rem', fontFamily: 'sans-serif' }}>
      
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #374151', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--accent)', margin: 0, display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className="material-icons" style={{ fontSize: '2.5rem' }}>soup_kitchen</span> Konyhai Nézet
        </h1>
        <div style={{ background: '#1F2937', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontSize: '1.5rem', fontFamily: 'monospace', color: '#60A5FA' }}>
          {time}
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '2rem' }}>
        
        <section>
          <h2 style={{ color: '#9CA3AF', textTransform: 'uppercase', fontSize: '1.2rem', marginBottom: '1rem' }}>Aktív rendelések ({orders.length})</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {orders.map(o => (
              <div key={o.id} style={{ background: '#1F2937', borderRadius: '1rem', borderTop: '6px solid var(--primary)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                
                <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #374151' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>#{o.asztal}</span>
                  <span style={{ color: 'var(--accent)', fontFamily: 'monospace', fontSize: '1.2rem' }}>{o.ido}</span>
                </div>
                
                <div style={{ padding: '1rem', flexGrow: 1 }}>
                  <div style={{ color: '#9CA3AF', marginBottom: '1rem', borderBottom: '1px dashed #374151', paddingBottom: '0.5rem' }}>Pincér: {o.pincer}</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {o.tetelek.map((t, i) => (
                      <li key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                        <span style={{ background: 'var(--accent)', color: 'var(--dark)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 'bold' }}>{t.db}x</span>
                        <span>{t.nev}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button 
                  style={{ background: '#16A34A', color: 'white', padding: '1rem', border: 'none', fontSize: '1.2rem', fontWeight: 'bold', textTransform: 'uppercase', cursor: 'pointer' }}
                  onClick={() => setOrders(prev => prev.filter(order => order.id !== o.id))}
                >
                  Elkészült <span className="material-icons">check_circle</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        <aside style={{ background: '#1F2937', padding: '1.5rem', borderRadius: '1rem', alignSelf: 'start' }}>
          <h2 style={{ color: '#9CA3AF', textTransform: 'uppercase', fontSize: '1.2rem', borderBottom: '1px solid #374151', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
            <span className="material-icons">notifications</span> Hívások
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {calls.map(c => (
              <div key={c.id} style={{ background: 'rgba(220, 38, 38, 0.2)', borderLeft: '4px solid var(--primary)', padding: '1rem', borderRadius: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#FCA5A5', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  <span>#{c.asztal} Asztal</span>
                  <small>{c.ido}</small>
                </div>
                <div style={{ color: 'white', marginBottom: '1rem', fontSize: '1.1rem' }}>{c.tipus}</div>
                <button 
                  style={{ width: '100%', padding: '0.75rem', background: '#991B1B', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                  onClick={() => setCalls(prev => prev.filter(call => call.id !== c.id))}
                >
                  Nyugtázva
                </button>
              </div>
            ))}
            {calls.length === 0 && <div style={{ color: '#9CA3AF', textAlign: 'center', marginTop: '2rem' }}>Nincs aktív hívás</div>}
          </div>
        </aside>
      </div>
    </div>
  );
}