import { useNavigate } from 'react-router-dom';

export default function Rating() {
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate('/');
  };

  return (
    <div style={{ backgroundColor: '#EFEBE9', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className="page-header bg-dark">
        <button 
          className="back-btn" 
          style={{ backgroundColor: '#5D4037', color: 'white' }}
          onClick={() => navigate(-1)}
        >
          <span className="material-icons">arrow_back</span> Vissza
        </button>
        <h1 className="center-title font-display" style={{ fontSize: '2rem' }}>Étterem Neve</h1>
        <div style={{ width: '100px' }}></div>
      </header>

      <main className="rating-main">
        <div className="rating-box">
          <span className="material-icons rating-icon" style={{ animation: 'pulse-slow 2s infinite' }}>restaurant</span>
          <h2 className="font-display">Hogy ízlett az étel?</h2>
          <p>Kérjük, értékelje a rendelését, hogy még jobb élményt nyújthassunk!</p>
            
          <div className="stars">
            <button><span className="material-icons">star</span></button>
            <button><span className="material-icons">star</span></button>
            <button><span className="material-icons">star</span></button>
            <button><span className="material-icons">star</span></button>
            <button><span className="material-icons empty">star</span></button>
          </div>

          <div className="feedback-box">
            <label htmlFor="feedback">Megjegyzés (Opcionális)</label>
            <textarea id="feedback" rows="4" placeholder="Írja meg véleményét..."></textarea>
          </div>

          <button className="submit-btn" onClick={handleFinish}>
            <span>ÉRTÉKELÉS BEKÜLDÉSE</span>
            <span className="material-icons">send</span>
          </button>
            
          <button className="skip-btn" onClick={handleFinish}>Kihagyom az értékelést</button>
        </div>
      </main>

      <footer className="rating-footer">
        <div className="rating-ad">
          <div style={{ width: '100%', height: '100%', backgroundColor: '#5D4037', opacity: 0.8 }}></div> {/* Kép helye */}
          <span>Próbálja ki új desszertünket!</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Segítség / Pincér hívása</span>
          <button className="floating-help-btn" style={{ position: 'static', margin: 0, boxShadow: 'none' }}>
            <span className="material-icons" style={{ fontSize: '2rem' }}>help_outline</span>
          </button>
        </div>
      </footer>
    </div>
  );
}