import { useNavigate } from 'react-router-dom';
import { FloatingHelpBtn, PageHeader } from '../components/Shared';

const halak = [
  { name: 'Rántott hekk', desc:"" , badge: 'Klasszikus' },
  { name: 'Grillezett pisztráng', desc: "", badge: 'Csípős' },
  { name: 'Lazac steak', desc: '', badge: 'Szimpla'},
  { name: 'Harcsa paprikás', desc: '', badge: 'Extra sajtos'},
  { name: 'Tőkehal filé', desc: '', badge: 'Csirkeimádó'}
];

export default function HalMenu() {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader title="HALAK" theme="light" />
      <main className="menu-main">
        <div className="menu-grid">
          {halak.map((hal, index) => (
            <div key={index} className="menu-card" onClick={() => navigate('/customize')}>
              <div className="menu-img-wrapper">
                <div style={{width: '100%', height: '100%', backgroundColor: '#eee'}}></div> {/* Kép helye */}
              </div>
              <div className="menu-info">
                <h2 className="font-display">{hal.name}</h2>
                <p>{hal.desc}</p>
                {hal.badge && (
                  <div style={{ marginTop: 'auto', textAlign: 'right' }}>
                    <span className="badge">{hal.badge}</span>
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