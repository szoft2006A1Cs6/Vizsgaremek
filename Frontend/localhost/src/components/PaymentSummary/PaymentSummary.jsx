import './PaymentSummary.css';

export default function PaymentSummary({ cart, total }) {
  return (
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
  );
}