import { createApp } from "../backend/src/app.js";
import { connectDb } from "../backend/src/config/db.js";

let isConnected = false;

const app = createApp();

export default async function handler(req, res) {
  if (!isConnected) {
    await connectDb(process.env.MONGODB_URI);
    isConnected = true;
  }

  return app(req, res);
}
