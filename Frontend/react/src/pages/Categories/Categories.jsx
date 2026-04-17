import { useNavigate } from 'react-router-dom';
import { PageHeader, FloatingHelpBtn } from '../../components/Shared';
import './Categories.css'

const CATEGORIES = [
  { icon: 'local_pizza', name: 'Pizza', path: '/menu' },
  { icon: 'lunch_dining', name: 'Burger', path: '/menu' },
  { icon: 'local_bar', name: 'Ital', path: '/menu' },
  { icon: 'icecream', name: 'Desszert', path: '/menu' },
  { icon: 'eco', name: "Saláta", path: '/menu' },
  { icon: 'soup_kitchen', name: "Leves", path: '/menu'},
  { icon: 'ramen_dining', name: 'Tészta', path: '/menu'},
  { icon: 'outdoor_grill', name: 'Grill', path: '/menu'},
  { icon: 'phishing', name: 'Hal', path: '/menu'},
  { icon: 'spa', name: 'Vegán', path: '/menu'}
];

export default function Categories() {
  const navigate = useNavigate();

  return (
    <div className="page-layout">
      <PageHeader title="Étlap" />

      <main className="main-content">
        <div className="category-grid">
          {CATEGORIES.map((cat, index) => (
            <button 
              key={index} 
              className="card category-card" 
              onClick={() => navigate(cat.path)}
            >
              <span className="material-icons category-icon">
                {cat.icon || 'restaurant'}
              </span>
              <span className="font-display category-name">
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