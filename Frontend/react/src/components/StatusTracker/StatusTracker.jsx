import './StatusTracker.css';

export default function StatusTracker({ width, step }) {
  return (
    <div className="card tracker-card">
      <div className="status-tracker">
        <div className="progress-bar-bg"></div>
        <div className="progress-bar-fill" style={{ width: width }}></div>
        <div className="steps-container">
          <div className={`step-item ${step >= 0 ? 'completed' : ''} ${step === 0 ? 'active' : ''}`}>
            <div className="step-icon"><span className="material-icons">receipt_long</span></div>
            <span className="step-label">Leadva</span>
          </div>
          <div className={`step-item ${step >= 1 ? 'completed' : ''} ${step === 1 ? 'active' : ''}`}>
            <div className="step-icon"><span className="material-icons">kitchen</span></div>
            <span className="step-label">Készül</span>
          </div>
          <div className={`step-item ${step >= 2 ? 'completed' : ''} ${step === 2 ? 'active' : ''}`}>
            <div className="step-icon"><span className="material-icons">restaurant</span></div>
            <span className="step-label">Tálalás</span>
          </div>
          <div className={`step-item ${step >= 3 ? 'completed' : ''} ${step === 3 ? 'active' : ''}`}>
            <div className="step-icon"><span className="material-icons">check_circle</span></div>
            <span className="step-label">Kész</span>
          </div>
        </div>
      </div>
    </div>
  );
}