import dotenv from "dotenv";
import { createApp } from "./app.js";
import { connectDb } from "./config/db.js";

dotenv.config();

const port = process.env.PORT || 4003;

const start = async () => {
  await connectDb(process.env.MONGODB_URI);
  const app = createApp();
  app.listen(port, () => {
    console.log(`API listening on port ${port}`);
  });
};

start();
