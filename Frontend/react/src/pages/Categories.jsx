import { useNavigate } from 'react-router-dom';
import { FloatingHelpBtn } from '../components/Shared';

const categories = [
  { icon: 'local_pizza', name: 'Pizza', path: '/pizza' },
  { icon: 'lunch_dining', name: 'Burger', path: '/burger' }, // Csak a pizza van kidolgozva
  { icon: 'local_bar', name: 'Ital', path: '/ital' },
  { icon: 'icecream', name: 'Desszert', path: '/desszert' },
  { name: "Saláta", path: '/salata' },
  { name: "Leves", path: '/leves'},
  { name: 'Tészta', path: '/teszta'},
  { name: 'Grill', path: '/grill'},
  { name: 'Hal', path: '/hal'},
  { name: 'Vegán', path: '/vegan'},

];

export default function Categories() {
  const navigate = useNavigate();

  return (
    <>
      <header className="page-header">
        <button className="back-btn brown" onClick={() => navigate('/')}>
          <span className="material-icons">arrow_back</span> Vissza
        </button>
      </header>

      <main className="categories-main">
        <div className="page-title-box">
          <h1 className="font-display">Étlap</h1>
        </div>

        <div className="category-grid">
          {categories.map((cat, index) => (
            <button key={index} className="category-card" onClick={() => navigate(cat.path)}>
              <div className="category-content">
                <span className="material-icons">{cat.icon}</span>
                <span>{cat.name}</span>
              </div>
            </button>
          ))}
        </div>
      </main>
      <FloatingHelpBtn />
    </>
  );
}