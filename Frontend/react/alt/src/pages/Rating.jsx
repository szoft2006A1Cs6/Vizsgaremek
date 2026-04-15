import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/Shared';

export default function Rating() {
  const navigate = useNavigate();

  const handleFinish = () => navigate('/');

  return (
    <div className="page-layout" style={{ background: 'var(--dark)' }}>
      <PageHeader title="Étterem Neve" theme="dark" />

      <main className="main-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="card" style={{ padding: '3rem', maxWidth: '500px', width: '100%', textAlign: 'center' }}>
          <span className="material-icons" style={{ fontSize: '4rem', color: 'var(--primary)', marginBottom: '1rem' }}>restaurant</span>
          <h2 className="font-display" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Hogy ízlett az étel?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Kérjük, értékelje a rendelését, hogy még jobb élményt nyújthassunk!</p>
            
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            {[1, 2, 3, 4].map(star => (
              <span key={star} className="material-icons" style={{ fontSize: '3rem', color: 'var(--accent)', cursor: 'pointer' }}>star</span>
            ))}
            <span className="material-icons" style={{ fontSize: '3rem', color: '#E5E7EB', cursor: 'pointer' }}>star</span>
          </div>

          <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Megjegyzés (Opcionális)</label>
            <textarea 
              rows="4" 
              placeholder="Írja meg véleményét..." 
              style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #E5E7EB', fontFamily: 'inherit', resize: 'none' }}
            />
          </div>

          <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', marginBottom: '1rem' }} onClick={handleFinish}>
            Értékelés Beküldése <span className="material-icons">send</span>
          </button>
            
          <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', textDecoration: 'underline', cursor: 'pointer' }} onClick={handleFinish}>
            Kihagyom az értékelést
          </button>
        </div>
      </main>
    </div>
  );
}