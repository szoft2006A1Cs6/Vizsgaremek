import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader'; // FRISSÍTVE
import FloatingHelpBtn from '../../components/FloatingHelpBtn/FloatingHelpBtn'; // FRISSÍTVE
import MenuItem from '../../components/MenuItem/MenuItem';
import Cart from '../../components/Cart/Cart';
import AfkTimeout from '../../components/AfkTimeout/AfkTimeout';
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
    // Ha valaki közvetlenül nyitja meg az URL-t kategória kiválasztása nélkül, visszadobjuk
    if (!categoryId) { navigate('/categories'); return; }
    
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${API_BASE_URL}/api/Termek`, { headers: { 'Authorization': `Bearer ${token}` } });
        if (response.ok) {
          const allProducts = await response.json();
          // Itt szűrjük ki, hogy csak a kiválasztott kategóriába tartozó ételek jelenjenek meg
          setProducts(allProducts.filter(p => p.eteltipusId === categoryId));
        } else { setError('Hiba a termékek betöltésekor.'); }
      } catch (err) { setError('Szerverhiba történt.'); }
      finally { setLoading(false); }
    };
    fetchProducts();
  }, [categoryId, navigate]);

  // Étel kosárba helyezésének és a localStorage kezelésének logikája
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Ellenőrizzük, hogy az adott termék szerepel-e már a kosárban
    const existing = cart.find(item => item.termekId === product.termekId);
    if (existing) { 
      existing.quantity += 1; // Ha igen, csak a darabszámot növeljük
    } else { 
      cart.push({ ...product, quantity: 1 }); // Ha nem, új tételként adjuk hozzá 1 darabbal
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    setRefreshCart(prev => prev + 1);
  };

  return (
    <div className="page-layout">
      <AfkTimeout timeoutMinutes={5} countdownSeconds={60} />
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