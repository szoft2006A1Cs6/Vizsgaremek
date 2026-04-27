import { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import AdminStaffTable from '../../components/AdminStaffTable/AdminStaffTable';
import AdminStaffModal from '../../components/AdminStaffModal/AdminStaffModal';
import AdminConfirmModal from '../../components/AdminConfirmModal/AdminConfirmModal';
import './EditStaff.css';

const API_BASE_URL = 'https://localhost:7235';

export default function EditStaff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [staffName, setStaffName] = useState('');

  // Komponens betöltésekor egyből lekérjük a pincéreket
  useEffect(() => { fetchStaff(); }, []);

  // Pincérek lekérése a backendről
  const fetchStaff = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_BASE_URL}/api/Pincer`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setStaff(data);
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  // Új pincér felvitele VAGY meglévő adatainak frissítése
  const handleSaveStaff = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const method = editingStaff ? 'PUT' : 'POST';
    const url = editingStaff ? `${API_BASE_URL}/api/Pincer/${editingStaff.pincerId}` : `${API_BASE_URL}/api/Pincer`;

    const body = {
      pincerNev: staffName,
      // Új pincér alapértelmezetten nincs munkában, szerkesztésnél megtartjuk a jelenlegi állapotát
      munka: editingStaff ? editingStaff.munka : 0 
    };

    if (editingStaff) body.pincerId = editingStaff.pincerId;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        fetchStaff();
        closeModal();
      }
    } catch (err) { console.error(err); }
  };

  // Pincér státuszának azonnali váltogatása
  const handleToggleWork = async (person) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`${API_BASE_URL}/api/Pincer/${person.pincerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ ...person, munka: person.munka === 1 ? 0 : 1 })
      });
      fetchStaff();
    } catch (err) { console.error(err); }
  };

  // Végleges törlés a megerősítő ablak leokézása után
  const executeDelete = async () => {
    if (!itemToDelete) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_BASE_URL}/api/Pincer/${itemToDelete.pincerId}`, { 
        method: 'DELETE', 
        headers: { 'Authorization': `Bearer ${token}` } 
      });
      if (res.ok) fetchStaff();
    } catch (err) { console.error(err); }
    finally { setItemToDelete(null); } // Törlés után modál bezárása
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingStaff(null);
    setStaffName('');
  };

  const openAddStaff = () => {
    setEditingStaff(null);
    setStaffName('');
    setShowModal(true);
  };

  const openEditStaff = (person) => {
    setEditingStaff(person);
    setStaffName(person.pincerNev);
    setShowModal(true);
  };

  if (loading) return <div className="page-layout edit-menu-dark flex-center">Betöltés...</div>;

  return (
    <div className="page-layout edit-menu-dark">
      <PageHeader title="Személyzet Kezelése" theme="dark" />

      <main className="main-content staff-container">
        {/* Pincéreket listázó táblázat komponens */}
        <AdminStaffTable
          staff={staff}
          onEdit={openEditStaff}
          onDelete={(person) => setItemToDelete(person)}
          onToggleWork={handleToggleWork}
          onAdd={openAddStaff}
        />
      </main>

      {/* Felvitel/Szerkesztés felugró ablak */}
      <AdminStaffModal
        isOpen={showModal}
        onClose={closeModal}
        onSave={handleSaveStaff}
        staffName={staffName}
        setStaffName={setStaffName}
        isEditing={!!editingStaff}
      />

      {/* Törlés megerősítő felugró ablak */}
      <AdminConfirmModal
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={executeDelete}
        title="Pincér törlése"
        message={`Biztosan törölni szeretnéd "${itemToDelete?.pincerNev}" pincért a rendszerből?`}
      />
    </div>
  );
}