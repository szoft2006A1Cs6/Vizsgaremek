import { useNavigate } from 'react-router-dom';
import { FloatingHelpBtn, PageHeader } from '../../components/Shared';

const PIZZAS = [
  { name: 'Margherita', desc: 'Paradicsomszósz, mozzarella sajt, friss bazsalikom', badge: 'Klasszikus' },
  { name: 'Pepperoni', desc: 'Paradicsomszósz, mozzarella, fűszeres szalámi', badge: 'Csípős' },
  { name: 'Sonkás-Gombás', desc: 'Paradicsomszósz, mozzarella, sonka, gomba', badge: ''},
  { name: 'Négysajtos', desc: 'Paradicsomszósz, mozarella, parmezán, gorgonzola, ricotta', badge: 'Extra sajtos'},
  { name: 'BBQ csirkés', desc: 'Paradicsomszósz, BBQ szósz, mozarella, csirkemell', badge: 'Csirkeimádó'}
];

export default function PizzaMenu() {
  const navigate = useNavigate();

  return (
    <div className="page-layout">
      <PageHeader title="Pizzák" />
      
      <main className="main-content">
        <div className="menu-grid">
          {PIZZAS.map((pizza, index) => (
            <div 
              key={index} 
              className="card menu-item-card" 
              onClick={() => navigate('/payment')}
            >
              <div className="menu-item-img-wrapper">
                <span className="material-icons menu-item-icon">local_pizza</span>
              </div>
              
              <div className="menu-item-info">
                <h2 className="font-display menu-item-title">{pizza.name}</h2>
                <p className="menu-item-desc">{pizza.desc}</p>
                {pizza.badge && (
                  <span className="menu-item-badge">
                    {pizza.badge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <FloatingHelpBtn />
    </div>
  );
}