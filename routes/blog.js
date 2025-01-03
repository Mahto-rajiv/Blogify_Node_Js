import express from "express";
import {
  createBlog,
  getBlogById,
  showCurrentLoggedUserAllBlogs,
  deleteLoggedUserBlog,
} from "../controllers/blog.js";
import { isAuthenticated } from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/create", isAuthenticated, upload.single("image"), createBlog);
router.get("/blogId/:id", getBlogById);
router.get("/yourAllBlogs", isAuthenticated, showCurrentLoggedUserAllBlogs);
router.delete("/delete/:id", isAuthenticated, deleteLoggedUserBlog);

export default router;
