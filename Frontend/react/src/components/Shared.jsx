import { useNavigate } from 'react-router-dom';
import './Shared.css'

export function PageHeader({ title, theme = 'light', rightContent = null }) {
  const navigate = useNavigate();
  const isDark = theme === 'dark';

  return (
    <header className={`page-header ${isDark ? 'dark' : ''}`}>
      <button className="btn btn-back" onClick={() => navigate(-1)}>
        <span className="material-icons">arrow_back</span> Vissza
      </button>
      
      <h1 className="font-display page-header-title">
        {title}
      </h1>
      
      <div className="page-header-right">
        {rightContent}
      </div>
    </header>
  );
}

export function FloatingHelpBtn() {
  return (
    <button className="floating-help" aria-label="Segítség kérése">
      <span className="material-icons floating-help-icon">help_outline</span>
    </button>
  );
}