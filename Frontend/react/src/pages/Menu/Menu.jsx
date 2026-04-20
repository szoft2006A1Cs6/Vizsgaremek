import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FloatingHelpBtn, PageHeader } from '../../components/Shared/Shared';
import Cart from '../../components/Cart/Cart';
import './Menu.css';

const API_BASE_URL = 'https://localhost:7235';

export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshCart, setRefreshCart] = useState(0);

  const { categoryId, categoryName } = location.state || { categoryId: null, categoryName: 'Termékek' };

  useEffect(() => {
    if (!categoryId) {
      navigate('/categories');
      return;
    }

    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${API_BASE_URL}/api/Termek`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const allProducts = await response.json();
          const filtered = allProducts.filter(p => p.eteltipusId === categoryId);
          setProducts(filtered);
        } else {
          setError('Hiba a termékek betöltésekor.');
        }
      } catch (err) {
        setError('Szerverhiba történt.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, navigate]);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.termekId === product.termekId);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setRefreshCart(prev => prev + 1);
  };

  return (
    <div className="page-layout">
      <PageHeader title={categoryName} />
      
      <div className="kds-layout">
        <main className="main-content">
          {error && <div className="error-msg">{error}</div>}

          {loading ? (
            <div className="loading-msg">Termékek betöltése...</div>
          ) : (
            <div className="menu-grid">
              {products.map((product) => (
                <div 
                  key={product.termekId} 
                  className="card menu-item-card" 
                  onClick={() => addToCart(product)}
                >
                  <div className="menu-item-img-wrapper">
                    <span className="material-icons menu-item-icon">restaurant</span>
                  </div>
                  
                  <div className="menu-item-info">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h2 
                        className="font-display menu-item-title" 
                        style={{ 
                          hyphens: 'auto', 
                          WebkitHyphens: 'auto', 
                          margin: 0,
                          wordBreak: 'break-word' 
                        }}
                      >
                        {product.termekNev}
                      </h2>
                      <span style={{ 
                        fontWeight: 'bold', 
                        color: 'var(--primary)', 
                        fontSize: '1.2rem', 
                        whiteSpace: 'nowrap', 
                        marginLeft: '1rem',
                        flexShrink: 0 
                      }}>
                        {product.ar} Ft
                      </span>
                    </div>
                    
                    <p className="menu-item-desc"></p>
                    
                    {product.allergenek && (
                      <span className="menu-item-badge" style={{ background: 'var(--dark)', color: 'white' }}>
                        Allergének: {product.allergenek}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        <Cart refreshTrigger={refreshCart} />
      </div>
      
      <FloatingHelpBtn />
    </div>
  );
}