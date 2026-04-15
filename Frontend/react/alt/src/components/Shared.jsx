import { useNavigate } from 'react-router-dom';

export function PageHeader({ title, theme = 'light', rightContent = null }) {
  const navigate = useNavigate();
  const isDark = theme === 'dark';

  return (
    <header className={`page-header ${isDark ? 'dark' : ''}`}>
      <button className="btn btn-back" onClick={() => navigate(-1)}>
        <span className="material-icons">arrow_back</span> Vissza
      </button>
      
      <h1 className="font-display" style={{ fontSize: '2rem', margin: 0 }}>
        {title}
      </h1>
      
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', minWidth: '100px', justifyContent: 'flex-end' }}>
        {rightContent}
      </div>
    </header>
  );
}

export function FloatingHelpBtn() {
  return (
    <button className="floating-help" aria-label="Segítség kérése">
      <span className="material-icons" style={{ fontSize: '2rem' }}>help_outline</span>
    </button>
  );
}