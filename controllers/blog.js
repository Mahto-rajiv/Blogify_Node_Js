import Blog from "../models/blog.model.js";

export const createBlog = async (req, res) => {
  try {
    const { title, body } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const blog = new Blog({
      title,
      body,
      image,
      author: req.user._id,
    });

    await blog.save();

    return res.redirect("/");
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ error: "Error creating blog post" });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "fullName"
    );
    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    return res.render("show-blog", { blogDetails: blog, user: req.user });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    res.status(500).json({ error: "Error fetching blog post" });
  }
};
