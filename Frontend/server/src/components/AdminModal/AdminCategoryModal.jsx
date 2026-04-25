import './AdminModal.css';

export default function AdminCategoryModal({
  isOpen,
  onClose,
  onSave,
  categoryName,
  setCategoryName,
  isEditing
}) {
  if (!isOpen) return null;

  return (
    <div className="admin-modal-overlay">
      <form className="admin-modal card" onSubmit={onSave}>
        <div className="modal-header-simple">
          <h2 className="font-display">{isEditing ? 'Kategória Szerkesztése' : 'Új Kategória'}</h2>
          <button type="button" className="btn-icon" onClick={onClose}><span className="material-icons">close</span></button>
        </div>

        <div className="modal-body-simple">
          <div className="form-group">
            <label>Kategória neve</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
              autoFocus
              placeholder="pl. Főételek"
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