const SkeletonRows = ({ rows = 5 }) => {
  return (
    <div className="skeleton-list">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={`skeleton-${index}`} className="skeleton-row">
          <div className="skeleton-block skeleton-media" />
          <div className="skeleton-block skeleton-line" />
          <div className="skeleton-block skeleton-line short" />
          <div className="skeleton-block skeleton-actions" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonRows;
