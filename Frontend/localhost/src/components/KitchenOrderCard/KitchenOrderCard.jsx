import './KitchenOrderCard.css';

export default function KitchenOrderCard({ order, updateStatus }) {
  const getButtonConfig = (status) => {
    switch (status) {
      case 0: return { text: 'Felvétel', icon: 'pan_tool', className: 'kds-btn-accept', next: 1 };
      case 1: return { text: 'Tálalás', icon: 'restaurant', className: 'kds-btn-serve', next: 2 };
      case 2: return { text: 'Kiadva', icon: 'check_circle', className: 'kds-btn-ready', next: 3 };
      default: return null;
    }
  };

  const config = getButtonConfig(order.statusz);

  const isNoWaiter = order.raw?.pincerId === 0 || order.pincer.includes('Nincs pincér');

  return (
    <div className={`kds-card status-${order.statusz}`}>
      <div className="kds-card-header">
        <span className="kds-table-num">#{order.asztal}</span>

        <span className={`kds-status-badge ${isNoWaiter ? 'no-waiter-badge' : ''}`}>
          {order.pincer}
        </span>

        <span className="kds-time">{order.ido}</span>
      </div>
      <div className="kds-card-body">
        <ul className="kds-item-list">
          {order.tetelek.map((t, i) => (
            <li key={i} className="kds-item">
              <span className="kds-item-qty">{t.db}x</span>
              <span>{t.nev}</span>
            </li>
          ))}
        </ul>
      </div>
      {config && (
        <button className={`kds-main-btn ${config.className}`} onClick={() => updateStatus(order, config.next)}>
          {config.text} <span className="material-icons">{config.icon}</span>
        </button>
      )}
    </div>
  );
}