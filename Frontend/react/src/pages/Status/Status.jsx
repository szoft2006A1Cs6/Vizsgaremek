import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/Shared/Shared';
import './Status.css';

const API_BASE_URL = 'https://localhost:7235';

export default function Status() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const orderId = location.state?.orderId || localStorage.getItem('lastOrderId');

  const [orderStatus, setOrderStatus] = useState(0);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [asztalSzam, setAsztalSzam] = useState(null);
  const [callStatus, setCallStatus] = useState('idle');

  useEffect(() => {
    if (!orderId) {
      navigate('/categories');
      return;
    }
    
    localStorage.setItem('lastOrderId', orderId);
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const szam = (payload.name || payload.unique_name || "").replace(/\D/g, '');
      if (szam) setAsztalSzam(parseInt(szam, 10));
    } catch (e) {}

    const fetchOrderData = async () => {
      try {
        const headers = { 'Authorization': `Bearer ${token}` };
        const [tetelekRes, termekRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/RendelesTetel`, { headers }),
          fetch(`${API_BASE_URL}/api/Termek`, { headers })
        ]);

        if (tetelekRes.ok && termekRes.ok) {
          const allTetelek = await tetelekRes.json();
          const allTermekek = await termekRes.json();
          const myTetelek = allTetelek.filter(t => t.rendelesId === parseInt(orderId));
          
          let calcTotal = 0;
          const merged = myTetelek.map(tetel => {
            const p = allTermekek.find(p => p.termekId === tetel.termekId);
            calcTotal += (p ? p.ar : 0) * tetel.mennyiseg;
            return { ...tetel, termekNev: p ? p.termekNev : 'Termék', ar: p ? p.ar : 0 };
          });
          setItems(merged);
          setTotal(calcTotal);
        }
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };

    fetchOrderData();

    const intervalId = setInterval(async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/Rendeles/${orderId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setOrderStatus(data.statusz);
        }
      } catch (e) {}
    }, 5000);

    return () => clearInterval(intervalId);
  }, [orderId, navigate]);

  const handlePincerHivas = async () => {
    if (callStatus !== 'idle' || !asztalSzam) return;
    setCallStatus('calling');
    const token = localStorage.getItem('token');
    const localTime = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().substring(0, 19);

    try {
      const response = await fetch(`${API_BASE_URL}/api/PincerHivas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ asztalId: asztalSzam, idopont: localTime, statusz: 'Pincér hívása' })
      });
      if (response.ok) {
        setCallStatus('success');
        setTimeout(() => setCallStatus('idle'), 3000);
      } else {
        setCallStatus('idle');
      }
    } catch (err) { setCallStatus('idle'); }
  };

  const getProgress = () => {
    switch(orderStatus) {
      case 0: return { w: '10%', step: 0, t: 'Rendelés leadva' };
      case 1: return { w: '35%', step: 1, t: 'Rendelésed készül!' };
      case 2: return { w: '70%', step: 2, t: 'Tálalás alatt' };
      case 3: return { w: '100%', step: 3, t: 'Jó étvágyat!' };
      default: return { w: '10%', step: 0, t: 'Feldolgozás alatt' };
    }
  };

  const { w, step, t } = getProgress();

  return (
    <div className="page-layout">
      <PageHeader title="Rendelés Állapota" />

      <main className="main-content status-main">
        <div className="text-center">
          <p className="status-order-num">Rendelésszám: #{orderId}</p>
          <h2 className="font-display status-title">{t}</h2>
        </div>

        <div className="card tracker-card">
          <div className="status-tracker">
            <div className="progress-bar-bg"></div>
            <div className="progress-bar-fill" style={{ width: w }}></div>
            <div className="steps-container">
              <div className={`step-item ${step >= 0 ? 'completed' : ''} ${step === 0 ? 'active' : ''}`}>
                <div className="step-icon"><span className="material-icons">receipt_long</span></div>
                <span className="step-label">Leadva</span>
              </div>
              <div className={`step-item ${step >= 1 ? 'completed' : ''} ${step === 1 ? 'active' : ''}`}>
                <div className="step-icon"><span className="material-icons">kitchen</span></div>
                <span className="step-label">Készül</span>
              </div>
              <div className={`step-item ${step >= 2 ? 'completed' : ''} ${step === 2 ? 'active' : ''}`}>
                <div className="step-icon"><span className="material-icons">restaurant</span></div>
                <span className="step-label">Tálalás</span>
              </div>
              <div className={`step-item ${step >= 3 ? 'completed' : ''} ${step === 3 ? 'active' : ''}`}>
                <div className="step-icon"><span className="material-icons">check_circle</span></div>
                <span className="step-label">Kész</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card details-card">
          <h3 className="font-display details-title">Rendelés Részletei</h3>
          <ul className="details-list">
            {items.map((item, i) => (
              <li key={i} className="details-item">
                <span>{item.mennyiseg}x {item.termekNev}</span> <b>{item.ar * item.mennyiseg} Ft</b>
              </li>
            ))}
          </ul>
          <div className="details-total-row">
            <span className="details-total-label">Összesen</span>
            <span className="font-display details-total-value">{total} Ft</span>
          </div>
        </div>

        <div className="status-actions">
          {orderStatus === 3 ? (
            <>
              <button 
                className="btn btn-outline status-action-btn" 
                onClick={handlePincerHivas}
                disabled={callStatus !== 'idle'}
                style={callStatus === 'success' ? { backgroundColor: '#16A34A', color: 'white', borderColor: '#15803D' } : {}}
              >
                <span className="material-icons">
                  {callStatus === 'success' ? 'check_circle' : 'room_service'}
                </span> 
                {callStatus === 'success' ? 'Sikeres hívás!' : 'Pincér hívása'}
              </button>

              <button 
                className="btn btn-outline status-action-btn" 
                onClick={() => navigate('/rating', { state: { orderId } })}
              >
                <span className="material-icons">star_outline</span> 
                Értékelés
              </button>
            </>
          ) : (
            <button 
              className="btn btn-outline status-action-btn" 
              style={{ 
                flex: '1', 
                padding: '2rem', 
                fontSize: '1.2rem',
                ...(callStatus === 'success' ? { backgroundColor: '#16A34A', color: 'white', borderColor: '#15803D' } : {}) 
              }}
              onClick={handlePincerHivas}
              disabled={callStatus !== 'idle'}
            >
              <span className="material-icons" style={{ fontSize: '2rem' }}>
                {callStatus === 'success' ? 'check_circle' : 'room_service'}
              </span> 
              {callStatus === 'success' ? 'Sikeres hívás!' : 'Pincér hívása'}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}