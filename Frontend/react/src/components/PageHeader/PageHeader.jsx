import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PageHeader.css';

export default function PageHeader({ title, theme = 'light', rightContent = null, showBackButton = true }) {
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
      console.error("Token hiba:", error);
    }
  }, []);

  return (
    <header className={`page-header ${isDark ? 'dark' : ''}`}>
      <div className="header-left">
        {showBackButton && (
          <button className="btn-back-pill" onClick={() => navigate(-1)}>
            <span className="material-icons">arrow_back</span>
            <span className="btn-back-text">VISSZA</span>
          </button>
        )}
      </div>
      
      <div className="header-center">
        <h1 className="font-display page-header-title">{title}</h1>
      </div>
      
      <div className="header-right">
        {rightContent}
        {asztalSzam && (
          <div className="table-badge-pill">
            <div className="table-badge-icon-container">
              <span className="material-icons">table_restaurant</span>
            </div>
            <div className="table-badge-details">
              <span className="table-badge-label">Asztal</span>
              <span className="table-badge-number">{asztalSzam}</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}