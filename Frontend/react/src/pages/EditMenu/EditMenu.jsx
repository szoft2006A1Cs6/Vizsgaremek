import { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import AdminCategoryList from '../../components/AdminCategoryList/AdminCategoryList';
import AdminProductTable from '../../components/AdminProductTable/AdminProductTable';
import AdminCategoryModal from '../../components/AdminModal/AdminCategoryModal';
import AdminProductModal from '../../components/AdminModal/AdminProductModal';
import AdminConfirmModal from '../../components/AdminConfirmModal/AdminConfirmModal';
import './EditMenu.css';

const API_BASE_URL = 'https://localhost:7235';

export default function EditMenu() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal állapotok
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null); 

  // Form állapotok
  const [categoryName, setCategoryName] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productAllergens, setProductAllergens] = useState('');
  const [productFeatured, setProductFeatured] = useState(false);
  const [productImage, setProductImage] = useState(''); 

  useEffect(() => { fetchCategories(); }, []);
  useEffect(() => { if (selectedCategoryId) fetchProducts(selectedCategoryId); }, [selectedCategoryId]);

  const fetchCategories = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_BASE_URL}/api/EtelTipus`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
        if (data.length > 0 && !selectedCategoryId) setSelectedCategoryId(data[0].eteltipusId);
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const fetchProducts = async (catId) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_BASE_URL}/api/Termek`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        setProducts(data.filter(p => p.eteltipusId === catId));
      }
    } catch (err) { console.error(err); }
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const method = editingCategory ? 'PUT' : 'POST';
    const url = editingCategory ? `${API_BASE_URL}/api/EtelTipus/${editingCategory.eteltipusId}` : `${API_BASE_URL}/api/EtelTipus`;
    
    // Alap body, ID nélkül új létrehozáskor
    const body = {
      tipusNev: categoryName
    };

    // Ha módosítunk, hozzáadjuk az ID-t
    if (editingCategory) {
      body.eteltipusId = editingCategory.eteltipusId;
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        fetchCategories();
        closeModals();
      } else {
        const errorData = await res.json();
        console.error("Validációs hiba kategóriánál:", errorData);
      }
    } catch (err) { console.error(err); }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const method = editingProduct ? 'PUT' : 'POST';
    const url = editingProduct ? `${API_BASE_URL}/api/Termek/${editingProduct.termekId}` : `${API_BASE_URL}/api/Termek`;

    // Alap body, ID nélkül új létrehozáskor
    const body = {
      termekNev: productName,
      ar: parseInt(productPrice),
      allergenek: productAllergens || "",
      eteltipusId: selectedCategoryId,
      
      // JAVÍTÁS: true/false helyett 1-et vagy 0-t küldünk a C# backendnek!
      featured: productFeatured ? 1 : 0, 
      
      kep: productImage || ""
    };

    // Ha módosítunk, hozzáadjuk az ID-t
    if (editingProduct) {
      body.termekId = editingProduct.termekId;
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(body)
      });
      
      if (res.ok) {
        fetchProducts(selectedCategoryId);
        closeModals();
      } else {
        const errorData = await res.json();
        console.error("Validációs hiba terméknél:", errorData);
      }
    } catch (err) { console.error(err); }
  };

  const executeDelete = async () => {
    if (!itemToDelete) return;
    const token = localStorage.getItem('token');
    
    try {
      if (itemToDelete.type === 'category') {
        const cat = itemToDelete.data;
        const prodRes = await fetch(`${API_BASE_URL}/api/Termek`, { headers: { 'Authorization': `Bearer ${token}` } });
        if (prodRes.ok) {
          const allProds = await prodRes.json();
          const catProds = allProds.filter(p => p.eteltipusId === cat.eteltipusId);
          for (const prod of catProds) {
            await fetch(`${API_BASE_URL}/api/Termek/${prod.termekId}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
          }
        }
        const res = await fetch(`${API_BASE_URL}/api/EtelTipus/${cat.eteltipusId}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
        if (res.ok) {
          if (selectedCategoryId === cat.eteltipusId) {
            setSelectedCategoryId(null);
            setProducts([]);
          }
          fetchCategories();
        }
      } else if (itemToDelete.type === 'product') {
        const prod = itemToDelete.data;
        const res = await fetch(`${API_BASE_URL}/api/Termek/${prod.termekId}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
        if (res.ok) {
          fetchProducts(selectedCategoryId);
        }
      }
    } catch (err) { 
      console.error("Hiba a törlés során:", err); 
    } finally {
      setItemToDelete(null);
    }
  };

  const closeModals = () => {
    setShowCategoryModal(false);
    setShowProductModal(false);
    setEditingCategory(null);
    setEditingProduct(null);
    setCategoryName('');
    setProductName('');
    setProductPrice('');
    setProductAllergens('');
    setProductFeatured(false);
    setProductImage('');
  };

  const openAddCategory = () => {
    setEditingCategory(null);
    setCategoryName('');
    setShowCategoryModal(true);
  };

  const openAddProduct = () => {
    setEditingProduct(null);
    setProductName('');
    setProductPrice('');
    setProductAllergens('');
    setProductFeatured(false);
    setProductImage('');
    setShowProductModal(true);
  };

  const openEditCategory = (cat) => {
    setEditingCategory(cat);
    setCategoryName(cat.tipusNev);
    setShowCategoryModal(true);
  };

  const openEditProduct = (prod) => {
    setEditingProduct(prod);
    setProductName(prod.termekNev);
    setProductPrice(prod.ar);
    setProductAllergens(prod.allergenek || '');
    
    // A C#-ból érkező számot (1 vagy 0) true/false-ra alakítjuk a React számára
    setProductFeatured(prod.featured === 1 || prod.featured === true); 
    
    setProductImage(prod.kep || '');
    setShowProductModal(true);
  };

  if (loading) return <div className="page-layout bg-dark flex-center" style={{ color: 'white' }}>Betöltés...</div>;

  return (
    <div className="page-layout edit-menu-dark">
      <PageHeader title="Menü Kezelése" theme="dark" />
      
      <main className="main-content edit-menu-container">
        <div className="admin-grid">
          
          <AdminCategoryList 
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={setSelectedCategoryId}
            onEditCategory={openEditCategory}
            onDeleteCategory={(cat) => setItemToDelete({ type: 'category', data: cat })}
            onAddCategory={openAddCategory}
          />

          <AdminProductTable 
            products={products}
            onEditProduct={openEditProduct}
            onDeleteProduct={(prod) => setItemToDelete({ type: 'product', data: prod })}
            onAddProduct={openAddProduct}
          />

        </div>
      </main>

      <AdminCategoryModal 
        isOpen={showCategoryModal} onClose={closeModals} onSave={handleSaveCategory}
        categoryName={categoryName} setCategoryName={setCategoryName}
        isEditing={!!editingCategory}
      />

      <AdminProductModal 
        isOpen={showProductModal} onClose={closeModals} onSave={handleSaveProduct}
        productName={productName} setProductName={setProductName}
        productPrice={productPrice} setProductPrice={setProductPrice}
        productAllergens={productAllergens} setProductAllergens={setProductAllergens}
        productFeatured={productFeatured} setProductFeatured={setProductFeatured}
        productImage={productImage} setProductImage={setProductImage}
        isEditing={!!editingProduct}
      />

      <AdminConfirmModal 
        isOpen={!!itemToDelete} 
        onClose={() => setItemToDelete(null)} 
        onConfirm={executeDelete}
        title={itemToDelete?.type === 'category' ? "Kategória Törlése" : "Étel Törlése"}
        message={itemToDelete?.type === 'category' 
          ? `Biztosan törölni szeretnéd a(z) "${itemToDelete.data.tipusNev}" kategóriát?\n\nFIGYELEM: Ezzel az összes benne lévő étel is VÉGLEGESEN törlődik!`
          : `Biztosan törölni szeretnéd a(z) "${itemToDelete?.data.termekNev}" nevű ételt?`
        }
      />
    </div>
  );
}