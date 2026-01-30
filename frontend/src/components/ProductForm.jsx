import { useState } from "react";
import { ImageUp, PlusCircle } from "lucide-react";
import { uploadImage } from "../api/uploads.js";

const emptyProduct = {
  name: "",
  description: "",
  price: "",
  imageUrl: "",
  category: "",
  stock: ""
};

const ProductForm = ({ initialValues, onSubmit, onCancel, isSaving }) => {
  const [form, setForm] = useState(initialValues || emptyProduct);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const isBusy = isSaving || isUploading;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name?.trim()) {
      nextErrors.name = "Name is required.";
    }
    if (!form.price || Number(form.price) <= 0) {
      nextErrors.price = "Price must be greater than 0.";
    }
    if (form.imageUrl) {
      try {
        new URL(form.imageUrl);
      } catch {
        nextErrors.imageUrl = "Enter a valid URL.";
      }
    }
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    let imageUrl = form.imageUrl;
    if (file) {
      setIsUploading(true);
      try {
        const result = await uploadImage(file);
        imageUrl = result.url;
      } finally {
        setIsUploading(false);
      }
    }
    onSubmit({
      ...form,
      imageUrl,
      price: Number(form.price),
      stock: Number(form.stock || 0)
    });
    if (!initialValues) {
      setForm(emptyProduct);
      setFile(null);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-section">
        <div>
          <h4>Basic information</h4>
          <p className="muted">Title and description help teams search fast.</p>
        </div>
        <div className="form-grid">
          <label className="field">
            <span className="field-label">Name</span>
            <input
              className="input"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product name"
              required
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </label>
          <label className="field">
            <span className="field-label">Category</span>
            <input
              className="input"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Category"
            />
          </label>
          <label className="field full">
            <span className="field-label">Description</span>
            <textarea
              className="textarea"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the product"
              rows="3"
            />
          </label>
        </div>
      </div>

      <div className="form-section">
        <div>
          <h4>Pricing & stock</h4>
          <p className="muted">Set pricing and on-hand inventory.</p>
        </div>
        <div className="form-grid">
          <label className="field">
            <span className="field-label">Price</span>
            <input
              className="input"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              placeholder="0.00"
              required
              aria-invalid={Boolean(errors.price)}
            />
            {errors.price && (
              <span className="field-error">{errors.price}</span>
            )}
          </label>
          <label className="field">
            <span className="field-label">Stock</span>
            <input
              className="input"
              name="stock"
              type="number"
              min="0"
              value={form.stock}
              onChange={handleChange}
            />
          </label>
        </div>
      </div>

      <div className="form-section">
        <div>
          <h4>Media</h4>
          <p className="muted">Upload an image or provide a hosted URL.</p>
        </div>
        <div className="form-grid">
          <label className="field">
            <span className="field-label">Image URL</span>
            <input
              className="input"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://"
              aria-invalid={Boolean(errors.imageUrl)}
            />
            {errors.imageUrl && (
              <span className="field-error">{errors.imageUrl}</span>
            )}
          </label>
          <label className="field">
            <span className="field-label">Upload image</span>
            <div className="file-input">
              <ImageUp size={16} />
              <span>{file?.name || "Choose image file"}</span>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => setFile(event.target.files?.[0] || null)}
              />
            </div>
          </label>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={isBusy}>
          <PlusCircle size={16} />
          {isBusy
            ? "Saving..."
            : `${initialValues ? "Update" : "Add"} product`}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
