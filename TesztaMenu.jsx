import { useNavigate } from 'react-router-dom';
import { FloatingHelpBtn, PageHeader } from '../components/Shared';

const tesztak = [
  { name: 'Spaghetti Carbonara', desc:"" , badge: 'Klasszikus' },
  { name: 'Bolognai spagetti', desc: "", badge: 'Csípős' },
  { name: 'Penne Arrabiata', desc: '', badge: 'Szimpla'},
  { name: 'Lasagne', desc: '', badge: 'Extra sajtos'},
  { name: 'Tejszínes csirkés tészta', desc: '', badge: 'Csirkeimádó'}
];

export default function VeganMenu() {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader title="TESZTA" theme="light" />
      <main className="menu-main">
        <div className="menu-grid">
          {tesztak.map((pizza, index) => (
            <div key={index} className="menu-card" onClick={() => navigate('/customize')}>
              <div className="menu-img-wrapper">
                <div style={{width: '100%', height: '100%', backgroundColor: '#eee'}}></div> {/* Kép helye */}
              </div>
              <div className="menu-info">
                <h2 className="font-display">{teszta.name}</h2>
                <p>{teszta.desc}</p>
                {teszta.badge && (
                  <div style={{ marginTop: 'auto', textAlign: 'right' }}>
                    <span className="badge">{teszta.badge}</span>
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