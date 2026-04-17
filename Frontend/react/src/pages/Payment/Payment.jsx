import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/Shared';
import './Payment.css'

export default function Payment() {
  const navigate = useNavigate();

  return (
    <div className="page-layout">
      <PageHeader title="Fizetés" />
      
      <main className="main-content payment-main">
        
        <section className="card payment-summary">
          <div className="summary-header">
            Rendelés Összesítése <span className="material-icons">shopping_cart</span>
          </div>
          
          <div className="summary-body">
            <div className="summary-item">
              <div className="summary-item-left">
                <div className="summary-qty">1x</div>
                <div>
                  <h3 className="summary-item-name">Pizza Margherita</h3>
                  <p className="summary-item-desc">+ Extra sajt, 32 cm</p>
                </div>
              </div>
              <span className="summary-price">2 490 Ft</span>
            </div>
          </div>
          
          <div className="summary-footer">
            <div className="summary-total-row">
              <span>FIZETENDŐ</span>
              <span className="summary-total-price">7 491 Ft</span>
            </div>
          </div>
        </section>

        <section className="payment-methods-section">
          <h2 className="font-display">Válasszon fizetési módot</h2>
          
          <div className="payment-method-grid">
            <button className="card payment-method-btn" onClick={() => navigate('/status')}>
              <div className="method-icon-wrapper card-method">
                <span className="material-icons method-icon">credit_card</span>
              </div>
              <h3 className="font-display method-title">Bankkártyás</h3>
            </button>
            
            <button className="card payment-method-btn" onClick={() => navigate('/status')}>
              <div className="method-icon-wrapper cash-method">
                <span className="material-icons method-icon">storefront</span>
              </div>
              <h3 className="font-display method-title">Fizetés a pultnál</h3>
            </button>
          </div>
        </section>
        
      </main>
    </div>
  );
}