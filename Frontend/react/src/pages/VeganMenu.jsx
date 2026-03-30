import { useNavigate } from 'react-router-dom';
import { FloatingHelpBtn, PageHeader } from '../components/Shared';

const veganok = [
  { name: 'Vegán Buddha tál', desc:"" , badge: 'Klasszikus' },
  { name: 'Vegán curry', desc: "", badge: 'Csípős' },
  { name: 'Falafel tál', desc: '', badge: 'Szimpla'},
  { name: 'Vegán wrap', desc: '', badge: 'Extra sajtos'},
  { name: 'Sült zöldségek hummusszal', desc: '', badge: 'Csirkeimádó'}
];

export default function VeganMenu() {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader title="VEGAN" theme="light" />
      <main className="menu-main">
        <div className="menu-grid">
          {veganok.map((vegan, index) => (
            <div key={index} className="menu-card" onClick={() => navigate('/customize')}>
              <div className="menu-img-wrapper">
                <div style={{width: '100%', height: '100%', backgroundColor: '#eee'}}></div> {/* Kép helye */}
              </div>
              <div className="menu-info">
                <h2 className="font-display">{vegan.name}</h2>
                <p>{vegan.desc}</p>
                {vegan.badge && (
                  <div style={{ marginTop: 'auto', textAlign: 'right' }}>
                    <span className="badge">{vegan.badge}</span>
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