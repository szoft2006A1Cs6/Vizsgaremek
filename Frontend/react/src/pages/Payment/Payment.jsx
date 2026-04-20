import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/Shared/Shared';
import './Payment.css';

const API_BASE_URL = 'https://localhost:7235';

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [asztalSzam, setAsztalSzam] = useState(null);

  const [waiters, setWaiters] = useState([]);

  const cart = location.state?.cart || JSON.parse(localStorage.getItem('cart')) || [];
  const total = location.state?.total || cart.reduce((sum, item) => sum + (item.ar * item.quantity), 0);

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/categories');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      const payload = JSON.parse(jsonPayload);
      const nameClaim = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] 
                        || payload.name 
                        || payload.unique_name 
                        || "";
      
      const szam = nameClaim.replace(/\D/g, '');
      if (szam) setAsztalSzam(parseInt(szam, 10));
    } catch (error) {
      console.error("Token dekódolási hiba:", error);
    }

    const fetchWaiters = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/Pincer`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          const data = await response.json();
          setWaiters(data);
        }
      } catch (err) {
        console.error("Hiba a pincérek betöltésekor:", err);
      }
    };

    fetchWaiters();
  }, [cart, navigate]);

  const handlePayment = async (fizetesiMod) => {
    if (isProcessing) return;

    const veglegesAsztal = asztalSzam || 1;
    setIsProcessing(true);


    let randomPincerId = 1;
    
    if (waiters && waiters.length > 0) {
      const randomIndex = Math.floor(Math.random() * waiters.length);
      randomPincerId = waiters[randomIndex].pincerId; // Ha az azonosító máshogy van a modeledben (pl. 'id'), itt írd át!
    }

    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    const now = new Date();
    const localTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .substring(0, 19);

    try {
      const orderRes = await fetch(`${API_BASE_URL}/api/Rendeles`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          asztalId: veglegesAsztal,
          idopont: localTime,
          statusz: 0,
          pincerId: randomPincerId // Dinamikusan API-ból választott pincér ID-ja
        })
      });

      if (!orderRes.ok) throw new Error("Rendelés mentése sikertelen");
      const createdOrder = await orderRes.json();
      const newOrderId = createdOrder.rendelesId;

      const itemRequests = cart.map(item => 
        fetch(`${API_BASE_URL}/api/RendelesTetel`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            rendelesId: newOrderId,
            termekId: item.termekId,
            mennyiseg: item.quantity
          })
        })
      );

      const itemResponses = await Promise.all(itemRequests);
      if (itemResponses.some(res => !res.ok)) {
          throw new Error("Hiba történt a tételek mentésekor");
      }

      await fetch(`${API_BASE_URL}/api/PincerHivas`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          asztalId: veglegesAsztal,
          idopont: localTime,
          statusz: fizetesiMod 
        })
      });

      localStorage.removeItem('cart');
      navigate('/status', { state: { orderId: newOrderId } });

    } catch (err) {
      console.error(err);
      alert("Hiba történt a fizetési folyamat során. Kérjük, szóljon a pincérnek!");
      setIsProcessing(false);
    }
  };

  return (
    <div className="page-layout">
      <PageHeader title="Fizetés" />
      
      <main className="main-content payment-main">
        <section className="card payment-summary">
          <div className="summary-header">
            Rendelés Összesítése <span className="material-icons">shopping_cart</span>
          </div>
          
          <div className="summary-body">
            {cart.map((item, index) => (
              <div key={index} className="summary-item">
                <div className="summary-item-left">
                  <div className="summary-qty">{item.quantity}x</div>
                  <div>
                    <h3 className="summary-item-name">{item.termekNev}</h3>
                    {item.allergenek && (
                      <p className="summary-item-desc">Allergének: {item.allergenek}</p>
                    )}
                  </div>
                </div>
                <span className="summary-price">{item.ar * item.quantity} Ft</span>
              </div>
            ))}
          </div>
          
          <div className="summary-footer">
            <div className="summary-total-row">
              <span>FIZETENDŐ</span>
              <span className="summary-total-price">{total} Ft</span>
            </div>
          </div>
        </section>

        <section className="payment-methods-section">
          <h2 className="font-display">Válasszon fizetési módot</h2>
          
          <div className="payment-method-grid">
            <button 
              className="card payment-method-btn" 
              onClick={() => handlePayment('Bankkártyás Fizetés')}
              disabled={isProcessing}
              style={{ opacity: isProcessing ? 0.6 : 1 }}
            >
              <div className="method-icon-wrapper card-method">
                <span className="material-icons method-icon">credit_card</span>
              </div>
              <h3 className="font-display method-title">Bankkártyás</h3>
            </button>
            
            <button 
              className="card payment-method-btn" 
              onClick={() => handlePayment('Készpénzes Fizetés')}
              disabled={isProcessing}
              style={{ opacity: isProcessing ? 0.6 : 1 }}
            >
              <div className="method-icon-wrapper cash-method">
                <span className="material-icons method-icon">storefront</span>
              </div>
              <h3 className="font-display method-title">Készpénzes fizetés</h3>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}