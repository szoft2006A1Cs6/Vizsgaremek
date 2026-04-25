import './AdminConfirmModal.css';

export default function AdminConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal card confirm-modal">
        <div className="modal-header-simple confirm-header">
          <span className="material-icons warning-icon">warning</span>
          <h2 className="font-display">{title}</h2>
        </div>
        <div className="modal-body-simple">
          <p className="confirm-message">{message}</p>
        </div>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Mégse</button>
          <button className="btn-delete-confirm" onClick={onConfirm}>Törlés</button>
        </div>
      </div>
    </div>
  );
}