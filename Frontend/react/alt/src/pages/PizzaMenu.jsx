import { useNavigate } from 'react-router-dom';
import { FloatingHelpBtn, PageHeader } from '../components/Shared';

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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {PIZZAS.map((pizza, index) => (
            <div 
              key={index} 
              className="card" 
              style={{ display: 'flex', cursor: 'pointer', padding: '1rem', gap: '1rem', alignItems: 'center' }} 
              onClick={() => navigate('/payment')}
            >
              <div style={{ width: '100px', height: '100px', backgroundColor: 'var(--accent-light)', borderRadius: 'var(--radius-md)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-icons" style={{ color: 'var(--accent)', fontSize: '3rem' }}>local_pizza</span>
              </div>
              
              <div style={{ flexGrow: 1 }}>
                <h2 className="font-display" style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{pizza.name}</h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem', lineHeight: 1.4 }}>{pizza.desc}</p>
                {pizza.badge && (
                  <span style={{ background: 'var(--primary)', color: 'white', fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 'bold' }}>
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