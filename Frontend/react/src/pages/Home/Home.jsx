import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroButton from '../../components/HeroButton/HeroButton';
import PromoCard from '../../components/PromoCard/PromoCard';
import './Home.css';

const API_BASE_URL = 'https://localhost:7235'; 

export default function Home() {
  const navigate = useNavigate();
  const [asztalSzam, setAsztalSzam] = useState('?');
  const [callStatus, setCallStatus] = useState('idle');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/'); return; }
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
      const payload = JSON.parse(jsonPayload);
      const nameClaim = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || payload.name || payload.unique_name || "";
      const szam = nameClaim.replace(/\D/g, '');
      if (szam) setAsztalSzam(szam);
    } catch (error) { console.error(error); }
  }, [navigate]);

  const handleSegitseg = async () => {
    if (callStatus !== 'idle') return;
    const token = localStorage.getItem('token');
    if (!token || asztalSzam === '?') return;
    setCallStatus('calling');
    const localTime = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().substring(0, 19);

    try {
      const response = await fetch(`${API_BASE_URL}/api/PincerHivas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ asztalId: parseInt(asztalSzam, 10), idopont: localTime, statusz: 'Segítség Kérés' })
      });
      if (response.ok) {
        setCallStatus('success');
        setTimeout(() => setCallStatus('idle'), 3000);
      } else {
        alert('Hiba történt a hívás során.');
        setCallStatus('idle');
      }
    } catch (error) { setCallStatus('idle'); }
  };

  return (
    <div className="page-layout">
      <header className="home-header">
        <div className="table-badge">
          <span className="material-icons">table_restaurant</span>
          <div>
            <div className="table-badge-label">ASZTAL</div>
            <div className="table-badge-value">{asztalSzam}</div>
          </div>
        </div>
        <h1 className="font-display home-title">Gusto Bistro</h1>
      </header>

      <main className="main-content home-main">
        <HeroButton onClick={() => navigate('/categories')} />
      </main>

      <footer className="home-footer">
        <PromoCard />
        <button 
          className="card footer-help-btn"
          onClick={handleSegitseg}
          disabled={callStatus !== 'idle'}
          style={callStatus === 'success' ? { backgroundColor: '#16A34A', color: 'white', borderColor: '#15803D' } : {}}
        >
          <div className="help-text-box">
            <div className="help-title">{callStatus === 'calling' ? 'Küldés...' : callStatus === 'success' ? 'Hívás elküldve!' : 'Segítség'}</div>
            <div className="help-subtitle">{callStatus === 'success' ? 'A pincér hamarosan érkezik' : 'Pincér hívása'}</div>
          </div>
          <span className="material-icons help-icon" style={callStatus === 'success' ? { color: 'white' } : {}}>
            {callStatus === 'success' ? 'check_circle' : 'help_outline'}
          </span>
        </button>
      </footer>
    </div>
  );
}