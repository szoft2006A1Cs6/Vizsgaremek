import './AdminCategoryList.css';

export default function AdminCategoryList({
  categories,
  selectedCategoryId,
  onSelectCategory,
  onEditCategory,
  onDeleteCategory, // Új prop
  onAddCategory
}) {
  return (
    <section className="admin-card category-section">
      <div className="section-header">
        <h3>Kategóriák</h3>
        <button className="btn-add-small" onClick={onAddCategory} title="Új kategória hozzáadása">
          <span className="material-icons">add_circle</span>
        </button>
      </div>
      <ul className="admin-list">
        {categories.map(cat => (
          <li
            key={cat.eteltipusId}
            className={selectedCategoryId === cat.eteltipusId ? 'active' : ''}
          >
            <span className="list-text" onClick={() => onSelectCategory(cat.eteltipusId)}>
              {cat.tipusNev}
            </span>
            <div className="list-actions">
              <button
                className="btn-icon"
                onClick={(e) => { e.stopPropagation(); onEditCategory(cat); }}
                title="Szerkesztés"
              >
                <span className="material-icons">edit</span>
              </button>

              <button
                className="btn-icon delete-icon"
                onClick={(e) => { e.stopPropagation(); onDeleteCategory(cat); }}
                title="Törlés"
              >
                <span className="material-icons">delete</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}