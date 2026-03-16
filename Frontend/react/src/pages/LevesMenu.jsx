import { useNavigate } from 'react-router-dom';
import { FloatingHelpBtn, PageHeader } from '../components/Shared';

const levesek = [
  { name: 'Gulyásleves', desc: '', badge: 'Csípős' }, //desc-et átkell írogatni
  { name: 'Húsleves', desc: '', badge: 'Tésztával' },
  { name: 'Paradicsomleves', desc: '', badge: 'Betü tészta'},
  { name: 'Brokkolikrémleves', desc: '', badge: 'Pírított kenyér'},
  { name: 'Halászlé', desc: '', badge: 'Vekni'},
];

export default function LevesMenu() {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader title="LEVES" theme="light" />
      <main className="menu-main">
        <div className="menu-grid">
          {levesek.map((leves, index) => (
            <div key={index} className="menu-card" onClick={() => navigate('/customize')}>
              <div className="menu-img-wrapper">
                <div style={{width: '100%', height: '100%', backgroundColor: '#eee'}}></div> {/* Kép helye */}
              </div>
              <div className="menu-info">
                <h2 className="font-display">{leves.name}</h2>
                <p>{leves.desc}</p>
                {leves.badge && (
                  <div style={{ marginTop: 'auto', textAlign: 'right' }}>
                    <span className="badge">{leves.badge}</span>
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