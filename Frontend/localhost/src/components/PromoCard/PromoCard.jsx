import './PromoCard.css';

export default function PromoCard({ dish, onClick }) {
  if (!dish) {
    return (
      <div className="card promo-card">
        <div>
          <span className="promo-badge">AJÁNLATUNK</span>
          <h3 className="font-display promo-title">Gusto Bistro</h3>
          <p className="promo-desc">Folyamatosan frissülő kínálattal várjuk vendégeinket.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card promo-card clickable" onClick={onClick}>
      <div key={dish.termekId} className="promo-content fade-in">
        <span className="promo-badge">
          {dish.featured === 1 || dish.featured === true ? 'NAPI AJÁNLAT' : 'KÍNÁLATUNKBÓL'}
        </span>
        <h3 className="font-display promo-title">{dish.termekNev}</h3>
        <p className="promo-desc">
          Kóstolja meg különlegességünket csak <strong>{dish.ar} Ft</strong>-ért!
        </p>
      </div>
    </div>
  );
}