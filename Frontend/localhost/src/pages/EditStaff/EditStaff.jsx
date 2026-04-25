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

  useEffect(() => { fetchStaff(); }, []);

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

  const handleSaveStaff = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const method = editingStaff ? 'PUT' : 'POST';
    const url = editingStaff
      ? `${API_BASE_URL}/api/Pincer/${editingStaff.pincerId}`
      : `${API_BASE_URL}/api/Pincer`;

    const body = {
      pincerNev: staffName,
      munka: editingStaff ? editingStaff.munka : 0 // Új pincér alapból nem dolgozik
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

  const handleToggleWork = async (person) => {
    const token = localStorage.getItem('token');
    const updatedPerson = { ...person, munka: person.munka === 1 ? 0 : 1 };

    try {
      const res = await fetch(`${API_BASE_URL}/api/Pincer/${person.pincerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(updatedPerson)
      });
      if (res.ok) fetchStaff();
    } catch (err) { console.error(err); }
  };

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
    finally { setItemToDelete(null); }
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
        <AdminStaffTable
          staff={staff}
          onEdit={openEditStaff}
          onDelete={(person) => setItemToDelete(person)}
          onToggleWork={handleToggleWork}
          onAdd={openAddStaff}
        />
      </main>

      <AdminStaffModal
        isOpen={showModal}
        onClose={closeModal}
        onSave={handleSaveStaff}
        staffName={staffName}
        setStaffName={setStaffName}
        isEditing={!!editingStaff}
      />

      <AdminConfirmModal
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={executeDelete}
        title="Pincér törlése"
        message={`Biztosan törölni szeretnéd ${itemToDelete?.pincerNev} pincért a rendszerből?`}
      />
    </div>
  );
}