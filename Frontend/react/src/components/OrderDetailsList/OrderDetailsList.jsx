import './OrderDetailsList.css';

export default function OrderDetailsList({ items, total }) {
  return (
    <div className="card details-card">
      <h3 className="font-display details-title">Rendelés Részletei</h3>
      <ul className="details-list">
        {items.map((item, i) => (
          <li key={i} className="details-item">
            <span>{item.mennyiseg}x {item.termekNev}</span> <b>{item.ar * item.mennyiseg} Ft</b>
          </li>
        ))}
      </ul>
      <div className="details-total-row">
        <span className="details-total-label">Összesen</span>
        <span className="font-display details-total-value">{total} Ft</span>
      </div>
    </div>
  );
}