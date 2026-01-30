import { apiClient } from "./client.js";

export const fetchProducts = async () => {
  const response = await apiClient.get("/products");
  return response.data.data;
};

export const createProduct = async (payload) => {
  const response = await apiClient.post("/products", payload);
  return response.data.data;
};

export const updateProduct = async ({ id, payload }) => {
  const response = await apiClient.put(`/products/${id}`, payload);
  return response.data.data;
};

export const deleteProduct = async (id) => {
  const response = await apiClient.delete(`/products/${id}`);
  return response.data;
};
