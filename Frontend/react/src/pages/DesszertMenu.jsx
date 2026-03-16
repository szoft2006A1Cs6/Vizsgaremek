import { useNavigate } from 'react-router-dom';
import { FloatingHelpBtn, PageHeader } from '../components/Shared';

const desszerts = [
  { name: 'Csokoládétorta', desc: '', badge: 'Gyümölcsel' }, //desc-et átkell írogatni
  { name: 'Somlói galuska', desc: '', badge: 'Vaníliás' },
  { name: 'Palacsinta', desc: '', badge: 'Nutellás*'},
  { name: 'Sajttorta', desc: '', badge: 'Epres'},
  { name: 'Brownie', desc: '', badge: 'Csokis'}
];

export default function DesszertMenu() {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader title="DESSZERT" theme="light" />
      <main className="menu-main">
        <div className="menu-grid">
          {desszerts.map((desszert, index) => (
            <div key={index} className="menu-card" onClick={() => navigate('/customize')}>
              <div className="menu-img-wrapper">
                <div style={{width: '100%', height: '100%', backgroundColor: '#eee'}}></div> {/* Kép helye */}
              </div>
              <div className="menu-info">
                <h2 className="font-display">{desszert.name}</h2>
                <p>{desszert.desc}</p>
                {desszert.badge && (
                  <div style={{ marginTop: 'auto', textAlign: 'right' }}>
                    <span className="badge">{desszert.badge}</span>
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