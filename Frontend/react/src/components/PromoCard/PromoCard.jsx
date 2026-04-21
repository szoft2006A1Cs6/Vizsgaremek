import './PromoCard.css';

export default function PromoCard() {
  return (
    <div className="card promo-card">
      <div>
        <span className="promo-badge">ÚJ!</span>
        <h3 className="font-display promo-title">Napi Ajánlat: Olasz Pizza</h3>
        <p className="promo-desc">Próbálja ki új, fatüzelésű kemencében sült pizzáinkat extra sajttal!</p>
      </div>
    </div>
  );
}