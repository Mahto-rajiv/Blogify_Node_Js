import express, { urlencoded } from "express";
import { connectDB } from "./dbs/connection.js";
import dotenv from "dotenv";
import staticRouter from "./routes/staticRoutes.js";
import authRoutes from "./routes/user.js";
import { checkTokenAuthentication } from "./middlewares/auth.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const mongoUri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
const fullUri = `${mongoUri}/${dbName}`;
const PORT = process.env.PORT || 5001;

connectDB(fullUri);

//Todo - Middlewares
app.use(express.static("./public"));
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(checkTokenAuthentication("token"));

app.set("view engine", "ejs");
app.set("views", "./views");

//Todo - Routes
app.use("/", staticRouter);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log("Server is listening on port :", PORT);
});
