import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import Blog from "../models/blog.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate("author", "fullName");
    return res.render("home", { allBlogs: blogs, user: req.user });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.render("home", {
      allBlogs: [],
      user: req.user,
      error: "Failed to fetch blogs",
    });
  }
});

router.get("/login", (req, res) => {
  res.render("login", { error: null, message: null });
});

router.get("/signup", (req, res) => {
  res.render("signup", { error: null });
});

router.get("/forgot-password", (req, res) => {
  res.render("forgot-password", { error: null, message: null });
});

router.get("/reset-password", (req, res) => {
  res.render("reset-password", { email: "", error: null, message: null });
});

router.get("/add-blog", isAuthenticated, (req, res) => {
  res.render("add-blog", { user: req.user });
});

export default router;
