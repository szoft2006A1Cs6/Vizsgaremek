import { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import AdminRatingTable from '../../components/AdminRatingTable/AdminRatingTable';
import AdminConfirmModal from '../../components/AdminConfirmModal/AdminConfirmModal';
import './RatingStats.css';
import '../../pages/EditMenu/EditMenu.css';

const API_BASE_URL = 'https://kioskapi.lexonn.hu';

export default function RatingStats() {
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [itemToDelete, setItemToDelete] = useState(null);

    useEffect(() => {
        fetchRatings();
    }, []);

    const fetchRatings = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${API_BASE_URL}/api/Ertekeles`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                data.sort((a, b) => new Date(b.idopont) - new Date(a.idopont));
                setRatings(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const executeDelete = async () => {
        if (!itemToDelete) return;
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${API_BASE_URL}/api/Ertekeles/${itemToDelete.ertekId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchRatings();
        } catch (err) {
            console.error(err);
        } finally {
            setItemToDelete(null);
        }
    };

    if (loading) return <div className="page-layout edit-menu-dark flex-center">Betöltés...</div>;

    return (
        <div className="page-layout edit-menu-dark">
            <PageHeader title="Értékelések Kezelése" theme="dark" />

            <main className="main-content rating-container">
                <AdminRatingTable
                    ratings={ratings}
                    onDelete={(rating) => setItemToDelete(rating)}
                />
            </main>

            <AdminConfirmModal
                isOpen={!!itemToDelete}
                onClose={() => setItemToDelete(null)}
                onConfirm={executeDelete}
                title="Értékelés törlése"
                message={`Biztosan törölni szeretnéd a(z) #${itemToDelete?.rendelesId} számú rendeléshez tartozó értékelést?`}
            />
        </div>
    );
}