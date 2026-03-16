import { useNavigate } from 'react-router-dom';
import { FloatingHelpBtn, PageHeader } from '../components/Shared';

const itals = [
  { name: 'Coca-Cola', badge: '0.5L' }, //desc-et átkell írogatni
  { name: 'Coca-Cola Zero', badge: '0.5L' },
  { name: 'Ásványvíz', badge: '0.5L'},
  { name: 'Narancslé', badge: '0.3L'},
  { name: 'Házi limonádé', badge: '0.5L'}
];

export default function ItalMenu() {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader title="ITAL" theme="light" />
      <main className="menu-main">
        <div className="menu-grid">
          {itals.map((ital, index) => (
            <div key={index} className="menu-card" onClick={() => navigate('/customize')}>
              <div className="menu-img-wrapper">
                <div style={{width: '100%', height: '100%', backgroundColor: '#eee'}}></div> {/* Kép helye */}
              </div>
              <div className="menu-info">
                <h2 className="font-display">{ital.name}</h2>
                <p>{ital.desc}</p>
                {ital.badge && (
                  <div style={{ marginTop: 'auto', textAlign: 'right' }}>
                    <span className="badge">{ital.badge}</span>
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