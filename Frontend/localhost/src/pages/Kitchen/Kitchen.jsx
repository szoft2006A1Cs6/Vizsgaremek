import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import KitchenOrderCard from '../../components/KitchenOrderCard/KitchenOrderCard';
import KitchenCallAlert from '../../components/KitchenCallAlert/KitchenCallAlert';
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
      const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
      const [ordersRes, itemsRes, productsRes, waitersRes, callsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/Rendeles`, { headers }),
        fetch(`${API_BASE_URL}/api/RendelesTetel`, { headers }),
        fetch(`${API_BASE_URL}/api/Termek`, { headers }),
        fetch(`${API_BASE_URL}/api/Pincer`, { headers }),
        fetch(`${API_BASE_URL}/api/PincerHivas`, { headers })
      ]);
      
      if (!ordersRes.ok || !callsRes.ok) throw new Error('API hiba történt.');
      
      const rawOrders = await ordersRes.json(), 
            rawItems = await itemsRes.json(), 
            rawProducts = await productsRes.json(),
            rawWaiters = await waitersRes.json(), 
            rawCalls = await callsRes.json();

      setOrders(rawOrders.filter(o => o.statusz < 3).map(o => {
        const pincer = rawWaiters.find(p => p.pincerId === o.pincerId);
        const tetelek = rawItems.filter(rt => rt.rendelesId === o.rendelesId).map(rt => {
          const termek = rawProducts.find(t => t.termekId === rt.termekId);
          return { nev: termek ? termek.termekNev : 'Ismeretlen', db: rt.mennyiseg };
        });
        return { 
          id: o.rendelesId, 
          asztal: o.asztalId, 
          statusz: o.statusz, 
          ido: new Date(o.idopont).toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' }), 
          pincer: pincer ? pincer.pincerNev : 'Nincs pincér', 
          tetelek: tetelek, 
          raw: o 
        };
      }).sort((a, b) => new Date(b.raw.idopont) - new Date(a.raw.idopont)));

      setCalls(rawCalls.filter(c => c.statusz !== 'Teljesítve').map(c => ({
        id: c.hivasId, 
        asztal: c.asztalId, 
        tipus: c.statusz || 'Fizetés', 
        ido: new Date(c.idopont).toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' }), 
        raw: c
      })).sort((a, b) => new Date(b.raw.idopont) - new Date(a.raw.idopont)));
      
      setError('');
    } catch (err) { setError('Hiba a szerverhez való kapcsolódás során.'); }
  };

  useEffect(() => {
    fetchData();
    const clockInterval = setInterval(() => setTime(new Date().toLocaleTimeString('hu-HU')), 1000);
    const pollInterval = setInterval(fetchData, 10000);
    return () => { clearInterval(clockInterval); clearInterval(pollInterval); };
  }, []);

  const updateStatus = async (order, nextStatus) => {
    try {
      await fetch(`${API_BASE_URL}/api/Rendeles/${order.id}`, {
        method: 'PUT', headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...order.raw, statusz: nextStatus })
      });
      fetchData();
    } catch (err) {}
  };

  const resolveCall = async (call) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/PincerHivas/${call.id}`, {
        method: 'PUT', headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...call.raw, statusz: 'Teljesítve' })
      });
      if (response.ok) setCalls(prev => prev.filter(c => c.id !== call.id));
    } catch (err) {}
  };

  return (
    <div className="kds-theme">
      <header className="kds-header">
        <h1 className="kds-title">
          <span className="material-icons kds-title-icon">soup_kitchen</span> 
          Gusto Bistro
        </h1>
        
        <div className="kds-header-actions">
          {error && <span className="kds-error-msg">{error}</span>}
          
          <button onClick={() => navigate('/editmenu')} className="kds-nav-btn" title="Menü szerkesztése">
            <span className="material-icons">edit_note</span>
          </button>
          
          <button onClick={() => navigate('/editstaff')} className="kds-nav-btn" title="Személyzet szerkesztése">
            <span className="material-icons">people_alt</span>
          </button>

          <button onClick={() => navigate('/ratingstats')} className="kds-nav-btn" title="Értékelések megtekintése">
            <span className="material-icons">star_rate</span>
          </button>

          <div className="kds-clock">{time}</div>
          
          <button onClick={() => { localStorage.clear(); navigate('/'); }} className="logout-btn" title="Kijelentkezés">
            <span className="material-icons">logout</span>
          </button>
        </div>
      </header>

      <div className="kds-layout">
        <section className="kds-orders-section">
          <div className="kds-orders-grid">
            {orders.map(o => ( <KitchenOrderCard key={o.id} order={o} updateStatus={updateStatus} /> ))}
          </div>
        </section>
        <aside className="kds-sidebar">
          <h2 className="kds-sidebar-title"><span className="material-icons">notifications</span> Hívások</h2>
          <div className="kds-calls-list">
            {calls.map(c => ( <KitchenCallAlert key={c.id} call={c} resolveCall={resolveCall} /> ))}
            {calls.length === 0 && (<div className="kds-empty-msg">Nincs aktív hívás</div>)}
          </div>
        </aside>
      </div>
    </div>
  );
}