import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/Shared';

export default function Customize() {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader centerIcon="Módosítás"/>
      <main className="customize-main">
        <div className="product-hero">
          <h1 className="font-display">PIZZA MARGHERITA</h1>
          <p>Paradicsomszósz, mozzarella sajt, friss bazsalikom</p>
        </div>

        <section className="size-section">
          <h2 className="section-title">MÉRETE</h2>
          <div className="size-grid">
            {['24 CM', '32 CM', '45 CM'].map((size, i) => (
              <label key={i} className="size-option">
                <input type="radio" name="size" defaultChecked={i === 1} />
                <div className="size-content">
                  {i === 1 && <div className="recommended-badge">Ajánlott</div>}
                  <div className="size-icon"><span className="material-icons">local_pizza</span></div>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>{size}</span>
                </div>
              </label>
            ))}
          </div>
        </section>
      </main>

      <footer className="bottom-bar">
        <div className="bottom-bar-content">
          <div className="total-price-box">
            <span className="total-label">Összesen</span>
            <span className="total-amount">2 790 Ft</span>
          </div>
          <div className="action-buttons">
            <button className="add-cart-btn font-display" onClick={() => navigate('/payment')}>
              <span className="material-icons">shopping_cart</span> HOZZÁADÁS
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}