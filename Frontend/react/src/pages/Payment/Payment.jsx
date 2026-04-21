import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader'; // FRISSÍTVE
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

  const cart = location.state?.cart || JSON.parse(localStorage.getItem('cart')) || [];
  const total = location.state?.total || cart.reduce((sum, item) => sum + (item.ar * item.quantity), 0);

  useEffect(() => {
    if (cart.length === 0) { navigate('/categories'); return; }
    const token = localStorage.getItem('token');
    if (!token) { navigate('/'); return; }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const szam = (payload.name || payload.unique_name || "").replace(/\D/g, '');
      if (szam) setAsztalSzam(parseInt(szam, 10));
    } catch (error) {}

    fetch(`${API_BASE_URL}/api/Pincer`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => res.json()).then(data => setWaiters(data)).catch(console.error);
  }, [cart, navigate]);

  const handlePayment = async (fizetesiMod) => {
    if (isProcessing) return;
    setIsProcessing(true);
    let randomPincerId = 1;
    if (waiters && waiters.length > 0) randomPincerId = waiters[Math.floor(Math.random() * waiters.length)].pincerId;

    const token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
    const localTime = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().substring(0, 19);

    try {
      const orderRes = await fetch(`${API_BASE_URL}/api/Rendeles`, {
        method: 'POST', headers,
        body: JSON.stringify({ asztalId: asztalSzam || 1, idopont: localTime, statusz: 0, pincerId: randomPincerId })
      });
      if (!orderRes.ok) throw new Error("Rendelés mentése sikertelen");
      const newOrderId = (await orderRes.json()).rendelesId;

      await Promise.all(cart.map(item => fetch(`${API_BASE_URL}/api/RendelesTetel`, {
        method: 'POST', headers,
        body: JSON.stringify({ rendelesId: newOrderId, termekId: item.termekId, mennyiseg: item.quantity })
      })));

      await fetch(`${API_BASE_URL}/api/PincerHivas`, {
        method: 'POST', headers,
        body: JSON.stringify({ asztalId: asztalSzam || 1, idopont: localTime, statusz: fizetesiMod })
      });

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