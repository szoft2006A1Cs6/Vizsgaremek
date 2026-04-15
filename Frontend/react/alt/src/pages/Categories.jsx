import { useNavigate } from 'react-router-dom';
import { PageHeader, FloatingHelpBtn } from '../components/Shared';

const CATEGORIES = [
  { icon: 'local_pizza', name: 'Pizza', path: '/pizza' },
  { icon: 'lunch_dining', name: 'Burger', path: '/burger' },
  { icon: 'local_bar', name: 'Ital', path: '/ital' },
  { icon: 'icecream', name: 'Desszert', path: '/desszert' },
  { icon: 'eco', name: "Saláta", path: '/salata' },
  { icon: 'soup_kitchen', name: "Leves", path: '/leves'},
  { icon: 'ramen_dining', name: 'Tészta', path: '/teszta'},
  { icon: 'outdoor_grill', name: 'Grill', path: '/grill'},
  { icon: 'phishing', name: 'Hal', path: '/hal'},
  { icon: 'spa', name: 'Vegán', path: '/vegan'}
];

export default function Categories() {
  const navigate = useNavigate();

  return (
    <div className="page-layout">
      <PageHeader title="Étlap" />

      <main className="main-content">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          {CATEGORIES.map((cat, index) => (
            <button 
              key={index} 
              className="card" 
              style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', border: 'none', cursor: 'pointer', background: 'var(--accent-light)' }}
              onClick={() => navigate(cat.path)}
            >
              <span className="material-icons" style={{ fontSize: '3rem', color: 'var(--primary)' }}>
                {cat.icon || 'restaurant'}
              </span>
              <span className="font-display" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--dark)' }}>
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </main>
      
      <FloatingHelpBtn />
    </div>
  );
}