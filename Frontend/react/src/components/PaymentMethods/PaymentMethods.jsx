import './PaymentMethods.css';

export default function PaymentMethods({ isProcessing, onSelectMethod }) {
  return (
    <section className="payment-methods-section">
      <h2 className="font-display">Válasszon fizetési módot</h2>
      <div className="payment-method-grid">
        <button 
          className="card payment-method-btn" 
          onClick={() => onSelectMethod('Bankkártyás Fizetés')}
          disabled={isProcessing}
          style={{ opacity: isProcessing ? 0.6 : 1 }}
        >
          <div className="method-icon-wrapper card-method">
            <span className="material-icons method-icon">credit_card</span>
          </div>
          <h3 className="font-display method-title">Bankkártyás</h3>
        </button>
        <button 
          className="card payment-method-btn" 
          onClick={() => onSelectMethod('Készpénzes Fizetés')}
          disabled={isProcessing}
          style={{ opacity: isProcessing ? 0.6 : 1 }}
        >
          <div className="method-icon-wrapper cash-method">
            <span className="material-icons method-icon">payments</span>
          </div>
          <h3 className="font-display method-title">Készpénzes fizetés</h3>
        </button>
      </div>
    </section>
  );
}