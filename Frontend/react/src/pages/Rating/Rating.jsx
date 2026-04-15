import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/Shared';

export default function Rating() {
  const navigate = useNavigate();

  const handleFinish = () => navigate('/home');

  return (
    <div className="page-layout bg-dark">
      <PageHeader title="Gusto Bistro" theme="dark" />

      <main className="main-content flex-center">
        <div className="card rating-container">
          <span className="material-icons rating-top-icon">restaurant</span>
          <h2 className="font-display rating-title">Hogy ízlett az étel?</h2>
          <p className="rating-subtitle">Kérjük, értékelje a rendelését, hogy még jobb élményt nyújthassunk!</p>
            
          <div className="rating-stars">
            {[1, 2, 3, 4].map(star => (
              <span key={star} className="material-icons filled">star</span>
            ))}
            <span className="material-icons empty">star</span>
          </div>

          <div className="rating-feedback">
            <label className="form-label">Megjegyzés (Opcionális)</label>
            <textarea 
              rows="4" 
              placeholder="Írja meg véleményét..." 
              className="form-textarea"
            />
          </div>

          <button className="btn btn-primary rating-submit-btn" onClick={handleFinish}>
            Értékelés Beküldése <span className="material-icons">send</span>
          </button>
            
          <button className="rating-skip-btn" onClick={handleFinish}>
            Kihagyom az értékelést
          </button>
        </div>
      </main>
    </div>
  );
}