import Star from './Star';

function Rating({ maxRating = 5, rating, text }) {
  const stars = Math.floor(rating);
  const halfStars = Math.ceil(rating - stars);
  const regStars = maxRating - stars - halfStars;

  return (
    <div className="rating">
      <Star stars={stars} type="full" />
      <Star stars={halfStars} type="half" />
      <Star stars={regStars} type="empty" />
      <span className="rating-text">{text && text}</span>
    </div>
  );
}

export default Rating;
