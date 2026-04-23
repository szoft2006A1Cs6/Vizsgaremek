import { useState } from 'react';
import './MenuItem.css';

export default function MenuItem({ product, onAdd }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="card menu-item-card" onClick={onAdd}>
      <div className="menu-item-img-wrapper">
        {product.kep && !imageError ? (
          <img 
            src={product.kep} 
            alt={product.termekNev} 
            className="menu-item-image"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="material-icons menu-item-icon">restaurant</span>
        )}
      </div>
      
      <div className="menu-item-info">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h2 className="font-display menu-item-title" style={{ hyphens: 'auto', WebkitHyphens: 'auto', margin: 0, wordBreak: 'break-word' }}>
            {product.termekNev}
          </h2>
          <span style={{ fontWeight: 'bold', color: 'var(--primary)', fontSize: '1.2rem', whiteSpace: 'nowrap', marginLeft: '1rem', flexShrink: 0 }}>
            {product.ar} Ft
          </span>
        </div>
        <p className="menu-item-desc"></p>
        {product.allergenek && (
          <span className="menu-item-badge">
            Allergének: {product.allergenek}
          </span>
        )}
      </div>
    </div>
  );
}