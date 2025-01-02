import express from "express";
import { createBlog, getBlogById } from "../controllers/blog.js";
import { isAuthenticated } from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/create", isAuthenticated, upload.single("image"), createBlog);
router.get("/:id", getBlogById);

export default router;
