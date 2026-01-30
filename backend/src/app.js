import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";

export const createApp = () => {
  const app = express();

  app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*" }));
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/", (_req, res) => {
    res.json({
      message: "Product API is running",
      routes: {
        products: "/api/products",
        uploads: "/api/uploads",
        health: "/health"
      }
    });
  });

  app.use("/api/products", productRoutes);
  app.use("/api/uploads", uploadRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
