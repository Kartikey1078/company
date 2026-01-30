import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct
} from "../controllers/productController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import {
  createProductSchema,
  updateProductSchema
} from "../validators/productValidators.js";

const router = Router();

router.get("/", listProducts);
router.get("/:id", getProductById);
router.post("/", validateRequest(createProductSchema), createProduct);
router.put("/:id", validateRequest(updateProductSchema), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
