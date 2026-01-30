import { createApp } from "../src/app.js";
import { connectDb } from "../src/config/db.js";

let isConnected = false;

const app = createApp();

export default async function handler(req, res) {
  if (!isConnected) {
    await connectDb(process.env.MONGODB_URI);
    isConnected = true;
  }

  return app(req, res);
}
