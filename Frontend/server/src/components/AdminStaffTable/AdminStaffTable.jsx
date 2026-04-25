import './AdminStaffTable.css';

export default function AdminStaffTable({ staff, onEdit, onDelete, onToggleWork, onAdd }) {
  return (
    <section className="admin-card staff-section">
      <div className="section-header">
        <h3>Pincérek Listája</h3>
        <button className="btn-add-small" onClick={onAdd} title="Új pincér hozzáadása">
          <span className="material-icons">person_add</span>
        </button>
      </div>
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Név</th>
              <th className="text-center">Állapot</th>
              <th className="text-right">Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {staff.map(person => (
              <tr key={person.pincerId}>
                <td className="font-bold">{person.pincerNev}</td>
                <td className="text-center">
                  <span className={`status-badge ${person.munka === 1 ? 'working' : 'off'}`}>
                    {person.munka === 1 ? 'Munkában' : 'Pihenőn'}
                  </span>
                </td>
                <td className="text-right actions-cell">
                  <button
                    className={`btn-work ${person.munka === 1 ? 'btn-stop' : 'btn-start'}`}
                    onClick={() => onToggleWork(person)}
                  >
                    <span className="material-icons">
                      {person.munka === 1 ? 'pause_circle' : 'play_circle'}
                    </span>
                    {person.munka === 1 ? 'Vége' : 'Munkába állás'}
                  </button>

                  <button className="btn-icon" onClick={() => onEdit(person)} title="Szerkesztés">
                    <span className="material-icons">edit</span>
                  </button>
                  <button className="btn-icon delete-icon" onClick={() => onDelete(person)} title="Törlés">
                    <span className="material-icons">delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}