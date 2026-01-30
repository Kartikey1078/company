import { ShoppingCart } from "lucide-react";

const ProductCard = ({ product, onAdd }) => {
  return (
    <article className="card">
      {product.imageUrl ? (
        <img
          className="card-image"
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
        />
      ) : (
        <div className="card-image placeholder">No image</div>
      )}
      <div className="card-header">
        <div>
          <p className="card-category">{product.category}</p>
          <h3>{product.name}</h3>
        </div>
        <span className="tag">In stock: {product.stock}</span>
      </div>
      <p className="muted">{product.description || "No description."}</p>
      <div className="card-footer">
        <span className="price">${product.price.toFixed(2)}</span>
        <button type="button" className="btn btn-primary" onClick={onAdd}>
          <ShoppingCart size={16} />
          Add to cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
