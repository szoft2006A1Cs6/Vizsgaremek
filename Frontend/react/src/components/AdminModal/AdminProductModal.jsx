import './AdminModal.css';

export default function AdminProductModal({
  isOpen, onClose, onSave, isEditing,
  productName, setProductName,
  productPrice, setProductPrice,
  productAllergens, setProductAllergens,
  productFeatured, setProductFeatured,
  productImage, setProductImage
}) {
  if (!isOpen) return null;

  return (
    <div className="admin-modal-overlay">
      <form className="admin-modal card" onSubmit={onSave}>
        <div className="modal-header-simple">
          <h2 className="font-display">{isEditing ? 'Étel Szerkesztése' : 'Új Étel'}</h2>
          <button type="button" className="btn-icon" onClick={onClose}><span className="material-icons">close</span></button>
        </div>

        <div className="modal-body-simple scrollable-modal-body">
          <div className="form-group">
            <label>Étel neve</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              placeholder="pl. Margherita Pizza"
            />
          </div>

          <div className="form-group">
            <label>Ár (Ft)</label>
            <input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
              placeholder="pl. 2500"
            />
          </div>

          <div className="form-group">
            <label>Allergének (számokkal, vesszővel elválasztva)</label>
            <input
              type="text"
              value={productAllergens}
              onChange={(e) => setProductAllergens(e.target.value)}
              placeholder="pl. 1,3,7"
            />
          </div>

          <div className="form-group">
            <label>Étel képe (URL link)</label>
            <input
              type="url"
              value={productImage}
              onChange={(e) => setProductImage(e.target.value)}
              placeholder="pl. https://valami.hu/kép.jpg"
            />
            {productImage && (
              <div className="image-preview-container">
                <img
                  src={productImage}
                  alt="Előnézet hiba"
                  className="image-preview"
                  onError={(e) => { e.target.style.display = 'none'; }}
                  onLoad={(e) => { e.target.style.display = 'inline-block'; }}
                />
              </div>
            )}
          </div>

          <div className="form-group-checkbox">
            <input
              type="checkbox"
              id="featured"
              checked={productFeatured}
              onChange={(e) => setProductFeatured(e.target.checked)}
            />
            <label htmlFor="featured">Napi ajánlat (Kiemelt étel megjelenítése)</label>
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