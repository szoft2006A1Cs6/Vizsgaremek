import './CategoryCard.css';

export default function CategoryCard({ category, onClick }) {
  return (
    <button className="card category-card" onClick={onClick}>
      <span className="font-display category-name">
        {category.tipusNev}
      </span>
    </button>
  );
}