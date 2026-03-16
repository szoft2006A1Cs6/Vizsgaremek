import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/Shared';

export default function Payment() {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader title="FIZETÉS" theme="light" />
      <main className="payment-main">
        <section className="order-summary">
          <div className="summary-header">Rendelés Összesítése <span className="material-icons">shopping_cart</span></div>
          <div className="summary-items">
            <div className="summary-item">
              <div style={{ display: 'flex' }}>
                <div className="item-qty">1x</div>
                <div className="item-details">
                  <h3>Pizza Margherita</h3>
                  <p>+ Extra sajt, 32 cm</p>
                </div>
              </div>
              <span style={{ fontWeight: 'bold' }}>2 490 Ft</span>
            </div>
          </div>
          <div className="summary-totals">
            <div className="final-total">
              <span>FIZETENDŐ</span>
              <span className="amount">7 491 Ft</span>
            </div>
          </div>
        </section>

        <section className="payment-methods">
          <h2 className="font-display">Válasszon fizetési módot</h2>
          <div className="method-grid">
            <div className="method-card card" onClick={() => navigate('/status')}>
              <div className="method-icon"><span className="material-icons">credit_card</span></div>
              <h3>Bankkártyás</h3>
            </div>
            <div className="method-card cash" onClick={() => navigate('/status')}>
              <div className="method-icon"><span className="material-icons">storefront</span></div>
              <h3>Fizetés a pultnál</h3>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}