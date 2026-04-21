import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader'; // FRISSÍTVE
import FloatingHelpBtn from '../../components/FloatingHelpBtn/FloatingHelpBtn'; // FRISSÍTVE
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import Cart from '../../components/Cart/Cart';
import AfkTimeout from '../../components/AfkTimeout/AfkTimeout';
import './Categories.css';

const API_BASE_URL = 'https://localhost:7235';

export default function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem('token');
      if (!token) { navigate('/'); return; }
      try {
        const response = await fetch(`${API_BASE_URL}/api/EtelTipus`, { headers: { 'Authorization': `Bearer ${token}` }});
        if (response.ok) { setCategories(await response.json()); } 
        else { setError('Nem sikerült betölteni a kategóriákat.'); }
      } catch (err) { setError('Hiba a szerverrel való kapcsolat során.'); } 
      finally { setLoading(false); }
    };
    fetchCategories();
  }, [navigate]);

  return (
    <div className="page-layout">
      <AfkTimeout timeoutMinutes={5} countdownSeconds={60} />
      <PageHeader title="Étlap" showBackButton={false} />
      <div className="kds-layout">
        <main className="main-content">
          {error && <div className="error-msg">{error}</div>}
          {loading ? (
            <div className="loading-msg">Kategóriák betöltése...</div>
          ) : (
            <div className="category-grid">
              {categories.map((cat) => (
                <CategoryCard 
                  key={cat.eteltipusId} category={cat} 
                  onClick={() => navigate('/menu', { state: { categoryId: cat.eteltipusId, categoryName: cat.tipusNev } })}
                />
              ))}
            </div>
          )}
        </main>
        <Cart />
      </div>
      <FloatingHelpBtn />
    </div>
  );
}