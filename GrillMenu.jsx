import { useNavigate } from 'react-router-dom';
import { FloatingHelpBtn, PageHeader } from '../components/Shared';

const grillek = [
  { name: 'Grillezett csirkemell', desc:"" , badge: 'Klasszikus' },
  { name: 'Grill kolbász', desc: "", badge: 'Csípős' },
  { name: 'BBQ oldalas', desc: '', badge: 'Szimpla'},
  { name: 'Grill zöldségtál', desc: '', badge: 'Extra sajtos'},
  { name: 'Grill lazac', desc: '', badge: 'Csirkeimádó'}
];

export default function VeganMenu() {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader title="GRILL" theme="light" />
      <main className="menu-main">
        <div className="menu-grid">
          {grillek.map((pizza, index) => (
            <div key={index} className="menu-card" onClick={() => navigate('/customize')}>
              <div className="menu-img-wrapper">
                <div style={{width: '100%', height: '100%', backgroundColor: '#eee'}}></div> {/* Kép helye */}
              </div>
              <div className="menu-info">
                <h2 className="font-display">{grill.name}</h2>
                <p>{grill.desc}</p>
                {grill.badge && (
                  <div style={{ marginTop: 'auto', textAlign: 'right' }}>
                    <span className="badge">{grill.badge}</span>
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