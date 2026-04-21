import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, FloatingHelpBtn } from '../../components/Shared/Shared';
import Cart from '../../components/Cart/Cart';
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
      
      if (!token) {
        navigate('/');
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/EtelTipus`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          setError('Nem sikerült betölteni a kategóriákat.');
        }
      } catch (err) {
        console.error("API Hiba:", err);
        setError('Hiba a szerverrel való kapcsolat során.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [navigate]);

  return (
    <div className="page-layout">
      <PageHeader title="Étlap" showBackButton={false} />

      <div className="kds-layout">
        <main className="main-content">
          {error && <div className="error-msg">{error}</div>}
          
          {loading ? (
            <div className="loading-msg">Kategóriák betöltése...</div>
          ) : (
            <div className="category-grid">
              {categories.map((cat) => (
                <button 
                  key={cat.eteltipusId} 
                  className="card category-card" 
                  onClick={() => navigate('/menu', { 
                    state: { 
                      categoryId: cat.eteltipusId, 
                      categoryName: cat.tipusNev 
                    } 
                  })}
                >
                  <span className="font-display category-name">
                    {cat.tipusNev}
                  </span>
                </button>
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