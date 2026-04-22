import './AdminProductTable.css';

export default function AdminProductTable({ products, onEditProduct, onDeleteProduct, onAddProduct }) {
  return (
    <section className="admin-card product-section">
      <div className="section-header">
        <h3>Ételek</h3>
        <button className="btn-add-small" onClick={onAddProduct} title="Új étel hozzáadása">
          <span className="material-icons">add_circle</span>
        </button>
      </div>
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Név</th>
              <th>Ár</th>
              <th>Allergének</th>
              <th className="text-center">Kiemelt</th>
              <th className="text-right">Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-table-msg">Ebben a kategóriában még nincsenek ételek.</td>
              </tr>
            ) : (
              products.map(prod => (
                <tr key={prod.termekId}>
                  <td className="font-bold">{prod.termekNev}</td>
                  <td>{prod.ar} Ft</td>
                  <td>{prod.allergenek || '-'}</td>
                  
                  <td className="text-center">
                    {prod.featured ? (
                      <span className="material-icons star-icon">star</span>
                    ) : (
                      <span className="material-icons star-icon-empty">star_border</span>
                    )}
                  </td>
                  
                  <td className="text-right actions-cell">
                    <button className="btn-icon" onClick={() => onEditProduct(prod)} title="Szerkesztés">
                      <span className="material-icons">edit</span>
                    </button>
                    
                    <button className="btn-icon delete-icon" onClick={() => onDeleteProduct(prod)} title="Törlés">
                      <span className="material-icons">delete</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}