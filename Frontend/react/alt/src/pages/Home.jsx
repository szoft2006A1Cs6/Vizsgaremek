import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-layout">
      <header style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface)', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--dark)', color: 'white', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)' }}>
          <span className="material-icons" style={{ color: 'var(--accent)' }}>table_restaurant</span>
          <div>
            <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>ASZTAL</div>
            <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>12</div>
          </div>
        </div>
        
        <h1 className="font-display" style={{ color: 'var(--primary)', fontSize: '2.5rem', margin: 0 }}>
          Gusto Bistro
        </h1>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn" style={{ background: 'var(--accent-light)', color: 'var(--primary)' }}>Magyar</button>
          <button className="btn" style={{ background: 'transparent', color: 'var(--text-muted)' }}>English</button>
        </div>
      </header>

      <main className="main-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <button 
          className="card"
          style={{ background: 'var(--primary)', color: 'white', padding: '4rem 2rem', width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', border: 'none' }}
          onClick={() => navigate('/categories')}
        >
          <span className="material-icons" style={{ fontSize: '6rem', marginBottom: '1rem' }}>touch_app</span>
          <span className="font-display" style={{ fontSize: '3rem', fontWeight: 'bold' }}>Rendelés Indítása</span>
          <span style={{ fontSize: '1.25rem', opacity: 0.9, textTransform: 'uppercase', marginTop: '0.5rem' }}>Koppints a kezdéshez</span>
        </button>
      </main>

      <footer style={{ background: 'var(--dark)', padding: '1.5rem 2rem', display: 'flex', gap: '2rem', color: 'white' }}>
        <div className="card" style={{ flex: 2, background: 'rgba(255,255,255,0.1)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div>
            <span style={{ background: 'var(--accent)', color: 'var(--dark)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>ÚJ!</span>
            <h3 className="font-display" style={{ color: 'var(--accent)', margin: '0.5rem 0' }}>Napi Ajánlat: Olasz Pizza</h3>
            <p style={{ margin: 0, opacity: 0.8 }}>Próbálja ki új, fatüzelésű kemencében sült pizzáinkat extra sajttal!</p>
          </div>
        </div>
        
        <button 
          className="card" 
          style={{ flex: 1, background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', cursor: 'pointer' }} 
          onClick={() => navigate('/pincer')}
        >
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Segítség</div>
            <div style={{ fontSize: '0.8rem', opacity: 0.7, textTransform: 'uppercase' }}>Pincér hívása</div>
          </div>
          <span className="material-icons" style={{ fontSize: '3rem', color: 'var(--accent)' }}>help_outline</span>
        </button>
      </footer>
    </div>
  );
}