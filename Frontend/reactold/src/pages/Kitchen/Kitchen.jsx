import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Kitchen.css';

const API_BASE_URL = 'https://localhost:7235';

export default function KonyhaiKijelzo() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [calls, setCalls] = useState([]);
  const [time, setTime] = useState(new Date().toLocaleTimeString('hu-HU'));
  const [error, setError] = useState('');

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/'); return; }

    try {
      const headers = { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const [ordersRes, itemsRes, productsRes, waitersRes, callsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/Rendeles`, { headers }),
        fetch(`${API_BASE_URL}/api/RendelesTetel`, { headers }),
        fetch(`${API_BASE_URL}/api/Termek`, { headers }),
        fetch(`${API_BASE_URL}/api/Pincer`, { headers }),
        fetch(`${API_BASE_URL}/api/PincerHivas`, { headers })
      ]);

      if (!ordersRes.ok || !callsRes.ok) throw new Error('API hiba történt.');

      const rawOrders = await ordersRes.json();
      const rawItems = await itemsRes.json();
      const rawProducts = await productsRes.json();
      const rawWaiters = await waitersRes.json();
      const rawCalls = await callsRes.json();

      const activeOrders = rawOrders
        .filter(o => o.statusz < 3) 
        .map(o => {
          const pincer = rawWaiters.find(p => p.pincerId === o.pincerId);
          const tetelek = rawItems
            .filter(rt => rt.rendelesId === o.rendelesId)
            .map(rt => {
              const termek = rawProducts.find(t => t.termekId === rt.termekId);
              return { nev: termek ? termek.termekNev : 'Ismeretlen', db: rt.mennyiseg };
            });

          return {
            id: o.rendelesId,
            asztal: o.asztalId,
            statusz: o.statusz,
            ido: new Date(o.idopont).toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' }),
            pincer: pincer ? pincer.pincerNev : 'Ismeretlen',
            tetelek: tetelek,
            raw: o 
          };
        })
        .sort((a, b) => new Date(b.raw.idopont) - new Date(a.raw.idopont));

      setOrders(activeOrders);

      const activeCalls = rawCalls
        .filter(c => c.statusz !== 'Teljesítve') 
        .map(c => ({
          id: c.hivasId,
          asztal: c.asztalId,
          tipus: c.statusz || 'Fizetés',
          ido: new Date(c.idopont).toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' }),
          raw: c
        }))
        .sort((a, b) => new Date(b.raw.idopont) - new Date(a.raw.idopont));

      setCalls(activeCalls);
      setError('');
    } catch (err) {
      setError('Hiba a szerverhez való kapcsolódás során.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  useEffect(() => {
    fetchData();
    const clockInterval = setInterval(() => setTime(new Date().toLocaleTimeString('hu-HU')), 1000);
    const pollInterval = setInterval(fetchData, 10000);
    return () => { clearInterval(clockInterval); clearInterval(pollInterval); };
  }, []);

  const updateStatus = async (order, nextStatus) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`${API_BASE_URL}/api/Rendeles/${order.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...order.raw, statusz: nextStatus })
      });
      fetchData();
    } catch (err) {
      alert("Hiba a frissítéskor!");
    }
  };

  const getButtonConfig = (status) => {
    switch(status) {
      case 0: return { text: 'Felvétel', icon: 'pan_tool', className: 'kds-btn-accept', next: 1 };
      case 1: return { text: 'Tálalás', icon: 'restaurant', className: 'kds-btn-serve', next: 2 };
      case 2: return { text: 'Kiadva', icon: 'check_circle', className: 'kds-btn-ready', next: 3 };
      default: return null;
    }
  };

  const resolveCall = async (call) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_BASE_URL}/api/PincerHivas/${call.id}`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...call.raw,
          statusz: 'Teljesítve'
        })
      });

      if (response.ok) {
        setCalls(prev => prev.filter(c => c.id !== call.id));
      } else {
        console.error("API hiba a nyugtázáskor");
      }
    } catch (err) {
      alert("Hiba a hívás nyugtázásakor!");
    }
  };

  return (
    <div className="kds-theme">
      <header className="kds-header">
        <h1 className="kds-title"><span className="material-icons kds-title-icon">soup_kitchen</span> Gusto Bistro</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {error && <span style={{ color: '#FCA5A5' }}>{error}</span>}
          <div className="kds-clock">{time}</div>
          <button onClick={handleLogout} className="logout-btn" title="Kijelentkezés">
            <span className="material-icons">logout</span>
          </button>
        </div>
      </header>

      <div className="kds-layout">
        <section className="kds-orders-section">
          <div className="kds-orders-grid">
            {orders.map(o => {
              const config = getButtonConfig(o.statusz);
              return (
                <div key={o.id} className={`kds-card status-${o.statusz}`}>
                  <div className="kds-card-header">
                    <span className="kds-table-num">#{o.asztal}</span>
                    <span className="kds-status-badge">{o.pincer}</span>
                    <span className="kds-time">{o.ido}</span>
                  </div>
                  <div className="kds-card-body">
                    <ul className="kds-item-list">
                      {o.tetelek.map((t, i) => (
                        <li key={i} className="kds-item">
                          <span className="kds-item-qty">{t.db}x</span>
                          <span>{t.nev}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {config && (
                    <button className={`kds-main-btn ${config.className}`} onClick={() => updateStatus(o, config.next)}>
                      {config.text} <span className="material-icons">{config.icon}</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>
          <aside className="kds-sidebar">
            <h2 className="kds-sidebar-title">
              <span className="material-icons">notifications</span> Hívások
            </h2>
            <div className="kds-calls-list">
              {calls.map(c => (
                <div key={c.id} className="kds-call-alert">
                  <div className="kds-call-header">
                    <span>#{c.asztal} Asztal</span>
                    <small>{c.ido}</small>
                  </div>
                  <div className="kds-call-reason">{c.tipus}</div>
                  <button 
                    className="kds-btn-ack"
                    onClick={() => resolveCall(c)}
                  >
                    Nyugtázva
                  </button>
                </div>
              ))}
              
              {calls.length === 0 && (
                <div style={{ color: '#9CA3AF', textAlign: 'center', marginTop: '2rem' }}>
                  Nincs aktív hívás
                </div>
              )}
            </div>
          </aside>
      </div>
    </div>
  );
}