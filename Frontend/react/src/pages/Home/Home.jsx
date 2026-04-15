import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-layout">
      <header className="home-header">
        <div className="table-badge">
          <span className="material-icons">table_restaurant</span>
          <div>
            <div className="table-badge-label">ASZTAL</div>
            <div className="table-badge-value">12</div>
          </div>
        </div>
        
        <h1 className="font-display home-title">
          Gusto Bistro
        </h1>
      </header>

      <main className="main-content home-main">
        <button 
          className="card hero-btn"
          onClick={() => navigate('/categories')}
        >
          <span className="material-icons hero-icon">touch_app</span>
          <span className="font-display hero-title">Rendelés Indítása</span>
          <span className="hero-subtitle">Koppints a kezdéshez</span>
        </button>
      </main>

      <footer className="home-footer">
        <div className="card promo-card">
          <div>
            <span className="promo-badge">ÚJ!</span>
            <h3 className="font-display promo-title">Napi Ajánlat: Olasz Pizza</h3>
            <p className="promo-desc">Próbálja ki új, fatüzelésű kemencében sült pizzáinkat extra sajttal!</p>
          </div>
        </div>
        
        <button className="card footer-help-btn">
          <div className="help-text-box">
            <div className="help-title">Segítség</div>
            <div className="help-subtitle">Pincér hívása</div>
          </div>
          <span className="material-icons help-icon">help_outline</span>
        </button>
      </footer>
    </div>
  );
}