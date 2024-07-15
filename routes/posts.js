import express from "express";
const router = express.Router();

let posts = [
  { id: 1, title: "Post One" },
  { id: 2, title: "Post One" },
  { id: 3, title: "Post One" },
  { id: 4, title: "Post One" },
];
// Get all posts
router.get("/", (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  res.status(200).json(posts);
});

// Get single post
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (!isNaN(id) && id > 0) {
    const post = posts.find((post) => post.id === id);
    return res.status(200).json(post);
  }
  res.status(200).json(posts);
});

// Create a new post
router.post("/", (req, res) => {
  const title = req.body.title;
  if (!title) {
    return res.status(400).json({ message: "Title Must Not Be Empty!" });
  }
  posts.push({ id: posts.length + 1, title });
  res.status(201).json(posts);
});

// Update Existing post
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let post = posts.find((post) => post.id === id);
  if (!post) {
    return res
      .status(404)
      .json({ message: `A post with id of ${id} was not found` });
  }
  post.title = req.body.title;
  res.status(200).json(posts);
});

// Delete post
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let post = posts.find((post) => post.id === id);
  if (!post) {
    return res
      .status(404)
      .json({ message: `A post with id of ${id} was not found` });
  }
  posts = posts.filter((post) => post.id !== id);
  res.status(200).json(posts);
});

export default router;
