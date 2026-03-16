import { useNavigate } from 'react-router-dom';

export default function Status() {
  const navigate = useNavigate();

  return (
    <>
      <header className="page-header bg-dark">
        <button 
          className="back-btn light" 
          style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' }}
          onClick={() => navigate(-1)}
        >
          <span className="material-icons">arrow_back</span> Vissza
        </button>
        <h1 className="center-title font-display" style={{ color: 'var(--secondary-yellow)', fontSize: '2rem' }}>
          PIZZA ÉS GRILL
        </h1>
        <div style={{ backgroundColor: 'var(--secondary-yellow)', color: 'var(--brown-dark)', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontWeight: 'bold', fontFamily: "'Playfair Display', serif" }}>
          ASZTAL: 12
        </div>
      </header>

      <main className="status-main">
        <div className="status-header-text">
          <h2 className="font-display">RENDELÉS ÁLLAPOTA</h2>
          <p>Rendelésszám: #8492</p>
        </div>

        <div className="tracker-box">
          <div className="progress-container">
            <div className="progress-line-bg"></div>
            <div className="progress-line-fill"></div>
            <div className="steps-wrapper">
              <div className="step active">
                <div className="step-icon"><span className="material-icons">receipt_long</span></div>
                <span className="step-label">Leadva</span>
              </div>
              <div className="step active">
                <div className="step-icon" style={{ animation: 'pulse-slow 2s infinite' }}><span className="material-icons">kitchen</span></div>
                <span className="step-label">Készül</span>
              </div>
              <div className="step inactive">
                <div className="step-icon"><span className="material-icons">restaurant</span></div>
                <span className="step-label">Tálalás</span>
              </div>
              <div className="step inactive">
                <div className="step-icon"><span className="material-icons">check_circle</span></div>
                <span className="step-label">Kész</span>
              </div>
            </div>
          </div>

          <div className="wait-time-box">
            <p>Becsült várakozási idő</p>
            <div><span className="material-icons" style={{ fontSize: '3rem' }}>schedule</span> ~12 PERC</div>
          </div>
        </div>

        <div className="status-bottom-grid">
          <div className="status-details">
            <h3 className="font-display">Rendelés részletei</h3>
            <ul>
              <li><span>1x Pizza Margherita (32cm)</span> <b>2 490 Ft</b></li>
              <li><span>2x Coca Cola (0.5L)</span> <b>1 180 Ft</b></li>
              <li><span>1x Görög Saláta</span> <b>1 890 Ft</b></li>
            </ul>
            <div className="total">
              <span style={{ color: 'var(--gray-500)', textTransform: 'uppercase' }}>Összesen</span>
              <span>5 560 Ft</span>
            </div>
          </div>
            
          <div className="status-actions">
            {/* Navigáció az értékeléshez, csak teszt!!*/}
            <button className="action-btn waiter" onClick={() => navigate('/rating')}>
              <span className="material-icons" style={{ fontSize: '3rem' }}>room_service</span> Pincér hívása
            </button>
            <button className="action-btn help">
              <span className="material-icons" style={{ color: 'var(--primary-red)', fontSize: '3rem' }}>help_outline</span> Segítség
            </button>
          </div>
        </div>
      </main>

      <footer className="status-footer">
        <div className="status-footer-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ backgroundColor: 'var(--primary-red)', padding: '0.5rem', borderRadius: '0.5rem' }}>
              <span className="material-icons">campaign</span>
            </div>
            <p style={{ margin: 0, fontWeight: 500 }}>Próbálta már a házi tiramisut? Desszertnek még nem késő!</p>
          </div>
          <button style={{ backgroundColor: 'white', color: 'var(--brown-dark)', padding: '0.5rem 1.5rem', borderRadius: '9999px', fontWeight: 'bold', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}>
            Hozzáadás
          </button>
        </div>
      </footer>
    </>
  );
}