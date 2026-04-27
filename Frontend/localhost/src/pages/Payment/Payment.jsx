import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import PaymentSummary from '../../components/PaymentSummary/PaymentSummary';
import PaymentMethods from '../../components/PaymentMethods/PaymentMethods';
import AfkTimeout from '../../components/AfkTimeout/AfkTimeout';
import './Payment.css';

const API_BASE_URL = 'https://localhost:7235';

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [asztalSzam, setAsztalSzam] = useState(null);
  const [waiters, setWaiters] = useState([]);

  // Kosár tartalmának és a végösszegnek a betöltése (először a navigációs state-ből, ha nincs ilyen, akkor a localStorage-ből)
  const cart = location.state?.cart || JSON.parse(localStorage.getItem('cart')) || [];
  const total = location.state?.total || cart.reduce((sum, item) => sum + (item.ar * item.quantity), 0);

  useEffect(() => {
    if (cart.length === 0) { navigate('/categories'); return; }
    const token = localStorage.getItem('token');
    if (!token) { navigate('/'); return; }

    try {
      // Token visszafejtése, hogy kinyerjük az asztalszámot
      const payload = JSON.parse(atob(token.split('.')[1]));
      const szam = (payload.name || payload.unique_name || "").replace(/\D/g, '');
      if (szam) setAsztalSzam(parseInt(szam, 10));
    } catch (error) { }

    // Elérhető pincérek lekérése a rendeléshez való hozzárendeléshez
    fetch(`${API_BASE_URL}/api/Pincer`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => res.json()).then(data => setWaiters(data)).catch(console.error);
  }, [cart, navigate]);

  const handlePayment = async (fizetesiMod) => {
    if (isProcessing) return;
    setIsProcessing(true); // Gomb letiltása, hogy elkerüljük a dupla fizetést

    let assignedPincerId = 0;

    // Véletlenszerűen kiválasztunk egy éppen dolgozó pincért
    if (waiters && waiters.length > 0) {
      const activeWaiters = waiters.filter(w => w.munka === 1);

      if (activeWaiters.length > 0) {
        const randomIndex = Math.floor(Math.random() * activeWaiters.length);
        assignedPincerId = activeWaiters[randomIndex].pincerId;
      }
    }

    const token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
    const localTime = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().substring(0, 19);

    try {
      // A fő rendelés létrehozása az adatbázisban
      const orderRes = await fetch(`${API_BASE_URL}/api/Rendeles`, {
        method: 'POST', headers,
        body: JSON.stringify({
          asztalId: asztalSzam || 1,
          idopont: localTime,
          statusz: 0,
          pincerId: assignedPincerId
        })
      });
      if (!orderRes.ok) throw new Error("Rendelés mentése sikertelen");
      const newOrderId = (await orderRes.json()).rendelesId;

      // A kosárban lévő tételek elküldése egyenként, a kapott rendelés ID-jához csatolva
      await Promise.all(cart.map(item => fetch(`${API_BASE_URL}/api/RendelesTetel`, {
        method: 'POST', headers,
        body: JSON.stringify({ rendelesId: newOrderId, termekId: item.termekId, mennyiseg: item.quantity })
      })));

      // Pincér hívása a választott fizetési móddal
      await fetch(`${API_BASE_URL}/api/PincerHivas`, {
        method: 'POST', headers,
        body: JSON.stringify({ asztalId: asztalSzam || 1, idopont: localTime, statusz: fizetesiMod })
      });

      // Sikeres rendelés után localStorage ürítése és átirányítás a státusz oldalra
      localStorage.removeItem('cart');
      navigate('/status', { state: { orderId: newOrderId }, replace: true });
    } catch (err) {
      alert("Hiba történt a fizetési folyamat során.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="page-layout">
      <AfkTimeout timeoutMinutes={5} countdownSeconds={60} />
      <PageHeader title="Fizetés" />
      <main className="main-content payment-main">
        <PaymentSummary cart={cart} total={total} />
        <PaymentMethods isProcessing={isProcessing} onSelectMethod={handlePayment} />
      </main>
    </div>
  );
}