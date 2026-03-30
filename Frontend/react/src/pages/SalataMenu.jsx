import { useNavigate } from 'react-router-dom';
import { FloatingHelpBtn, PageHeader } from '../components/Shared';

const salatas = [
  { name: 'Cézár saláta', desc: '', badge: 'Cézár öntet' }, //desc-et átkell írogatni
  { name: 'Görög saláta', desc: '', badge: 'Feta sajt' },
  { name: 'Tonhalsaláta', desc: '', badge: 'Halas'},
  { name: 'Csirkés saláta', desc: '', badge: 'Csirkés'},
  { name: 'Vegán saláta', desc: '', badge: 'Vega'}
];

export default function SalataMenu() {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader title="SALÁTA" theme="light" />
      <main className="menu-main">
        <div className="menu-grid">
          {salatas.map((salata, index) => (
            <div key={index} className="menu-card" onClick={() => navigate('/customize')}>
              <div className="menu-img-wrapper">
                <div style={{width: '100%', height: '100%', backgroundColor: '#eee'}}></div> {/* Kép helye */}
              </div>
              <div className="menu-info">
                <h2 className="font-display">{salata.name}</h2>
                <p>{salata.desc}</p>
                {salata.badge && (
                  <div style={{ marginTop: 'auto', textAlign: 'right' }}>
                    <span className="badge">{salata.badge}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
      <FloatingHelpBtn />
    </>
  );
}