import { useNavigate } from 'react-router-dom';

export function PageHeader({ title, theme = 'light', centerIcon = null, rightContent = null }) {
  const navigate = useNavigate();
  const isDark = theme === 'dark';

  return (
    <header className={`page-header ${isDark ? 'bg-dark' : 'bg-white'}`}>
      <button 
        className={`back-btn ${isDark ? 'light' : 'brown'}`} 
        onClick={() => navigate(-1)}
      >
        <span className="material-icons">arrow_back</span> Vissza
      </button>
      
      {centerIcon ? (
        <span className="material-icons center-title" style={{ fontSize: '3rem', color: 'var(--primary-red)', opacity: 0.5 }}>{centerIcon}</span>
      ) : (
        <h1 className="center-title font-display" style={{ fontSize: '2rem', color: isDark ? 'var(--secondary-yellow)' : 'var(--primary-red)' }}>{title}</h1>
      )}
      
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {rightContent}
      </div>
    </header>
  );
}

export function FloatingHelpBtn() {
  return (
    <button className="floating-help-btn" aria-label="Segítség">
      <span className="material-icons">help_outline</span>
    </button>
  );
}