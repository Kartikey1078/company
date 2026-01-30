import { Product } from "../models/Product.js";
import { ApiError } from "../utils/apiError.js";
import { buildProductSlug } from "../utils/slugify.js";

export const listProducts = async (_req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ data: products });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }
    res.json({ data: product });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      slug: req.body.slug || buildProductSlug(req.body.name)
    };
    const product = await Product.create(payload);
    res.status(201).json({ data: product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    if (payload.name && !payload.slug) {
      payload.slug = buildProductSlug(payload.name);
    }
    const product = await Product.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true
    });
    if (!product) {
      throw new ApiError(404, "Product not found");
    }
    res.json({ data: product });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }
    res.json({ message: "Product deleted" });
  } catch (error) {
    next(error);
  }
};
