import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/Shared';
import './Status.css'

export default function Status() {
  const navigate = useNavigate();

  const TableInfo = (
    <div className="table-info-badge">
      ASZTAL: 12
    </div>
  );

  return (
    <div className="page-layout">
      <PageHeader title="Rendelés Állapota" theme="dark" rightContent={TableInfo} />

      <main className="main-content status-main">
        
        <div className="text-center">
          <p className="status-order-num">Rendelésszám: #8492</p>
          <h2 className="font-display status-title">Rendelésed készül!</h2>
        </div>

        <div className="card tracker-card">
          
          <div className="status-tracker">
            <div className="progress-bar-bg"></div>
            <div className="progress-bar-fill w-35"></div>
            
            <div className="steps-container">
              <div className="step-item completed">
                <div className="step-icon"><span className="material-icons">receipt_long</span></div>
                <span className="step-label">Leadva</span>
              </div>
              
              <div className="step-item active">
                <div className="step-icon"><span className="material-icons">kitchen</span></div>
                <span className="step-label">Készül</span>
              </div>
              
              <div className="step-item">
                <div className="step-icon"><span className="material-icons">restaurant</span></div>
                <span className="step-label">Tálalás</span>
              </div>

              <div className="step-item">
                <div className="step-icon"><span className="material-icons">check_circle</span></div>
                <span className="step-label">Kész</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card details-card">
          <h3 className="font-display details-title">
            Rendelés Részletei
          </h3>
          <ul className="details-list">
            <li className="details-item">
              <span>1x Pizza Margherita (32cm)</span> <b>2 490 Ft</b>
            </li>
            <li className="details-item">
              <span>2x Coca Cola (0.5L)</span> <b>1 180 Ft</b>
            </li>
            <li className="details-item">
              <span>1x Görög Saláta</span> <b>1 890 Ft</b>
            </li>
          </ul>
          <div className="details-total-row">
            <span className="details-total-label">Összesen</span>
            <span className="font-display details-total-value">5 560 Ft</span>
          </div>
        </div>

        <div className="status-actions">
          <button className="btn btn-outline status-action-btn" onClick={() => navigate('/rating')}>
            <span className="material-icons">room_service</span> Pincér hívása
          </button>
        </div>
      </main>
    </div>
  );
}