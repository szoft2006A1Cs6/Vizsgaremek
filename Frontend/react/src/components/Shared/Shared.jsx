import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Shared.css';

const API_BASE_URL = 'https://localhost:7235';

export function PageHeader({ title, theme = 'light', rightContent = null, showBackButton = true }) {
  const navigate = useNavigate();
  const isDark = theme === 'dark';
  const [asztalSzam, setAsztalSzam] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      const payload = JSON.parse(jsonPayload);
      const nameClaim = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] 
                        || payload.name 
                        || payload.unique_name 
                        || "";
      
      const szam = nameClaim.replace(/\D/g, '');
      if (szam) setAsztalSzam(szam);
    } catch (error) {
      console.error("Token hiba a fejlécben:", error);
    }
  }, []);

  return (
    <header className={`page-header ${isDark ? 'dark' : ''}`}>
      <div className="header-left">
        {showBackButton && (
          <button className="btn btn-back" onClick={() => navigate(-1)}>
            <span className="material-icons">arrow_back</span> Vissza
          </button>
        )}
      </div>
      
      <div className="header-center">
        <h1 className="font-display page-header-title">
          {title}
        </h1>
      </div>
      
      {/* Ide került át a jelvény, a jobb oldalra! */}
      <div className="header-right">
        {rightContent}
        {asztalSzam && (
          <div className="table-badge">
            <span className="material-icons table-badge-icon">table_restaurant</span>
            <div className="table-badge-text-wrapper">
              <span className="table-badge-label">Asztal</span>
              <span className="table-badge-number">{asztalSzam}</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export function FloatingHelpBtn() {
  const [asztalSzam, setAsztalSzam] = useState('?');
  const [callStatus, setCallStatus] = useState('idle');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      const payload = JSON.parse(jsonPayload);
      const nameClaim = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] 
                        || payload.name 
                        || payload.unique_name 
                        || "";
      
      const szam = nameClaim.replace(/\D/g, '');
      if (szam) setAsztalSzam(szam);
    } catch (error) {
      console.error("Token hiba a gombnál:", error);
    }
  }, []);

  const handleSegitseg = async () => {
    if (callStatus !== 'idle') return;
    const token = localStorage.getItem('token');
    if (!token || asztalSzam === '?') return;

    setCallStatus('calling');
    const now = new Date();
    const localTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .substring(0, 19); 

    try {
      const response = await fetch(`${API_BASE_URL}/api/PincerHivas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          asztalId: parseInt(asztalSzam, 10),
          idopont: localTime, 
          statusz: 'Segítség Kérés'
        })
      });

      if (response.ok) {
        setCallStatus('success');
        setTimeout(() => setCallStatus('idle'), 3000);
      } else {
        setCallStatus('idle');
      }
    } catch (error) {
      setCallStatus('idle');
    }
  };

  return (
    <button 
      className="floating-help" 
      onClick={handleSegitseg}
      style={callStatus === 'success' ? { backgroundColor: '#16A34A', color: 'white', borderColor: '#15803D' } : {}}
    >
      <span className="material-icons floating-help-icon">
        {callStatus === 'success' ? 'check_circle' : 'help_outline'}
      </span>
    </button>
  );
}