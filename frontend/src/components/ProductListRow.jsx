import { ShoppingCart } from "lucide-react";

const ProductListRow = ({ product, onAdd }) => {
  return (
    <div className="list-row">
      <div className="list-row-media">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} loading="lazy" />
        ) : (
          <div className="image-fallback">No image</div>
        )}
      </div>
      <div className="list-row-body">
        <div>
          <p className="list-row-meta">{product.category}</p>
          <h3 className="list-row-title">{product.name}</h3>
          <p className="muted">
            {product.description || "Add a description to increase clarity."}
          </p>
        </div>
        <div className="list-row-price">
          <span>${product.price.toFixed(2)}</span>
          <span className="muted">Stock: {product.stock}</span>
        </div>
      </div>
      <div className="list-row-actions">
        <button type="button" className="btn btn-primary" onClick={onAdd}>
          <ShoppingCart size={16} />
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductListRow;
