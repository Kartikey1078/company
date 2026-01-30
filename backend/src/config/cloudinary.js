import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET_KEY } =
  process.env;

if (!CLOUDINARY_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_SECRET_KEY) {
  throw new Error(
    "Cloudinary config missing. Set CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET_KEY in backend .env"
  );
}

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_SECRET_KEY
});

export { cloudinary };
