import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <header className="main-header">
        <div className="table-indicator">
          <span className="material-icons icon">table_restaurant</span>
          <div>
            <span className="label">Asztal</span>
            <span className="number">12</span>
          </div>
        </div>
        <h1 className="restaurant-title font-display">Gusto Bistro</h1>
        <div className="language-selector">
          <button className="lang-btn active"><span>Magyar</span></button>
          <button className="lang-btn"><span>English</span></button>
        </div>
      </header>

      <main className="hero-main">
        <span className="material-icons background-icon">restaurant_menu</span>
        <button className="start-order-btn" onClick={() => navigate('/categories')}>
          <span className="material-icons icon">touch_app</span>
          <span className="title font-display">Rendelés Indítása</span>
          <span className="subtitle">Koppints a kezdéshez</span>
        </button>
      </main>

      <footer className="home-footer">
        <div className="promo-banner">
          <div className="promo-badge">ÚJ!</div>
          <div className="promo-content">
            <h3 className="font-display">Napi Ajánlat: Olasz Pizza</h3>
            <p>Próbálja ki új, fatüzelésű kemencében sült pizzáinkat extra sajttal!</p>
            <span className="promo-price">Csak 2490 Ft</span>
          </div>
        </div>
        <div className="help-section">
          <button className="help-btn" onClick={() => navigate('/pincer')}>
            <div className="help-text">
              <span className="title">Segítség</span>
              <span className="subtitle">Pincér hívása</span>
            </div>
            <div className="help-icon-wrapper">
              <span className="material-icons">help_outline</span>
            </div>
          </button>
        </div>
      </footer>
    </>
  );
}