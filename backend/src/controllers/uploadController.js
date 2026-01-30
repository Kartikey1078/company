import { cloudinary } from "../config/cloudinary.js";
import { ApiError } from "../utils/apiError.js";

const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "products" },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      }
    );
    stream.end(buffer);
  });

export const uploadProductImage = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ApiError(400, "Image file is required");
    }

    const result = await uploadToCloudinary(req.file.buffer);
    res.status(201).json({
      data: {
        url: result.secure_url,
        publicId: result.public_id
      }
    });
  } catch (error) {
    next(error);
  }
};
