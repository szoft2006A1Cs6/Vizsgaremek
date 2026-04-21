import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FloatingHelpBtn, PageHeader } from '../../components/Shared/Shared';
import MenuItem from '../../components/MenuItem/MenuItem';
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
    if (!categoryId) { navigate('/categories'); return; }
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${API_BASE_URL}/api/Termek`, { headers: { 'Authorization': `Bearer ${token}` }});
        if (response.ok) {
          const allProducts = await response.json();
          setProducts(allProducts.filter(p => p.eteltipusId === categoryId));
        } else { setError('Hiba a termékek betöltésekor.'); }
      } catch (err) { setError('Szerverhiba történt.'); } 
      finally { setLoading(false); }
    };
    fetchProducts();
  }, [categoryId, navigate]);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.termekId === product.termekId);
    if (existing) { existing.quantity += 1; } else { cart.push({ ...product, quantity: 1 }); }
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
                <MenuItem key={product.termekId} product={product} onAdd={() => addToCart(product)} />
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