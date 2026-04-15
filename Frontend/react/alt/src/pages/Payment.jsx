import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/Shared';

export default function Payment() {
  const navigate = useNavigate();

  return (
    <div className="page-layout">
      <PageHeader title="Fizetés" />
      
      <main className="main-content" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        
        <section className="card" style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: 'var(--dark)', color: 'white', padding: '1rem 1.5rem', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
            Rendelés Összesítése <span className="material-icons">shopping_cart</span>
          </div>
          
          <div style={{ padding: '1.5rem', flexGrow: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ background: 'var(--accent-light)', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontWeight: 'bold' }}>1x</div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1rem' }}>Pizza Margherita</h3>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>+ Extra sajt, 32 cm</p>
                </div>
              </div>
              <span style={{ fontWeight: 'bold' }}>2 490 Ft</span>
            </div>
          </div>
          
          <div style={{ background: 'var(--bg-color)', padding: '1.5rem', borderTop: '1px solid #eee' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', fontSize: '1.25rem' }}>
              <span>FIZETENDŐ</span>
              <span style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>7 491 Ft</span>
            </div>
          </div>
        </section>

        <section style={{ flex: '2 1 400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h2 className="font-display">Válasszon fizetési módot</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <button className="card" style={{ padding: '3rem 2rem', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }} onClick={() => navigate('/status')}>
              <div style={{ background: 'var(--accent-light)', color: 'var(--primary)', padding: '1.5rem', borderRadius: '50%' }}>
                <span className="material-icons" style={{ fontSize: '3rem' }}>credit_card</span>
              </div>
              <h3 className="font-display" style={{ margin: 0 }}>Bankkártyás</h3>
            </button>
            
            <button className="card" style={{ padding: '3rem 2rem', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }} onClick={() => navigate('/status')}>
              <div style={{ background: 'var(--bg-color)', color: 'var(--accent)', padding: '1.5rem', borderRadius: '50%' }}>
                <span className="material-icons" style={{ fontSize: '3rem' }}>storefront</span>
              </div>
              <h3 className="font-display" style={{ margin: 0 }}>Fizetés a pultnál</h3>
            </button>
          </div>
        </section>
        
      </main>
    </div>
  );
}