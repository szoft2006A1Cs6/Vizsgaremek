import './AdminRatingTable.css';
import '../../components/AdminProductTable/AdminProductTable.css';

export default function AdminRatingTable({ ratings, onDelete }) {

    const renderScore = (score) => {
        return (
            <div className="rating-score">
                <span className="score-number">{score}</span>
                <span className="material-icons star-filled">star</span>
            </div>
        );
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (date.getFullYear() === 1) return 'Ismeretlen időpont';
        return date.toLocaleString('hu-HU', {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <section className="admin-card">
            <div className="section-header">
                <h3>Beérkezett Értékelések</h3>
            </div>

            <div className="admin-table-wrapper">
                <table className="admin-table rating-table">
                    <thead>
                        <tr>
                            <th style={{ width: '30%' }}>Dátum</th>
                            <th style={{ width: '25%' }}>Rendelés ID</th>
                            <th style={{ width: '25%' }}>Pontszám</th>
                            <th className="text-right" style={{ width: '20%' }}>Műveletek</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ratings.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="empty-table-msg">Még nem érkezett értékelés.</td>
                            </tr>
                        ) : (
                            ratings.map(rating => (
                                <tr key={rating.ertekId}>
                                    <td className="rating-date">{formatDate(rating.idopont)}</td>
                                    <td className="font-bold">#{rating.rendelesId}</td>
                                    {/* Itt hívjuk meg az új függvényt */}
                                    <td>{renderScore(rating.pontszam)}</td>
                                    <td className="text-right actions-cell">
                                        <button
                                            className="btn-icon delete-icon"
                                            onClick={() => onDelete(rating)}
                                            title="Törlés"
                                        >
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