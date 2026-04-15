import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/Shared';

export default function Status() {
  const navigate = useNavigate();

  const TableInfo = (
    <div style={{ background: 'var(--accent)', color: 'var(--dark)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', fontWeight: 'bold' }}>
      ASZTAL: 12
    </div>
  );

  return (
    <div className="page-layout">
      <PageHeader title="Rendelés Állapota" theme="dark" rightContent={TableInfo} />

      <main className="main-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px' }}>
        
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Rendelésszám: #8492</p>
          <h2 className="font-display" style={{ color: 'var(--dark)', fontSize: '2.5rem', margin: 0 }}>Rendelésed készül!</h2>
        </div>

        <div className="card" style={{ padding: '3rem 2rem' }}>
          
          <div className="status-tracker">
            <div className="progress-bar-bg"></div>
            <div className="progress-bar-fill" style={{ width: '35%' }}></div>
            
            <div className="steps-container">
              <div className="step-item completed">
                <div className="step-icon"><span className="material-icons">receipt_long</span></div>
                <span className="step-label">Leadva</span>
              </div>
              
              <div className="step-item completed">
                <div className="step-icon"><span className="material-icons">kitchen</span></div>
                <span className="step-label">Készül</span>
              </div>
              
              <div className="step-item active">
                <div className="step-icon"><span className="material-icons">restaurant</span></div>
                <span className="step-label">Tálalás</span>
              </div>

              <div className="step-item">
                <div className="step-icon"><span className="material-icons">check_circle</span></div>
                <span className="step-label">Kész</span>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--accent-light)', padding: '1.5rem', borderRadius: 'var(--radius-md)', textAlign: 'center', marginTop: '3rem' }}>
            <p style={{ textTransform: 'uppercase', color: 'var(--dark)', fontWeight: 'bold', margin: '0 0 0.5rem 0', opacity: 0.8 }}>
              Becsült várakozási idő
            </p>
            <div style={{ fontSize: '3rem', color: 'var(--primary)', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', fontFamily: "'Playfair Display', serif" }}>
              <span className="material-icons" style={{ fontSize: 'inherit' }}>schedule</span> ~12 PERC
            </div>
          </div>

        </div>

        <div className="card" style={{ padding: '2rem' }}>
          <h3 className="font-display" style={{ borderBottom: '2px solid var(--bg-color)', paddingBottom: '1rem', marginBottom: '1rem', marginTop: 0 }}>
            Rendelés Részletei
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem' }}>
              <span>1x Pizza Margherita (32cm)</span> <b>2 490 Ft</b>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem' }}>
              <span>2x Coca Cola (0.5L)</span> <b>1 180 Ft</b>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem' }}>
              <span>1x Görög Saláta</span> <b>1 890 Ft</b>
            </li>
          </ul>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1rem', borderTop: '2px dashed var(--text-muted)', fontSize: '1.5rem', fontWeight: 'bold' }}>
            <span style={{ color: 'var(--text-muted)', textTransform: 'uppercase' }}>Összesen</span>
            <span className="font-display" style={{ color: 'var(--primary)' }}>5 560 Ft</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline" style={{ flex: 1, padding: '1.5rem' }} onClick={() => navigate('/rating')}>
            <span className="material-icons">room_service</span> Pincér hívása
          </button>
        </div>
      </main>
    </div>
  );
}