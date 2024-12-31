import express from "express";
import { connectDB } from "./dbs/connection.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

//Todo - Connect to MongoDB
const mongoUri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
const fullUri = `${mongoUri}/${dbName}`;
const PORT = process.env.PORT || 5001;
connectDB(fullUri);

app.listen(PORT, () => {
  console.log("Server is listening on port :", PORT);
});
