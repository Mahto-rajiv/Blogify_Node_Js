import express from "express";
import { connectDB } from "./dbs/connection.js";
import dotenv from "dotenv";
import staticRouter from "./routes/staticRoutes.js";
dotenv.config();

const app = express();

//Todo - Connect to MongoDB
const mongoUri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
const fullUri = `${mongoUri}/${dbName}`;
const PORT = process.env.PORT || 5001;
connectDB(fullUri);

app.use(express.static("./public"));

app.set("view engine", "ejs");
app.set("views", "./views");

//Todo - Routes
app.use("/", staticRouter);

app.listen(PORT, () => {
  console.log("Server is listening on port :", PORT);
});
