import { ZodError } from "zod";

export const errorHandler = (err, _req, res, _next) => {
  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid id format" });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    return res.status(409).json({ message: `${field} already exists` });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation error",
      errors: err.errors.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message
      }))
    });
  }

  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  return res.status(status).json({ message });
};
