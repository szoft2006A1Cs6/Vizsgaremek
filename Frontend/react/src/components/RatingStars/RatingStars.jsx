import './RatingStars.css';

export default function RatingStars({ rating, setRating }) {
  return (
    <div className="rating-stars stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`material-icons ${star <= rating ? 'filled' : 'empty'}`}
          onClick={() => setRating(star)}
          style={{ cursor: 'pointer', fontSize: '4rem' }}
        >
          star
        </span>
      ))}
    </div>
  );
}