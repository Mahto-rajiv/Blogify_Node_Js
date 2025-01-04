import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  createComment,
  getCommentsByBlogId,
  deleteComment,
} from "../controllers/comment.js";

const commentRoute = Router();

commentRoute.post(
  "/api/blogs/:blogId/comments",
  isAuthenticated,
  createComment
);
commentRoute.get("/api/blogs/:blogId/comments", getCommentsByBlogId);
commentRoute.delete("/api/comments/:commentId", isAuthenticated, deleteComment);
export default commentRoute;
