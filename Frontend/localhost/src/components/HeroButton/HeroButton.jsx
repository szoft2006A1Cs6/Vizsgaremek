import './HeroButton.css';

export default function HeroButton({ onClick }) {
  return (
    <button className="card hero-btn" onClick={onClick}>
      <span className="material-icons hero-icon">touch_app</span>
      <span className="font-display hero-title">Rendelés Indítása</span>
      <span className="hero-subtitle">Koppints a kezdéshez</span>
    </button>
  );
}