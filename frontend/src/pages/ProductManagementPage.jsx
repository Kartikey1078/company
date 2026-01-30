import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ClipboardList, PlusCircle } from "lucide-react";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct
} from "../api/products.js";
import ProductForm from "../components/ProductForm.jsx";
import ProductRow from "../components/ProductRow.jsx";
import Drawer from "../components/Drawer.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import { useToast } from "../components/ToastProvider.jsx";
import SkeletonRows from "../components/SkeletonRows.jsx";

const ProductManagementPage = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [selected, setSelected] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts
  });

  const stats = useMemo(() => {
    const total = products.length;
    const inventory = products.reduce((sum, item) => sum + (item.stock || 0), 0);
    const value = products.reduce(
      (sum, item) => sum + item.price * (item.stock || 0),
      0
    );
    return { total, inventory, value };
  }, [products]);

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product added to catalog.");
      setIsDrawerOpen(false);
    }
  });

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });
      const previous = queryClient.getQueryData(["products"]);
      queryClient.setQueryData(["products"], (old = []) =>
        old.map((item) => (item._id === id ? { ...item, ...payload } : item))
      );
      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["products"], context.previous);
      }
      toast.error("Update failed. Try again.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setSelected(null);
      setIsDrawerOpen(false);
      toast.success("Product updated.");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });
      const previous = queryClient.getQueryData(["products"]);
      queryClient.setQueryData(["products"], (old = []) =>
        old.filter((item) => item._id !== id)
      );
      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["products"], context.previous);
      }
      toast.error("Delete failed. Try again.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product removed.");
    }
  });

  const handleSubmit = (values) => {
    if (selected) {
      updateMutation.mutate({ id: selected._id, payload: values });
    } else {
      createMutation.mutate(values);
    }
  };

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2>Product Management</h2>
          <p className="muted">Create, edit, and maintain catalog data.</p>
        </div>
        <div className="panel-icon">
          <ClipboardList size={18} />
        </div>
      </div>

      <div className="stats">
        <div className="stat">
          <span className="muted">Products</span>
          <strong>{stats.total}</strong>
        </div>
        <div className="stat">
          <span className="muted">Units in stock</span>
          <strong>{stats.inventory}</strong>
        </div>
        <div className="stat">
          <span className="muted">Inventory value</span>
          <strong>${stats.value.toFixed(2)}</strong>
        </div>
        <button
          type="button"
          className="btn btn-primary stat-action"
          onClick={() => {
            setSelected(null);
            setIsDrawerOpen(true);
          }}
        >
          <PlusCircle size={16} />
          New product
        </button>
      </div>

      {isLoading && <SkeletonRows rows={4} />}
      {isError && <p>Unable to load products.</p>}
      {!isLoading && !isError && products.length === 0 && (
        <div className="empty-state">
          <h3>No products yet</h3>
          <p className="muted">Click “New product” to add the first item.</p>
        </div>
      )}
      {!isLoading && !isError && products.length > 0 && (
        <div className="table">
          <div className="table-header">
            <span>Name</span>
            <span>Category</span>
            <span>Price</span>
            <span>Stock</span>
            <span>Actions</span>
          </div>
          {products.map((product) => (
            <ProductRow
              key={product._id}
              product={product}
              onEdit={() => {
                setSelected(product);
                setIsDrawerOpen(true);
              }}
              onDelete={() => setDeleteTarget(product)}
            />
          ))}
        </div>
      )}

      <Drawer
        isOpen={isDrawerOpen}
        title={selected ? "Edit product" : "Add product"}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelected(null);
        }}
      >
        <ProductForm
          key={selected?._id || "new"}
          initialValues={selected}
          isSaving={createMutation.isPending || updateMutation.isPending}
          onCancel={() => {
            setIsDrawerOpen(false);
            setSelected(null);
          }}
          onSubmit={handleSubmit}
        />
      </Drawer>

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Delete product"
        message="This action is permanent. The product will be removed from the catalog."
        confirmLabel="Delete"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) {
            deleteMutation.mutate(deleteTarget._id);
          }
          setDeleteTarget(null);
        }}
        isLoading={deleteMutation.isPending}
      />
    </section>
  );
};

export default ProductManagementPage;
