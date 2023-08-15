const Card = ({
  data: { title, price, description, ratings, reviews_count, media_count },
}) => {
  const formattedRatings = parseFloat(ratings).toFixed(1);
  return (
    <div className="col mt-4">
      <div className="card mb-4 rounded-3 shadow-sm">
        <div className="card-header py-3">
          <h4 className="my-0 fw-bold">{title}</h4>
        </div>
        <div className="card-body">
          <h1 className="card-title pricing-card-title display-3">{price}</h1>
          <ul className="list-unstyled mt-3 mb-4">
            <li>
              <span className="fw-bold">Description:</span> {description}
            </li>
            <li>
              <span className="fw-bold">Reviews:</span> {reviews_count}
            </li>
            <li>
              <span className="fw-bold">Ratings:</span> {formattedRatings}
            </li>
            <li>
              <span className="fw-bold">Media Count:</span> {media_count}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Card;
