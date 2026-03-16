import { useNavigate } from 'react-router-dom';
import { FloatingHelpBtn, PageHeader } from '../components/Shared';

const burgers = [
  { name: 'Sajtburger', desc: 'Paradicsomszósz, mozzarella sajt, friss bazsalikom', badge: 'Sajtos' }, //desc-et átkell írogatni
  { name: 'Dupla burger', desc: 'Paradicsomszósz, mozzarella, fűszeres szalámi', badge: 'Dupla húsos' },
  { name: 'Bacon burger', desc: 'Paradicsomszósz, mozzarella, sonka, gomba', badge: 'Baconnel extrázott'},
  { name: 'Csirke burger', desc: 'Paradicsomszósz, mozarella, parmezán, gorgonzola, ricotta', badge: 'Csirkeimádó'},
  { name: 'Vegán burger', desc: 'Paradicsomszósz, BBQ szósz, mozarella, csirkemell', badge: 'Zöldség'}
];

export default function BurgerMenu() {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader title="BURGER" theme="light" />
      <main className="menu-main">
        <div className="menu-grid">
          {burgers.map((burger, index) => (
            <div key={index} className="menu-card" onClick={() => navigate('/customize')}>
              <div className="menu-img-wrapper">
                <div style={{width: '100%', height: '100%', backgroundColor: '#eee'}}></div> {/* Kép helye */}
              </div>
              <div className="menu-info">
                <h2 className="font-display">{burger.name}</h2>
                <p>{burger.desc}</p>
                {burger.badge && (
                  <div style={{ marginTop: 'auto', textAlign: 'right' }}>
                    <span className="badge">{burger.badge}</span>
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