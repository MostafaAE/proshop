import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

function Star({ stars, type }) {
  return (
    <>
      {Array.from({ length: stars }).map((_, i) => {
        return (
          (type === 'full' && <FaStar key={i} />) ||
          (type === 'half' && <FaStarHalfAlt key={i} />) ||
          (type === 'empty' && <FaRegStar key={i} />)
        );
      })}
    </>
  );
}

export default Star;
