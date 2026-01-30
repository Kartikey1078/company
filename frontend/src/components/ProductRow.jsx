import { Pencil, Trash2 } from "lucide-react";

const ProductRow = ({ product, onEdit, onDelete }) => {
  return (
    <div className="table-row">
      <div className="table-cell">
        <strong>{product.name}</strong>
      </div>
      <div className="table-cell muted">{product.category}</div>
      <div className="table-cell price">${product.price.toFixed(2)}</div>
      <div className="table-cell muted">{product.stock}</div>
      <div className="table-cell row-actions">
        <button type="button" className="btn btn-secondary" onClick={onEdit}>
          <Pencil size={16} />
          Edit
        </button>
        <button type="button" className="btn btn-danger" onClick={onDelete}>
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductRow;
