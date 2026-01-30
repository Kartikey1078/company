import { apiClient } from "./client.js";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await apiClient.post("/uploads", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return response.data.data;
};
