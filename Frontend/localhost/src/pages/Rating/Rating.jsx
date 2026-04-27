import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import RatingStars from '../../components/RatingStars/RatingStars';
import AfkTimeout from '../../components/AfkTimeout/AfkTimeout';
import './Rating.css';

const API_BASE_URL = 'https://localhost:7235';

export default function Rating() {
  const navigate = useNavigate();
  const location = useLocation();
  // Rendelés azonosítójának lekérése a navigációs állapotból, vagy ha az nincs, akkor a localStorage-ból
  const orderId = location.state?.orderId || localStorage.getItem('lastOrderId');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Értékelési folyamat lezárása
  const handleFinish = () => {
    localStorage.removeItem('lastOrderId');
    navigate('/home');
  };

  const handleSubmit = async () => {
    if (rating === 0) { alert("Kérjük, válasszon ki legalább egy csillagot az értékeléshez!"); return; }
    if (!orderId) { handleFinish(); return; }

    setIsSubmitting(true);
    const token = localStorage.getItem('token');
    
    // Helyi idő generálása az adatbázis számára
    const localTime = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().substring(0, 19);

    try {
      // Értékelés elküldése az API-nak
      await fetch(`${API_BASE_URL}/api/Ertekeles`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ rendelesId: parseInt(orderId, 10), pontszam: rating, idopont: localTime })
      });
    } catch (err) { }
    finally { 
      // Sikeres küldés és hiba esetén is továbbengedjük a felhasználót
      handleFinish(); 
    }
  };

  return (
    <div className="page-layout bg-dark">
      <AfkTimeout timeoutMinutes={5} countdownSeconds={60} />
      <PageHeader title="Gusto Bistro" theme="dark" showBackButton={false} />
      <main className="main-content flex-center">
        <div className="card rating-container">
          <span className="material-icons rating-top-icon">restaurant</span>
          <h2 className="font-display rating-title">Hogy ízlett az étel?</h2>
          <p className="rating-subtitle">Kérjük, értékelje a rendelését egy kattintással, hogy még jobb élményt nyújthassunk!</p>

          <RatingStars rating={rating} setRating={setRating} />

          <button
            className="btn btn-primary rating-submit-btn"
            onClick={handleSubmit} disabled={isSubmitting || rating === 0}
            style={{ opacity: (isSubmitting || rating === 0) ? 0.5 : 1 }}
          >
            {isSubmitting ? 'Küldés...' : 'Értékelés Beküldése'} <span className="material-icons">send</span>
          </button>
          <button className="rating-skip-btn" onClick={handleFinish} disabled={isSubmitting}>
            Kihagyom az értékelést
          </button>
        </div>
      </main>
    </div>
  );
}