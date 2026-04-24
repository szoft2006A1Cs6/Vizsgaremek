import { useState, useEffect } from 'react';
import './FloatingHelpBtn.css';

const API_BASE_URL = 'https://localhost:7235';

export default function FloatingHelpBtn() {
  const [asztalSzam, setAsztalSzam] = useState('?');
  const [callStatus, setCallStatus] = useState('idle');
  const [showAllergens, setShowAllergens] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const payload = JSON.parse(jsonPayload);
      const nameClaim = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
        || payload.name
        || payload.unique_name
        || "";

      const szam = nameClaim.replace(/\D/g, '');
      if (szam) setAsztalSzam(szam);
    } catch (error) {
      console.error("Token hiba a gombnál:", error);
    }
  }, []);

  const triggerCall = () => {
    if (callStatus === 'idle' && asztalSzam !== '?') {
      setShowConfirm(true);
    }
  };

  const executeCall = async () => {
    setShowConfirm(false);
    setCallStatus('calling');

    const token = localStorage.getItem('token');
    const now = new Date();
    const localTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .substring(0, 19);

    try {
      const response = await fetch(`${API_BASE_URL}/api/PincerHivas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          asztalId: parseInt(asztalSzam, 10),
          idopont: localTime,
          statusz: 'Segítség Kérés'
        })
      });

      if (response.ok) {
        setCallStatus('success');
        setTimeout(() => setCallStatus('idle'), 3000);
      } else {
        setCallStatus('idle');
      }
    } catch (error) {
      setCallStatus('idle');
    }
  };

  const allergens = [
    { id: 1, name: "Glutént tartalmazó gabonafélék" },
    { id: 2, name: "Rákfélék és azokból készült termékek" },
    { id: 3, name: "Tojás és abból készült termékek" },
    { id: 4, name: "Hal és abból készült termékek" },
    { id: 5, name: "Földimogyoró és abból készült termékek" },
    { id: 6, name: "Szójabab és abból készült termékek" },
    { id: 7, name: "Tej és abból készült termékek (beleértve a laktózt)" },
    { id: 8, name: "Diófélék" },
    { id: 9, name: "Zeller és abból készült termékek" },
    { id: 10, name: "Mustár és abból készült termékek" },
    { id: 11, name: "Szezámmag és abból készült termékek" },
    { id: 12, name: "Kén-dioxid és SO2-ben kifejezett szulfitok" },
    { id: 13, name: "Csillagfürt és abból készült termékek" },
    { id: 14, name: "Puhatestűek és abból készült termékek" }
  ];

  return (
    <>
      <div className="floating-actions-container">
        <button
          className="floating-btn info-btn"
          onClick={() => setShowAllergens(true)}
          title="Allergén információk"
        >
          <span className="material-icons">medical_information</span>
        </button>

        <button
          className="floating-btn help-btn"
          onClick={triggerCall}
          style={callStatus === 'success' ? { backgroundColor: '#16A34A', color: 'white', borderColor: '#15803D' } : {}}
          title="Segítség kérése"
        >
          <span className="material-icons">
            {callStatus === 'success' ? 'check_circle' : 'help_outline'}
          </span>
        </button>
      </div>

      {showConfirm && (
        <div className="modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px' }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="material-icons" style={{ color: 'var(--primary)', fontSize: '2rem' }}>room_service</span>
                <h2 className="font-display" style={{ margin: 0 }}>Pincér hívása</h2>
              </div>
              <button className="modal-close-btn" onClick={() => setShowConfirm(false)}>
                <span className="material-icons">close</span>
              </button>
            </div>

            <div className="modal-body" style={{ textAlign: 'center', padding: '2rem' }}>
              <p style={{ fontSize: '1.2rem', margin: '0 0 2rem 0', color: 'var(--dark)' }}>
                Szeretne segítséget kérni a pincértől?
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button
                  className="btn"
                  style={{ flex: 1, padding: '1rem', border: '1px solid #E5E7EB', background: 'var(--surface)', color: 'var(--dark)', fontWeight: 'bold', borderRadius: '0.5rem', cursor: 'pointer' }}
                  onClick={() => setShowConfirm(false)}
                >
                  Nem
                </button>
                <button
                  className="btn"
                  style={{ flex: 1, padding: '1rem', background: 'var(--primary)', color: 'white', border: 'none', fontWeight: 'bold', borderRadius: '0.5rem', cursor: 'pointer' }}
                  onClick={executeCall}
                >
                  Igen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAllergens && (
        <div className="modal-overlay" onClick={() => setShowAllergens(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="material-icons" style={{ color: 'var(--primary)', fontSize: '2rem' }}>medical_information</span>
                <h2 className="font-display" style={{ margin: 0 }}>Allergén Útmutató</h2>
              </div>
              <button className="modal-close-btn" onClick={() => setShowAllergens(false)}>
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="modal-body">
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', marginTop: '0' }}>
                Az étlapunkon a termékek mellett található számok az alábbi allergéneket jelölik:
              </p>
              <div className="allergens-grid">
                {allergens.map(allergen => (
                  <div key={allergen.id} className="allergen-item">
                    <span className="allergen-number">{allergen.id}</span>
                    <span className="allergen-name">{allergen.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}