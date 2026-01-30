import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { Package } from "lucide-react";
import { fetchProducts } from "../api/products.js";
import { addToCart } from "../features/cart/cartSlice.js";
import ProductListRow from "../components/ProductListRow.jsx";
import SkeletonRows from "../components/SkeletonRows.jsx";

const ProductListPage = () => {
  const dispatch = useDispatch();
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts
  });

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2>Product Listing</h2>
          <p className="muted">Browse the latest products and add to cart.</p>
        </div>
        <div className="panel-icon">
          <Package size={18} />
        </div>
      </div>
      {isLoading && <SkeletonRows />}
      {isError && <p>Unable to load products. Try again.</p>}
      {!isLoading && !isError && products.length === 0 && (
        <div className="empty-state">
          <h3>No products yet</h3>
          <p className="muted">
            Add your first product from the Manage tab to see it here.
          </p>
        </div>
      )}
      {!isLoading && !isError && products.length > 0 && (
        <div className="list">
          {products.map((product) => (
            <ProductListRow
              key={product._id}
              product={product}
              onAdd={() =>
                dispatch(
                  addToCart({
                    id: product._id,
                    name: product.name,
                    price: product.price
                  })
                )
              }
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductListPage;
