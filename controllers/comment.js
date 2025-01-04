import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";

export const createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const blogId = req.params.blogId;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const comment = new Comment({
      content,
      author: req.user._id,
      blog: blogId,
    });

    await comment.save();
    await comment.populate("author", "fullName");

    res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Error creating comment" });
  }
};

export const getCommentsByBlogId = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const comments = await Comment.find({ blog: blogId })
      .populate("author", "fullName")
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Error fetching comments" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findOneAndDelete({
      _id: req.params.commentId,
      author: req.user._id,
    });

    if (!comment) {
      return res.status(404).json({
        error: "Comment not found or you are not authorized to delete it",
      });
    }

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Error deleting comment" });
  }
};
