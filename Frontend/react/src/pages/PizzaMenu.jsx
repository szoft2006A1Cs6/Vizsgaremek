import { useNavigate } from 'react-router-dom';
import { FloatingHelpBtn, PageHeader } from '../components/Shared';

const pizzas = [
  { name: 'Margherita', desc: 'Paradicsomszósz, mozzarella sajt, friss bazsalikom', badge: 'Klasszikus' },
  { name: 'Pepperoni', desc: 'Paradicsomszósz, mozzarella, fűszeres szalámi', badge: 'Csípős' },
  { name: 'Sonkás-Gombás', desc: 'Paradicsomszósz, mozzarella, sonka, gomba', badge: 'Szimpla'},
  { name: 'Négysajtos', desc: 'Paradicsomszósz, mozarella, parmezán, gorgonzola, ricotta', badge: 'Extra sajtos'},
  { name: 'BBQ csirkés', desc: 'Paradicsomszósz, BBQ szósz, mozarella, csirkemell', badge: 'Csirkeimádó'}
];

export default function PizzaMenu() {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader title="PIZZA" theme="light" />
      <main className="menu-main">
        <div className="menu-grid">
          {pizzas.map((pizza, index) => (
            <div key={index} className="menu-card" onClick={() => navigate('/customize')}>
              <div className="menu-img-wrapper">
                <div style={{width: '100%', height: '100%', backgroundColor: '#eee'}}></div> {/* Kép helye */}
              </div>
              <div className="menu-info">
                <h2 className="font-display">{pizza.name}</h2>
                <p>{pizza.desc}</p>
                {pizza.badge && (
                  <div style={{ marginTop: 'auto', textAlign: 'right' }}>
                    <span className="badge">{pizza.badge}</span>
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