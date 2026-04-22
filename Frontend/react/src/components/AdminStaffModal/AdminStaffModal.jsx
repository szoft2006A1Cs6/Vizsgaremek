import '../AdminModal/AdminModal.css';

export default function AdminStaffModal({ isOpen, onClose, onSave, staffName, setStaffName, isEditing }) {
  if (!isOpen) return null;

  return (
    <div className="admin-modal-overlay">
      <form className="admin-modal card" onSubmit={onSave}>
        <div className="modal-header-simple">
          <h2 className="font-display">{isEditing ? 'Pincér Szerkesztése' : 'Új Pincér hozzáadása'}</h2>
          <button type="button" className="btn-icon" onClick={onClose}><span className="material-icons">close</span></button>
        </div>
        <div className="modal-body-simple">
          <div className="form-group">
            <label>Pincér teljes neve</label>
            <input 
              type="text" 
              value={staffName} 
              onChange={(e) => setStaffName(e.target.value)} 
              required 
              autoFocus
              placeholder="pl. Kovács János"
            />
          </div>
        </div>
        <div className="modal-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>Mégse</button>
          <button type="submit" className="btn-save">Mentés</button>
        </div>
      </form>
    </div>
  );
}